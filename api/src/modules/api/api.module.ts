import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiService } from '@services/api/api.service';
import { ApiController } from '@api/api.controller';
import { NHTSAService } from '@services/nhtsa/nhtsa.service';
import { DbModule } from '@db/db.module';
import { VehicleVariablesService } from '@services/vehicle-variables/vehicle-variables.service';
import { BaseModule } from '@root/modules/base/base.module';

@Module({
  imports: [
    DbModule,
    BaseModule,
    HttpModule,
    MongooseModule
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
