import { Injectable } from '@nestjs/common';
import { I18nService } from '@services/i18n/i18n.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';

/**
 * The DateService class is an injectable service in the NestJS framework. It is used to retrieve the current date
 * and time and convert it to a string format based on the language. The class utilizes the I18nService to determine
 * the language.
 */

@Injectable()
export class DateService {
  private readonly localeMap: Record<string, string> = {
    en: 'en-US',
    uk: 'uk-UA',
    dev: '',
  };

  constructor(
    private readonly i18n: I18nService,
    private readonly logger: AppLoggerService
  ) {
    const locale = this.localeMap[this.i18n.language];

    if (locale) {
      this.logger.log(locale);
    }
  }

  get now(): string {
    const date = new Date();
    const locale = this.localeMap[this.i18n.language];

    if (locale) {
      return date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    return date.toISOString();
  }
}
