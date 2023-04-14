import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleVariable, VehicleVariableSchema } from '@services/mongoose/schemas/vehicle-variable.schema';
import { I18nTranslation, I18nTranslationSchema } from '@services/mongoose/schemas/i18n-translation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VehicleVariable.name, schema: VehicleVariableSchema },
      { name: I18nTranslation.name, schema: I18nTranslationSchema }
    ])
  ],
  exports: [MongooseModule]
})
export class DbModule {}
