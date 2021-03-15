// eslint-disable: id-length
import { Injectable } from '@nestjs/common';
import i18next, { i18n, InitOptions, TFunction } from 'i18next';
import { AppConfigService } from '@services/app-config/app-config.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import { MongooseService } from '@services/mongoose/mongoose.service';
import { InjectModel } from '@nestjs/mongoose';
import {
  I18nTranslation,
  I18nTranslationDocument
} from '@services/mongoose/schemas/i18n-translation.schema';
import { Model } from 'mongoose';
import { VehicleVariableI18n } from '@interfaces/vehicle-variable-i18n';
import { I18nData } from '@interfaces/i18n-data';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

@Injectable()
export class I18nService {
  private i18n: i18n;

  private namespaces = [
    'default',
    'nhtsa',
    'frontpage'
  ];

  public languages: string[] = ['en'];

  public language = 'en';

  private i18nOptions: InitOptions;
  
  private db = 'i18ntranslations';

  t: TFunction;

  constructor(
    private readonly appConfig: AppConfigService,
    private readonly logger: AppLoggerService,
    private readonly mongo: MongooseService,
    @InjectModel(I18nTranslation.name) private i18nTranslation: Model<I18nTranslationDocument>
  ) {
    this.logger.setContext(I18nService.name);

    this.languages =  this.appConfig.get<string[]>('locale.locales');
    this.language = this.appConfig.get('locale.default');

    this.logger.log(`I18n language: ${this.language}`);
  }

  /**
   * Add new namespace
   */
  addNamespace(ns: string): I18nService {
    this.namespaces.push(ns);

    return this;
  }

  /**
   * Generate translation key
   */
  static key(value: string): string {
    return value
      .replace(/(<([^>]+)>)/gi, '')
      .replace(/[^a-z0-9]+/gi, '_')
      .replace(/[_]+$/, '')
      .toLowerCase();
  }

  /**
   * Get i18n instance
   */
  get instance(): i18n {
    if (!this.i18n) {
      this.i18n = i18next.createInstance();
      this.i18n.
        init({
          lng: this.language,
          fallbackLng: this.appConfig.get<string>('env') !== 'production' ? 'dev' : 'en',
          supportedLngs: this.appConfig.get<string[]>('locale.locales'),
          ns: this.namespaces,
          defaultNS: this.namespaces[0],
          debug: this.appConfig.get<string>('env') !== 'production',
          ...this.i18nOptions
        }, (err, tFunc) => {
          if (err) return this.logger.error('Something went wrong while loading', err);
          // eslint-disable-next-line
          this.t = tFunc;
        });
    }

    return this.i18n;
  }

  set options(options: InitOptions) {
    this.i18nOptions = options;
  }

  /**
   * Clone i18n instance
   */
  cloneInstance(options = {}): i18n {
    return this.instance.cloneInstance(options);
  }

  /**
   * Change translation language
   */
  async changeLanguage(lang: string): Promise<any> {
    await this.instance.changeLanguage(lang, (err) => this.logger.error(err));
  }


  /**
   * Persist store translations
   */
  async storeTranslations(rows: VehicleVariableI18n[], ns = 'default'): Promise<VehicleVariableI18n[]> {
    await this.i18nTranslation.deleteMany({});
    const stored = await this.i18nTranslation.insertMany(rows);

    this.logger.log(`Inserted ${stored.length} translations`);
    
    return stored;
  }


  /**
   * Load translations into instance
   */
  async addTranslations(rows: VehicleVariableI18n[], ns: string, lang?: string): Promise<void> {
    lang = lang || this.language;

    const data: I18nData[] = rows.map((row): I18nData => {
      const i18nKey: string = I18nService.key(row.i18n.get(lang as string) as string);
      const i18nValue: string = row.i18n.get(lang as string) as string;

      return {
        lang: row.lang,
        ns: row.ns,
        data: { [i18nKey]: i18nValue }
      };
    });

    await this.instance.addResources(this.language, ns, data);
  }

  /**
   * Load translation resources from i18n for any processing
   */
  getTranslations(ns: string, lang?: string): any {
    if (!lang) {
      lang = this.language;
    }
    
    if (ns && this.instance.hasResourceBundle(lang, ns)) {
      return this.instance.getResourceBundle(lang, ns);
    }

    return;
  }

  /**
   * Load translations from database
   */
  async loadTranslations(ns: string, lang?: string): Promise<any> {
    if (!lang) {
      lang = this.language;
    }

    if (!ns) {
      throw new RuntimeException('namespace not specified');
    }

    const conditions = {
      lang: lang,
    };
    Object.assign(conditions, { ns: ns });

    const translations = await this.i18nTranslation.find(conditions)
      .lean()
      .exec();

    const resources = translations.map((translation: VehicleVariableI18n) => {
      return {
        lang: this.language,
        ns: ns,
        data: {
          // @ts-ignore
          [translation.src]: translation.i18n[this.language]
        }
      };
    });

    await this.instance.addResources(this.language, ns, resources);

    return resources;
  }
}
