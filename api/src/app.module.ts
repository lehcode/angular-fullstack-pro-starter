import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiController } from './api.controller';
import { AppService } from './app.service';
import { ApiService } from './api.service';
import { NHTSAService } from './services/nhtsa/nhtsa.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    ApiController
  ],
  providers: [
    AppService,
    ApiService,
    NHTSAService
  ]
})
export class AppModule {
}
