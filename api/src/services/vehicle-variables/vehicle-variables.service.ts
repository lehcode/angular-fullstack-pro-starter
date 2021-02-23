import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { VehicleVariable, VehicleVariableDocument } from '@services/mongoose/schemas/vehicle-variable.schema';
import { VehicleVariableInterface } from '@services/nhtsa/interfaces/vehicle-variable.interface';
import { I18nService } from '@services/i18n/i18n.service';
import { AppConfigService } from '@services/app-config/app-config.service';
import { isNaN } from 'lodash';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import { map } from 'rxjs/operators';
import { I18nMongoTranslation } from '@services/i18n/interfaces/i18n-mongo-translation';

@Injectable()
export class VehicleVariablesService {
  constructor(
    private readonly i18n: I18nService,
    private readonly config: AppConfigService,
    private readonly logger: AppLoggerService,
    @InjectModel(VehicleVariable.name) private vehicleVariables: Model<VehicleVariableDocument>
  ) {
    this.logger.setContext(VehicleVariablesService.name);
  }

  /**
   * Save NHTSA vehicle variables to DB
   */
  async store(data: VehicleVariableInterface[]): Promise<VehicleVariableInterface[]> {
    await this.vehicleVariables.deleteMany({});
    await this.vehicleVariables.insertMany(data as VehicleVariableDocument[]);
    this.logger.log(`Inserted ${data.length}`);

    return data;
  }

  /**
   * Query MongoDB for vehicle variables
   */
  fetchAll$(): Observable<VehicleVariableInterface[]> {
    return from(this.vehicleVariables.find()
      .exec());
  }

  /**
   * Find vehicle variable model
   */
  find$(varId: number, varName: string): Observable<any> {
    const i18nKey = I18nService.key(varName);
    const translatedVarName = this.i18n.t(i18nKey);

    return from(
      this.vehicleVariables
        .findOne({ varId: varId, name: { $eq: translatedVarName }})
        .select('-_id -__v')
        .lean()
        .exec()
    )
      .pipe(
        map((variableData) => {
          return variableData;
        })
      );
  }

  /**
   * Format translations to translations object
   */
  formatTranslationsI18n(data: VehicleVariableInterface[], i18nNs: string): I18nMongoTranslation[] {
    const bare = {
      lang: this.config.get<string>('locale.default'),
      ns: i18nNs,
      data: {}
    };

    let translations: I18nMongoTranslation[] = [];

    data.forEach((item: VehicleVariableInterface) => {
      if (isNaN(parseInt(item.description))) {
        translations.push({ ...bare, data: { [I18nService.key(item.description)]: item.description }});
      }

      if (isNaN(parseInt(item.name))) {
        translations.push({ ...bare, data: { [I18nService.key(item.name)]: item.name }});
      }

      if (item.dataType === 'lookup' && item.values) {
        item.values.forEach((val) => {
          if (isNaN(parseInt(val.name))) {
            translations.push({ ...bare, data: { [I18nService.key(val.name)]: val.name }});
          }
        });
      }
    });

    translations = translations.map((item) => {
      return {
        lang: this.i18n.language,
        ns: i18nNs,
        data: { ...item.data }
      } as I18nMongoTranslation;
    });

    return translations;
  }
}
