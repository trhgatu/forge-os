import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SportDocument = Document & {
  _id: Types.ObjectId;
} & Sport;

@Schema({ timestamps: true })
export class Sport {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true, unique: true })
  slug!: string;

  @Prop()
  icon?: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const SportSchema = SchemaFactory.createForClass(Sport);
