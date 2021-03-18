/* eslint-disable id-length */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { VehicleVariable, VehicleVariableDocument } from '@services/mongoose/schemas/vehicle-variable.schema';
import { VehicleVariableInterface } from '@interfaces/vehicle-variable';
import { I18nService } from '@services/i18n/i18n.service';
import { AppConfigService } from '@services/app-config/app-config.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import { map } from 'rxjs/operators';
import { I18nTranslationInterface } from '@interfaces/i18n-translation';
import * as toMarkdown from 'html-to-markdown';
import * as showdown from 'showdown';

@Injectable()
export class VehicleVariablesService {
  private mdConverter: any;

  constructor(
    private readonly i18n: I18nService,
    private readonly config: AppConfigService,
    private readonly logger: AppLoggerService,
    @InjectModel(VehicleVariable.name) private vehicleVariables: Model<VehicleVariableDocument>
  ) {
    this.logger.setContext(VehicleVariablesService.name);
    this.mdConverter = new showdown.Converter();
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
    return await this.vehicleVariables.find({})
      .select('-_id -__v -createdAt -updatedAt')
      .lean()
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
  toI18nMongoFormat(data: VehicleVariable[], i18nNs: string, lang: string): I18nTranslationInterface[] {
    const translations: I18nTranslationInterface[] = [];
    const locales = this.config.get<string[]>('locale.locales');

    const push = (key: string, value: string, varId: number) => {
      const i18Map = new Map();
      locales.forEach((loc) => {
        i18Map.set(loc, '');
      });
      i18Map.set(lang, value);

      translations.push({
        lang: this.i18n.language,
        ns: i18nNs,
        variable: varId,
        key: key,
        modifiedDate: null,
        i18n: i18Map
      });
    };

    data.forEach((item: VehicleVariable) => {
      if (item.description) {
        let descriptionMd = item.description;
        if (item.description.match(this.config.get<RegExp>('htmlRegex'))) {
          descriptionMd = toMarkdown.convert(item.description);
        }
        push(I18nService.key(item.description), descriptionMd, item.varId);
      }

      if (item.name) {
        push(I18nService.key(item.name), item.name, item.varId);
      }

      if (item.dataType === 'lookup' && item.values) {
        item.values.forEach((val) => {
          if (val.name) {
            push(I18nService.key(val.name), val.name, item.varId);
          }
        });
      }
    });

    return translations;
  }

  get all(): Observable<any> {
    return from(
      this.vehicleVariables.aggregate([
        {
          $lookup: {
            from: 'i18ntranslations',
            localField: 'varId',
            foreignField: 'variable',
            as: 'i18n'
          }
        },
        {
          $unset: ['createdAt', 'updatedAt', 'i18n', '_id', '__v']
        }
      ])
    )
      .pipe(
        map((rows: VehicleVariableInterface[]) => {
          return rows.map((row: VehicleVariableInterface) => {
          // @ts-ignore
            const lookupValues = row.values.map((lv) => {
              return {
                ...lv,
                name: this.i18n.t(I18nService.key(lv.name), { ns: 'nhtsa', lng: this.i18n.language })
              };
            });

            if (!lookupValues.length) {
              delete row.values;
            }

            let name = '';
            let descriptionHtml = '';

            try {
              name = this.i18n.t(I18nService.key(row.name), { ns: 'nhtsa', lng: this.i18n.language });
              descriptionHtml = this.mdConverter.makeHtml(
                this.i18n.t(I18nService.key(row.description), { ns: 'nhtsa', lng: this.i18n.language })
              );
            } catch (e) {
              this.logger.error(e);
              throw new Error(e);
            }

            return {
              ...row,
              values: lookupValues,
              name: name,
              description: descriptionHtml
            };
          });
        })
      );
  }
}
