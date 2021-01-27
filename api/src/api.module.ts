import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { NHTSAService } from './services/nhtsa/nhtsa.service';

@Module({
  controllers: [ApiController],
  providers: [
    ApiService,
    NHTSAService,
  ],
  exports: [ApiService]
})
export class ApiModule {
}
