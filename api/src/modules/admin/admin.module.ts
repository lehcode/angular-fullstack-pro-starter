import { HttpModule, Module } from '@nestjs/common';
import { AdminController } from '@admin/admin.controller';
import { DbModule } from '@db/db.module';
import { BaseModule } from '@root/modules/base/base.module';
import { ApiModule } from '@api/api.module';
import { MongooseService } from '@services/mongoose/mongoose.service';
import { VehicleVariablesService } from '@services/vehicle-variables/vehicle-variables.service';

@Module({
  imports: [
    BaseModule,
    HttpModule,
    DbModule,
    ApiModule
  ],
  providers: [MongooseService, VehicleVariablesService],
  controllers: [AdminController]
})
export class AdminModule {}
