import { HttpModule, Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { NHTSAService } from './services/nhtsa/nhtsa.service';

@Module({
  imports: [HttpModule],
  controllers: [ApiController],
  providers: [
    ApiService,
    NHTSAService,
  ]
})
export class ApiModule {
}
