import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true
})
export class I18nTranslation {
  @Prop()
  lang: string;

  @Prop()
  ns: string;

  @Prop({ type: Object })
  data: Record<string, string>;
}

export type I18nTranslationDocument = I18nTranslation & Document;

export const I18nTranslationSchema = SchemaFactory.createForClass(I18nTranslation);
