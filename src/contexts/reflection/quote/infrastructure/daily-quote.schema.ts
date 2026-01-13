import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DailyQuoteDocument = Document & {
  date: string; // Format: YYYY-MM-DD
  quoteId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class DailyQuote {
  @Prop({ required: true, unique: true, index: true })
  date!: string;

  @Prop({ type: Types.ObjectId, ref: 'Quote', required: true })
  quoteId!: Types.ObjectId;
}

export const DailyQuoteSchema = SchemaFactory.createForClass(DailyQuote);
