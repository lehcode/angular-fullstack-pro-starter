import { Module } from '@nestjs/common';
import { AppLoggerService } from '@services/app-logger/app-logger.service';

@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService]
})
export class AppLoggerModule {}
