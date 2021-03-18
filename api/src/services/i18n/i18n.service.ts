// eslint-disable: id-length
import { Injectable } from '@nestjs/common';
import i18next, { i18n, InitOptions, TFunction } from 'i18next';
import { AppConfigService } from '@services/app-config/app-config.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import { MongooseService } from '@services/mongoose/mongoose.service';
import { InjectModel } from '@nestjs/mongoose';
// eslint-disable-next-line
import { I18nTranslation, I18nTranslationDocument } from '@services/mongoose/schemas/i18n-translation.schema';
import { Model } from 'mongoose';
import { I18nTranslationInterface } from '@interfaces/i18n-translation';
import { I18nData } from '@interfaces/i18n-data';
import MongooseBackend from '@services/i18n/mongoose-backend';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class I18nService {
  private i18n: i18n;

  private namespaces = ['default', 'nhtsa', 'frontpage'];

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

    this.languages = this.appConfig.get<string[]>('locale.locales');
    this.language = this.appConfig.get('locale.default');

    this.logger.log(`I18n language: ${this.language}`);

    this.namespaces.forEach(async (ns) => {
      await this.loadTranslations(ns, this.language);
    });
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
    return (
      '__' +
      value
        .replace(/(<([^>]+)>)/g, '_')
        .replace(/[^a-z0-9]+/gi, '_')
        .replace(/[_]+/, '_')
        .toLowerCase() +
      '__'
    );
  }

  /**
   * Get i18n instance
   */
  get instance(): i18n {
    if (!this.i18n) {
      this.i18n = i18next.createInstance()
        .use(MongooseBackend);

      this.i18n.init(
        {
          lng: this.language,
          fallbackLng: this.appConfig.get<string>('locale.fallback'),
          supportedLngs: this.appConfig.get<string[]>('locale.locales'),
          ns: this.namespaces,
          defaultNS: this.namespaces[0],
          debug: this.appConfig.get<string>('env') !== 'production',
          backend: {
            model: this.i18nTranslation,
            logger: this.logger
          },
          ...this.i18nOptions
        },
        (err, tFunc) => {
          if (err) return this.logger.error('Something went wrong while loading', err);
          // eslint-disable-next-line
          this.t = tFunc;
        }
      );
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
  changeLanguage(lang: string): void {
    try {
      this.instance.changeLanguage(lang);
    } catch (err) {
      this.logger.error(err);
    }
  }

  /**
   * Persist store translations
   */
  async storeTranslations(rows: I18nTranslationInterface[]): Promise<I18nTranslationInterface[]> {
    await this.i18nTranslation.deleteMany({});
    const stored = await this.i18nTranslation.insertMany(rows);

    this.logger.log(`Inserted ${stored.length} translations`);

    return stored;
  }

  /**
   * Load translations into instance
   */
  async addTranslations(rows: I18nTranslationInterface[], ns: string, lang?: string): Promise<void> {
    lang = lang || this.language;

    const data: I18nData[] = rows.map(
      (row): I18nData => {
        const i18nKey: string = I18nService.key(row.i18n.get(lang as string) as string);
        const i18nValue: string = row.i18n.get(lang as string) as string;

        return {
          lang: row.lang,
          ns: row.ns,
          data: { [i18nKey]: i18nValue }
        };
      }
    );

    await this.instance.addResources(this.language, ns, data);
  }

  /**
   * Load translations from database
   */
  loadTranslations(ns = 'default', lang?: string): void {
    lang = lang || this.language;

    const conditions = {
      lang: lang
    };
    Object.assign(conditions, { ns: ns });

    from(this.i18nTranslation.find(conditions)
      .select('-_id -__v -createdAt -updatedAt')
      .lean()
      .exec())
      .pipe(
        map((translations) => {
          const resources = {};

          translations.forEach((translation: I18nTranslationInterface) => {
            const i18nKey = translation.key as string;
            // @ts-ignore
            resources[i18nKey] = Object.assign({}, translation.i18n)[this.language] as string;
          });

          return resources;
        })
      )
      .subscribe((resources) => {
        // @ts-ignore
        this.instance.addResources(lang, ns, resources);
      });
  }
}
