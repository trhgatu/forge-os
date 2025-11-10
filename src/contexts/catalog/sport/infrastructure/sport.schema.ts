import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { SportStatus } from '@shared/enums';

export type SportDocument = Document & {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  status: SportStatus;
  icon?: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  createdBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class Sport {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;

  @Prop({ default: SportStatus.ACTIVE, enum: SportStatus })
  status!: SportStatus;

  @Prop()
  icon?: string;

  @Prop()
  description?: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: 0 })
  sortOrder!: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const SportSchema = SchemaFactory.createForClass(Sport);
