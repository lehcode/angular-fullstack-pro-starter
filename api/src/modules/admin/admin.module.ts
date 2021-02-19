import { HttpModule, Module } from '@nestjs/common';
import { AdminController } from '@admin/admin.controller';
import { ApiService } from '@api/services/api/api.service';
import { NHTSAService } from '@api/services/nhtsa/nhtsa.service';
import { DbModule } from '@db/db.module';
import { MongooseService } from '@db/services/mongoose/mongoose.service';
import { VehicleVariablesService } from '@api/services/vehicle-variables/vehicle-variables.service';

@Module({
  imports: [
    HttpModule,
    DbModule
  ],
  providers: [
    ApiService,
    NHTSAService,
    MongooseService,
    VehicleVariablesService
  ],
  controllers: [AdminController]
})
export class AdminModule {}
