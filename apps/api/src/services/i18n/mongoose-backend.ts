/* eslint-disable id-length */
import { I18nTranslationDocument } from '@services/mongoose/schemas/i18n-translation.schema';
import { Model } from 'mongoose';
import { from, ObservableInput } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppLoggerService } from '@services/app-logger/app-logger.service';

class MongooseBackend {
  services: any;

  options: any;

  type: 'backend';

  model: Model<I18nTranslationDocument>;

  logger: AppLoggerService;

  // @ts-ignore
  init(services: Record<string, any>, backendOptions: Record<string, any>, i18nextOptions: Record<string, any>): void {
    this.model = backendOptions.model;
    this.logger = backendOptions.logger;
    delete backendOptions.model;
    delete backendOptions.logger;

    this.logger.setContext('I18nMongooseBackend');

    this.services = services;
    this.options = { ...backendOptions, ...i18nextOptions };
  }

  read(language: string, namespace: string, callback: (ctx: any, data: any[] | null) => any): any {
    from(
      this.model
        .find({ lang: language, ns: namespace })
        .select('-_id -__v -createdAt -updatedAt -variable')
        .lean()
        .exec()
    )
      .pipe(
        map((rows) => {
          return rows.map((row: Record<string, any>) => {
            const key = row.key;
            // @ts-ignore
            const value = row.i18n[language];

            return { [key]: value };
          });
        }),
        catchError(
          (err, caught): ObservableInput<any> => {
            this.logger.error(err);
            callback(err, null);
            return caught;
          }
        )
      )
      .subscribe((d) => {
        callback(null, d);
      });
  }

  // optional
  // readMulti(languages, namespaces, callback) {
  //   /* return multiple resources - useful eg. for bundling loading in one xhr request */
  //   callback(null, {
  //     en: {
  //       translations: {
  //         key: 'value'
  //       }
  //     },
  //     de: {
  //       translations: {
  //         key: 'value'
  //       }
  //     }
  //   });
  //
  //   /* if method fails/returns an error, call this: */
  //   /* callback(truthyValue, null); */
  // }

  // only used in backends acting as cache layer
  save(language: string, namespace: string, data: any[]): void {
    // store the translations
    console.log(language);
    console.log(namespace);
    console.log(data);
  }

  create(languages: string[], namespace: string, key: string, fallbackValue: string): void {
    /* save the missing translation */
    console.log(languages);
    console.log(namespace);
    console.log(key);
    console.log(fallbackValue);
  }
}

// @ts-ignore
MongooseBackend.type = 'backend';

export default MongooseBackend;
