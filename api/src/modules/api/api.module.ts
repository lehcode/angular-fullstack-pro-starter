import { HttpModule, Module } from '@nestjs/common';
import { ApiService } from './services/api/api.service';
import { ApiController } from './api.controller';
import { NHTSAService } from './services/nhtsa/nhtsa.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleVariableSchema } from './services/nhtsa/schemas/vehicle-variable.schema';
import { LocaleService } from './services/locale/locale.service';
import { TranslationService } from './services/translation/translation.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'VehicleVariable', schema: VehicleVariableSchema }])
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    NHTSAService,
    LocaleService,
    TranslationService
  ]
})
export class ApiModule {}
