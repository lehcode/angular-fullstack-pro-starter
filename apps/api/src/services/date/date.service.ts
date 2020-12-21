import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { I18nService } from '@services/i18n/i18n.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';

@Injectable()
export class DateService {
  constructor(
    private readonly i18n: I18nService,
    private readonly logger: AppLoggerService
  ) {
    if (this.i18n.language !== 'en') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const locale = require(`moment/locale/${this.i18n.language}`);

      this.logger.log(locale);
    }

    moment.locale(this.i18n.language);
  }

  get now(): string {
    return moment.now()
      .toString();
  }
}
