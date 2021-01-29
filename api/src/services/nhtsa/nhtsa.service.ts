import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable, of, zip } from 'rxjs';
import { VehicleVariableInterface } from './interfaces/vehicle-variable.interface';
import { delay, map, mergeMap, tap } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleVariableDto } from './dto/create-vehicle-variable.dto';
import { VehicleVariableDocument } from './interfaces/vehicle-variable.document';
import { rethrow } from '@nestjs/core/helpers/rethrow';

@Injectable()
export class NHTSAService {
  private readonly API_HOST = 'https://vpic.nhtsa.dot.gov';
  private readonly VEHICLE_VARS_URI = '/api/vehicles/GetVehicleVariableList?format=json';
  private readonly VEHICLE_VARS_VALUES_URI = '/api/vehicles/GetVehicleVariableValuesList/:id?format=json';
  private readonly logger = new Logger(NHTSAService.name);

  constructor(
    private readonly http: HttpService,
    @InjectModel('VehicleVariable')
    private vehicleVariablesModel: Model<VehicleVariableDocument>
  ) {}

  /**
   * Make a call to the NHTSA API vehicle variables endpoint.
   * https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleVariableList?format=xml
   */
  getVehicleVariables(): Observable<any> {
    let results: any;

    return this.http.get(`${this.API_HOST}${this.VEHICLE_VARS_URI}`).pipe(
      tap((response) => (results = response.data.Results)),
      mergeMap(
        (response) =>
          zip(
            ...results.map(
              (result: Record<string, any>): Observable<VehicleVariableInterface> => {
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
            )
          ),
        5
      )
    );
  }

  /**
   * Make a call to the NHTSA API vehicle variables values endpoint.
   * Get values for 'lookup' type variables.
   * https://vpic.nhtsa.dot.gov/vehicles/GetVehicleVariableValuesList/:id?format=json
   */
  getLookupValues(variable: VehicleVariableInterface): Observable<VehicleVariableInterface> {
    const record = Object.assign({}, variable);

    this.http
      .get(`${this.API_HOST}${this.VEHICLE_VARS_VALUES_URI}`.replace(':id', variable.varId.toString()))
      .pipe(map((response) => response.data))
      .subscribe({
        next(data: Record<string, any>) {
          record.values = data.Results.map((result: Record<string, any>) => ({
            id: result.Id,
            name: result.Name
          }));
        }
      });

    return of(record).pipe(delay(5000));
  }

  /**
   * Save NHTSA vehicle variables to DB
   */
  async storeVehicleVariables(data: VehicleVariableInterface[]): Promise<VehicleVariableInterface[]> {
    await this.vehicleVariablesModel.deleteMany({});

    for (const item of data) {
      this.logger.log(`Inserting record: ${JSON.stringify(item)}`);

      await new this.vehicleVariablesModel(item as CreateVehicleVariableDto).save()
        .catch((err) => rethrow(err));
    }

    return data;
  }

  queryVehicleVariables(): Observable<any> {
    return from(this.vehicleVariablesModel.find().exec());
  }
}
