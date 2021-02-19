import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongooseService } from './services/mongoose/mongoose.service';
import { VehicleVariable, VehicleVariableSchema } from '@api/services/nhtsa/schemas/vehicle-variable.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: VehicleVariable.name, schema: VehicleVariableSchema }])],
  providers: [MongooseService],
  exports: [MongooseModule]
})
export class DbModule {}
