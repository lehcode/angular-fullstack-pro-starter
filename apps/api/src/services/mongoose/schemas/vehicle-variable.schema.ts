import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true
})
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

export type VehicleVariableDocument = VehicleVariable & Document;

export const VehicleVariableSchema = SchemaFactory.createForClass(VehicleVariable);
