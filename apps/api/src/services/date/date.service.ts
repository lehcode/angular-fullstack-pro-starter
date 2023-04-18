import { Injectable } from '@nestjs/common';
import { I18nService } from '@services/i18n/i18n.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';

@Injectable()
export class DateService {
  constructor(
      private readonly i18n: I18nService,
      private readonly logger: AppLoggerService
  ) {
    if (!this.i18n.language || (this.i18n.language !== 'dev' && this.i18n.language !== 'en')) {
      throw new Error('Incorrect i18n.language');
    }
  }

  get now(): string {
    return new Date().toString();
  }
}