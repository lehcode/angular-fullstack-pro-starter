import { Module } from '@nestjs/common';
import { LocaleService } from '@services/locale/locale.service';

@Module({
  providers: [LocaleService],
  exports: [LocaleModule]
})
export class LocaleModule {}
