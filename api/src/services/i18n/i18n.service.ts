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
import { I18nMongoTranslation } from '@services/i18n/interfaces/i18n-mongo-translation';

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

    (async () =>{
      // await this.instance.changeLanguage(this.language);
      this.logger.log(`I18n language: ${this.language}`);
    })();
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
          this.t = tFunc.bind(this);
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
  async changeLanguage(lang: string): Promise<void> {
    await this.instance.changeLanguage(lang, (err) => this.logger.error(err));
  }


  /**
   * Persist store translations
   */
  async storeTranslations(rows: I18nMongoTranslation[], ns = 'default'): Promise<I18nTranslationDocument[]> {
    await this.i18nTranslation.deleteMany({});
    this.addTranslations(rows, ns);
    
    return await this.i18nTranslation.insertMany(rows);
  }


  /**
   * Load translations into instance
   */
  private addTranslations(rows: I18nMongoTranslation[], ns: string): void {
    this.instance.addResources(this.language, ns, rows);
  }

  /**
   * Load translation resources from i18n for any processing
   */
  getTranslations(lang: string, ns: string): I18nMongoTranslation[] {
    if (this.instance.hasResourceBundle(this.language, ns)) {
      return this.instance.getResourceBundle(this.language, ns); 
    }

    throw new Error(`I18n resource bundle for language '${lang}' and namespace '${ns}' not found`);
  }
}
