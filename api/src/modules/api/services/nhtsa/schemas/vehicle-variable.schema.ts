import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = VehicleVariable & Document;

@Schema()
export class VehicleVariable {
  @Prop()
  dataType: string;

  @Prop()
  description: string;

  @Prop()
  varId: number;

  @Prop()
  name: string;

  @Prop()
  values: {
    id: number,
    name: string
  }[]
}

export const VehicleVariableSchema = SchemaFactory.createForClass(VehicleVariable);
