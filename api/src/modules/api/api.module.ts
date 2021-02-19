import { HttpModule, Module } from '@nestjs/common';

import { ApiService } from '@api/services/api/api.service';
import { ApiController } from '@api/api.controller';
import { NHTSAService } from '@api/services/nhtsa/nhtsa.service';
import { LocaleService } from '@api/services/locale/locale.service';
import { TranslationService } from '@api/services/translation/translation.service';
import { MongooseService } from '@db/services/mongoose/mongoose.service';
import { DbModule } from '@db/db.module';
import { VehicleVariablesService } from '@api/services/vehicle-variables/vehicle-variables.service';

@Module({
  imports: [
    HttpModule,
    DbModule
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    NHTSAService,
    LocaleService,
    TranslationService,
    MongooseService,
    VehicleVariablesService
  ]
})
export class ApiModule {}
