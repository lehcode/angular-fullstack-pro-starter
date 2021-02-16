import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import browserLanguage from 'accept-language-parser';

@Injectable()
export class LocaleService {
  private readonly fallback: string;

  private readonly logger = new Logger(LocaleService.name);

  constructor(private readonly config: ConfigService) {
    this.fallback = config.get<string>('locale.default') as string;
  }

  /**
   * Detect locale
   */
  detect(req: Request): string {
    let browserLang = 'en';
    let frontLocale = 'en';

    if (req.headers.hasOwnProperty('accept-language')) {
      browserLang = browserLanguage.pick(['en', 'ru', 'uk'], req.headers['accept-language'])
        .exec(/^([a-z]{2})/)[1] as string;
    }

    if (req.params.hasOwnProperty('lc')) {
      frontLocale = req.params.lc as string;
    }

    const appLocale = frontLocale || browserLang;

    this.logger.log(`Browser language: ${browserLang}`);
    this.logger.log(`Frontend language: ${frontLocale}`);
    this.logger.log(`App locale: ${appLocale}`);

    return appLocale || this.fallback;
  }
}
