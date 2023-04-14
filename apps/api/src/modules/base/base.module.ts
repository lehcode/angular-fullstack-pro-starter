import { Global, Module } from '@nestjs/common';
import { AppService } from '@root/app.service';
import { LocaleService } from '@services/locale/locale.service';
import { I18nService } from '@services/i18n/i18n.service';
import { AppConfigService } from '@services/app-config/app-config.service';
import { MongooseService } from '@services/mongoose/mongoose.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import { DbModule } from '@db/db.module';
import { DateService } from '@services/date/date.service';

@Global()
@Module({
  imports:[
    DbModule
  ],
  providers: [
    AppService,
    LocaleService,
    I18nService,
    AppConfigService,
    AppLoggerService,
    MongooseService,
    DateService
  ],
  exports: [
    AppService,
    LocaleService,
    I18nService,
    AppConfigService,
    AppLoggerService,
    MongooseService,
    DateService
  ]
})
export class BaseModule {}
