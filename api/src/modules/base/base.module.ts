import { Module } from '@nestjs/common';
import { AppService } from '@root/app.service';
import { LocaleService } from '@services/locale/locale.service';
import { I18nService } from '@services/i18n/i18n.service';
import { AppConfigService } from '@services/app-config/app-config.service';
import { MongooseService } from '@db/../../services/mongoose/mongoose.service';

@Module({
  providers: [
    AppService,
    LocaleService,
    I18nService,
    AppConfigService,
    MongooseService
  ],
  exports: [
    AppService,
    LocaleService,
    I18nService,
    AppConfigService,
    MongooseService
  ]
})
export class BaseModule {}
