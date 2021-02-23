import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import browserLanguage from 'accept-language-parser';
import { AppConfigService } from '@services/app-config/app-config.service';
import { I18nService } from '@services/i18n/i18n.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';

@Injectable()
export class LocaleService {
  private readonly fallback: string;

  constructor(
    private readonly appConfig: AppConfigService,
    private readonly i18n: I18nService,
    private logger: AppLoggerService
  ) {
    this.fallback = this.appConfig.get<string>('locale.default');
    this.appConfig.set('locale.app', this.fallback);
    this.logger.setContext(LocaleService.name);
  }

  /**
   * Detect locale
   */
  detect(req: Request): string {
    let appLocale = 'en';

    if (req.headers.hasOwnProperty('accept-language')) {
      appLocale = browserLanguage.pick(['en', 'ru', 'uk'], req.headers['accept-language'])
        .exec(/^([a-z]{2})/)[1] as string;
    }

    if (req.query.hasOwnProperty('lc')) {
      appLocale = req.query.lc as string;
    }

    if (req.params.hasOwnProperty('lc')) {
      appLocale = req.params.lc as string;
    }

    return appLocale || this.fallback;
  }


  /**
   * Set application locale
   */
  set locale(lang: string) {
    this.logger.log(`App locale set to: ${lang}`);

    this.appConfig.set('locale.app', lang);
  }

  /**
   * Application locale getter
   */
  get locale(): string {
    return this.appConfig.get('locale.app');
  }

  get defaultLocale(): string {
    return this.fallback;
  }
}
