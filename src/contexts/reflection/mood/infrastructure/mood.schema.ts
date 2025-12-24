import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MoodDocument = Document & {
  _id: Types.ObjectId;
  mood: string;
  note?: string;
  tags: string[];
  loggedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class Mood {
  @Prop({ required: true })
  mood!: string;

  @Prop()
  note?: string;

  @Prop({ required: false, min: 1, max: 10 })
  intensity?: number;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({ type: Date, default: Date.now })
  loggedAt!: Date;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const MoodSchema = SchemaFactory.createForClass(Mood);
