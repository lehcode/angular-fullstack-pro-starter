import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import browserLanguage from 'accept-language-parser';
import { AppConfigService } from '@services/app-config/app-config.service';

@Injectable()
export class LocaleService {
  private readonly fallback: string;

  private readonly logger = new Logger(LocaleService.name);

  constructor(
    private readonly appConfig: AppConfigService
  ) {
    this.fallback = this.appConfig.get<string>('locale.default');
    this.appConfig.set('locale.app', this.fallback);
  }

  /**
   * Detect locale
   */
  detect(req: Request): void {
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

    this.locale = appLocale || this.fallback;
  }


  /**
   * Set application locale
   */
  set locale(val: string) {
    this.logger.log(`App locale: ${val}`);

    this.appConfig.set('locale.app', val);
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
