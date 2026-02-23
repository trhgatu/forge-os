import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { QuoteStatus } from '@shared/enums';
import { SoftDeletePlugin } from '@shared/database/mongo/plugins/soft-delete.plugin';

export type QuoteDocument = Document & {
  _id: Types.ObjectId;
  content: Map<string, string>;
  author?: string;
  source?: string;
  tags?: string[];
  mood?: string;
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

  @Prop()
  mood?: string;

  @Prop({ required: true, enum: QuoteStatus, default: QuoteStatus.INTERNAL })
  status!: QuoteStatus;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
QuoteSchema.plugin(SoftDeletePlugin);
