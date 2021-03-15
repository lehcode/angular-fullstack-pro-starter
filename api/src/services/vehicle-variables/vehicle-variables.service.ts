import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { VehicleVariable, VehicleVariableDocument } from '@services/mongoose/schemas/vehicle-variable.schema';
import { VehicleVariableInterface } from '@interfaces/vehicle.variable';
import { I18nService } from '@services/i18n/i18n.service';
import { AppConfigService } from '@services/app-config/app-config.service';
import { isNaN } from 'lodash';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import { map } from 'rxjs/operators';
import { VehicleVariableI18n } from '@interfaces/vehicle-variable-i18n';
import * as toMarkdown from 'html-to-markdown';

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
  async store(data: VehicleVariable[]): Promise<VehicleVariable[]> {
    await this.vehicleVariables.deleteMany({});
    const inserted = await this.vehicleVariables.insertMany(data as VehicleVariableDocument[]);
    this.logger.log(`Inserted ${inserted.length} variables`);

    return inserted;
  }

  /**
   * Query MongoDB for vehicle variables
   */
  async fetchAll(): Promise<VehicleVariableInterface[]> {
    return await this.vehicleVariables.aggregate([
      {
        $lookup: {
          from: 'i18ntranslations',
          localField: 'varId',
          foreignField: 'variable',
          as: 'translations'
        }
      },
    ])
      .exec();
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
  toI18nMongoFormat(data: VehicleVariable[], i18nNs: string): VehicleVariableI18n[] {
    const translations: VehicleVariableI18n[] = [];
    const locales = this.config.get<string[]>('locale.locales');

    const push = (key: string, value: string, varId: number) => {
      const i18Map = new Map();
      locales.forEach((loc) => {
        i18Map.set(loc, '');
      });
      i18Map.set(this.i18n.language, value);

      translations.push({
        lang: this.i18n.language,
        ns: i18nNs,
        variable: varId,
        key: key,
        i18n: i18Map
      });
    };

    data.forEach((item: VehicleVariable) => {
      if (isNaN(parseInt(item.description))) {
        let descriptionMd = item.description;
        if (item.description.match(this.config.get<RegExp>('htmlRegex'))) {
          descriptionMd = toMarkdown.convert(item.description);
        }
        push(I18nService.key(item.description), descriptionMd, item.varId);
      }

      if (isNaN(parseInt(item.name))) {
        push(I18nService.key(item.name), item.name, item.varId);
      }

      if (item.dataType === 'lookup' && item.values) {
        item.values.forEach((val) => {
          if (isNaN(parseInt(val.name))) {
            push(I18nService.key(val.name), val.name, item.varId);
          }
        });
      }
    });

    return translations;
  }
}
