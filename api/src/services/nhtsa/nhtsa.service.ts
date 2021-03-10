import { BadGatewayException, HttpService, Injectable, Logger } from '@nestjs/common';
import { Observable, of, zip } from 'rxjs';
import { delay, filter, map, mergeMap } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { isNaN, isEmpty } from 'lodash';
import { VehicleVariable } from '@services/mongoose/schemas/vehicle-variable.schema';
import { VehicleVariableInterface } from '@root/interfaces/vehicle-variable.interface';
import { DecodedVinItemInterface } from '@interfaces/decoded-vin-item.interface';
import { VehicleVariablesService } from '@services/vehicle-variables/vehicle-variables.service';
import { LocaleService } from '@services/locale/locale.service';
import { I18nService } from '@services/i18n/i18n.service';
import { AppConfigService } from '@services/app-config/app-config.service';
import { I18nNamespace } from '@interfaces/i18n-namespace.interface';
import { NhtsaVinResponseEntity } from '@interfaces/nhtsa-vin-response-entity';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
// eslint-disable-next-line
import { VehicleVariableDocument } from '@services/mongoose/schemas/vehicle-variable.schema';
import { NhtsaVinResponseEntityProxy } from '@interfaces/nhtsa-vin-response-entity-proxy';
// eslint-disable-next-line
import { I18nTranslation, I18nTranslationDocument } from '@services/mongoose/schemas/i18n-translation.schema';
import { Model } from 'mongoose';

@Injectable()
export class NHTSAService implements I18nNamespace {
  private apiHost;

  public logger = new Logger(NHTSAService.name);

  public i18nNs = 'nhtsa';

  constructor(
    private readonly http: HttpService,
    private readonly config: AppConfigService,
    private readonly vehicleVariables: VehicleVariablesService,
    private readonly locale: LocaleService,
    private readonly i18n: I18nService,
    @InjectModel(VehicleVariable.name) private vehicleVariableModel: Model<VehicleVariableDocument>,
    @InjectModel(I18nTranslation.name) private i18nTranslationModel: Model<I18nTranslationDocument>
  ) {
    this.apiHost = this.config.get<string>('services.nhtsa.apiHost');
    this.i18n.instance.addResources(this.i18n.language, this.i18nNs, this.loadTranslations());
  }

  /**
   * Make a call to the NHTSA API vehicle variables endpoint.
   *
   * https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleVariableList?format=xml
   */
  getVehicleVariables$(): Observable<any> {
    const endpoint = this.config.get<string>('services.nhtsa.uris.vehicleVars');

    return this.http.get(`${this.apiHost}${endpoint}`)
      .pipe(
        map((response) => response.data.Results),
        mergeMap(
          (
              results: {
            DataType: string;
            Description: string;
            varId: number;
            name: string;
          }[]
          ) => zip(...results.map((result: Record<string, any>) => this.formatVariable(result))),
          2
        )
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
      return this.getLookupValues(variable)
        .pipe(delay(500));
    }

    return of(variable);
  }

  /**
   * Make a call to the NHTSA API vehicle variables values endpoint.
   * Get values for 'lookup' type variables.
   * https://vpic.nhtsa.dot.gov/vehicles/GetVehicleVariableValuesList/:id?format=json
   */
  getLookupValues(variable: VehicleVariableInterface): Observable<VehicleVariableInterface> {
    const endpoint = this.config.get<string>('services.nhtsa.uris.vehicleVarsValues');

    return this.http.get(`${this.apiHost}${endpoint}`.replace('{:id}', variable.varId.toString()))
      .pipe(
        map((response) => response.data),
        map((data: any) => {
          const mapped = data.Results.map((result: Record<string, any>) => ({
            id: result.Id,
            name: result.Name
          }));
          return Object.assign(variable, { values: mapped });
        })
      );
  }

  /**
   * Query MongoDB for vehicle variables
   */
  queryVehicleVariables(): Observable<VehicleVariableInterface[]> {
    return this.vehicleVariables.fetchAll$();
  }

  /**
   * Format decoded VIN item
   */
  private formatDecodedItem(result: any, variable: any): DecodedVinItemInterface | Record<string, any> {
    const valueIdx = parseInt(result.valueId) - 1;

    if (!variable) {
      return {};
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
    let endpoint = this.config.get<string>('services.nhtsa.uris.decodeVin')
      ?.replace('{:vin}', code.toString());

    if (year) {
      endpoint += '&modelyear={:year}'.replace('{:year}', year.toString());
    }

    return this.http.get(`${this.apiHost}${endpoint}`)
      .pipe(
        map((response) => response.data.Results),
        mergeMap((entities: NhtsaVinResponseEntity[]) => {
          if (!entities) {
            throw new BadGatewayException();
          }

          return zip(
            ...entities.map((entity: Record<string, any>) => {
              const newEntity: NhtsaVinResponseEntityProxy = {
                value: undefined,
                valueId: undefined,
                variable: undefined,
                variableId: undefined
              };

              Object.keys(entity)
                .forEach((key) => {
                  const keyToLower = `${key.charAt(0)
                    .toLowerCase()}${key.slice(1)}`;
                  // @ts-ignore
                  newEntity[keyToLower] = entity[key] as any;
                  newEntity.value = isEmpty(entity.value) ? null : entity.value;
                  newEntity.valueId = isEmpty(entity.valueId) || entity.valueId === '0' ? null : entity.valueId;
                });

              return this.vehicleVariables.find$(entity.variableId, entity.variable)
                .pipe(
                  map((data) => data),
                  map((variable) => {
                    if (!variable && this.config.get<string>('env') === 'production') {
                      throw new RuntimeException('Variables not specified. Probably not updated from NHTSA API');
                    } else {
                      this.logger.log(entity);
                      this.logger.error('Variables not specified. Probably not updated from NHTSA API');
                    }

                    return this.formatDecodedItem(entity, variable);
                  }),
                  filter((variable) => {
                    return !!variable;
                  })
                );
            })
          );
        })
      );
  }

  private async loadTranslations(): Promise<any> {
    return await this.i18nTranslationModel
      .find()
      .select('-_id -__v')
      .lean()
      .exec();
  }
}
