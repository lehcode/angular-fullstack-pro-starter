import { HttpModule, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ApiService } from '../api/services/api/api.service';
import { NHTSAService } from '../api/services/nhtsa/nhtsa.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleVariableSchema } from '../api/services/nhtsa/schemas/vehicle-variable.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'VehicleVariable', schema: VehicleVariableSchema }])
  ],
  providers: [
    ApiService,
    NHTSAService
  ],
  controllers: [AdminController]
})
export class AdminModule {}
