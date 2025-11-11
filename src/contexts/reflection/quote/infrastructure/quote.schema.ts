import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { QuoteStatus } from '@shared/enums';

export type QuoteDocument = Document & {
  _id: Types.ObjectId;
  content: Map<string, string>;
  author?: string;
  source?: string;
  tags?: string[];
  status: QuoteStatus;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class Quote {
  @Prop({
    type: Map,
    of: String,
    required: true,
    default: {},
  })
  content!: Map<string, string>;

  @Prop()
  author?: string;

  @Prop()
  source?: string;

  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Prop({ required: true, enum: QuoteStatus, default: QuoteStatus.INTERNAL })
  status!: QuoteStatus;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
