// eslint-disable: id-length
import { Injectable } from '@nestjs/common';
import i18next, { i18n } from 'i18next';
import { AppConfigService } from '@services/app-config/app-config.service';
import { MongooseService } from '@services/mongoose/mongoose.service';

@Injectable()
export class I18nService {
  private instance: i18n;

  private namespaces = ['nhtsa', 'frontpage'];

  private namespace = 'default';

  public languages: ['en', 'ru', 'uk'];

  constructor(
    private readonly config: AppConfigService,
    private readonly db: MongooseService
  ) {
    this.instance = this.getInstance();
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
      .replace(/_$/, '')
      .toLowerCase();
  }

  /**
   * Add set of translations with namespace and language
   */
  addResources(lang: string, ns: string, data: Record<string, string>): void {
    i18next.addResources(lang, ns, data);
  }

  /**
   * Get i18n instance
   */
  getInstance(ns = 'default', options = {}, debug?: boolean): i18n {
    if (!this.instance) {
      this.instance = i18next.createInstance({
        lng: this.config.get('locale.default'),
        fallbackLng: this.config.get('locale.default'),
        supportedLngs: this.config.get('locale.locales'),
        ns: this.namespaces,
        defaultNS: ns,
        debug: debug,
        ...options
      });
    }
    
    return this.instance;
  }

  /**
   * Clone i18n instance
   */
  cloneInstance(options = {}): i18n {
    return this.instance.cloneInstance(options);
  }


  /**
   * Provide translation to supplied language
   */
  tr(key: string, target = 'default'): string {
    return this.getInstance(target)
      .t(key);
  }
}
