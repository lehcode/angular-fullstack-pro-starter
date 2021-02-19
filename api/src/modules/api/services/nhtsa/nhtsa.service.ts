import { BadGatewayException, HttpService, Injectable, Logger } from '@nestjs/common';
import { Observable, of, zip } from 'rxjs';
import { delay, map, mergeMap, tap } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { ConfigService } from '@nestjs/config';
import { isNaN, isEmpty } from 'lodash';
// eslint-disable-next-line
import { VehicleVariableDocument } from '@api/services/nhtsa/interfaces/vehicle-variable.document';
import { VehicleVariableInterface } from '@api/services/nhtsa/interfaces/vehicle-variable.interface';
import { DecodedVinItemInterface } from '@api/services/api/interfaces/decoded-vin-item.interface';
import { VehicleVariable } from '@api/services/nhtsa/schemas/vehicle-variable.schema';
import { VehicleVariablesService } from '@api/services/vehicle-variables/vehicle-variables.service';

@Injectable()
export class NHTSAService {
  private apiHost;

  private readonly logger = new Logger(NHTSAService.name);

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
    private readonly variables: VehicleVariablesService,
    @InjectModel(VehicleVariable.name) private vehicleVariableModel: Model<VehicleVariableDocument>
  ) {
    this.apiHost = this.configService.get<string>('services.nhtsa.apiHost');
  }

  /**
   * Make a call to the NHTSA API vehicle variables endpoint.
   *
   * https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleVariableList?format=xml
   */
  getVehicleVariables(): Observable<any> {
    let results: any;
    const endpoint = this.configService.get<string>('services.nhtsa.uris.vehicleVars');

    return this.http.get(`${this.apiHost}${endpoint}`)
      .pipe(
        tap((response) => (results = response.data.Results)),
        mergeMap(() => zip(...results.map((result: Record<string, any>) => this.formatVariable(result))), 2)
      );
  }

  /**
   * Provide normalized object
   */
  formatVariable(result: Record<string, any>): Observable<VehicleVariableInterface> {
    const variable: VehicleVariableInterface = {
      dataType: result.DataType,
      description: result.Description,
      varId: result.ID,
      name: result.Name
    };

    if (variable.dataType === 'lookup') {
      return this.getLookupValues(variable);
    }

    return of(variable);
  }

  /**
   * Make a call to the NHTSA API vehicle variables values endpoint.
   * Get values for 'lookup' type variables.
   * https://vpic.nhtsa.dot.gov/vehicles/GetVehicleVariableValuesList/:id?format=json
   */
  getLookupValues(variable: VehicleVariableInterface): Observable<VehicleVariableInterface> {
    const record = Object.assign({}, variable);
    const endpoint = this.configService.get<string>('services.nhtsa.uris.vehicleVarsValues');

    this.http
      .get(`${this.apiHost}${endpoint}`.replace('{:id}', variable.varId.toString()))
      .pipe(map((response) => response.data))
      .subscribe({
        next(data: Record<string, any>) {
          record.values = data.Results.map((result: Record<string, any>) => ({
            id: result.Id,
            name: result.Name
          }));
        }
      });

    return of(record)
      .pipe(delay(5000));
  }

  /**
   * Save NHTSA vehicle variables to DB
   */
  async storeVehicleVariables(data: VehicleVariableInterface[]): Promise<VehicleVariableInterface[]> {
    return await this.variables.store(data);
  }

  /**
   * Query MongoDB for vehicle variables
   */
  queryVehicleVariables(): Observable<VehicleVariableInterface[]> {
    return this.variables.fetchAll$();
  }

  private formatDecodedItem(result: any, variable: any): Record<string, any> {
    const valueIdx = parseInt(result.valueId) - 1;

    if (!variable) {
      throw new Error('Variables not specified. Probably not updated from NHTSA API');
    }

    if (variable.values.length && variable.values[valueIdx]) {
      try {
        result.details = variable.values[valueIdx].name;
        result.description = variable.description;
      } catch (err) {
        this.logger.error(err);
      }
    } else {
      result.description = variable.description;
    }

    if (!isNaN(parseInt(result.value))) {
      result.value = parseInt(result.value);
    } else if (result.value === null) {
      delete result.value;
    }

    result.label = result.variable;
    delete result.variable;
    delete result.variableId;
    delete result.valueId;

    return result;
  }

  /**
   * Default VIN decoding
   */
  decodeVIN$(code: string, year?: number): Observable<any> {
    let endpoint = this.configService.get<string>('services.nhtsa.uris.decodeVin')
      ?.replace('{:vin}', code.toString());

    if (year) {
      endpoint += '&modelyear={:year}'.replace('{:year}', year.toString());
    }

    return this.http.get(`${this.apiHost}${endpoint}`)
      .pipe(
        map((response) => response.data.Results),
        mergeMap((results: Record<string, any>[]) => {
          if (!results) {
            throw new BadGatewayException();
          }

          return zip(
            ...results.map((result: Record<any, any>) => {
              Object.keys(result)
                .forEach((key) => {
                  const keyToLower = `${key.charAt(0)
                    .toLowerCase()}${key.slice(1)}`;
                  result[keyToLower] = result[key] as any;
                  delete result[key];
                  result.value = isEmpty(result.value) ? null : result.value;
                  result.valueId = isEmpty(result.valueId) || result.valueId === '0' ? null : result.valueId;
                });

              this.variables.fetch$(result.variableId, result.variable)
                .subscribe({
                  next: (variable) => {
                    result = this.formatDecodedItem(result, variable);
                  },
                  error: (err) => rethrow(err)
                });

              return of(result as DecodedVinItemInterface)
                .pipe(delay(1000));
            })
          );
        })
      );
  }
}
