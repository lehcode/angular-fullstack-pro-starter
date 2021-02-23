import { HttpModule, Module } from '@nestjs/common';

import { ApiService } from '@api/../../services/api/api.service';
import { ApiController } from '@api/api.controller';
import { NHTSAService } from '@api/../../services/nhtsa/nhtsa.service';
import { DbModule } from '@db/db.module';
import { VehicleVariablesService } from '@api/../../services/vehicle-variables/vehicle-variables.service';
import { BaseModule } from '@root/modules/base/base.module';

@Module({
  imports: [
    BaseModule,
    HttpModule,
    DbModule
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    NHTSAService,
    VehicleVariablesService
  ],
  exports: [
    ApiService, 
    NHTSAService
  ]
})
export class ApiModule {}
