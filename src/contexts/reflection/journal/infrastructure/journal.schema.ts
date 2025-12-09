import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JournalDocument = Document & {
  _id: Types.ObjectId;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  date: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class Journal {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({ required: false })
  mood?: string;

  @Prop({ type: Date, default: Date.now })
  date!: Date;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
