import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { SportType, CourtStatus } from '@shared/enums';

export type CourtDocument = Document & {
  _id: Types.ObjectId;
} & Court;

@Schema({ timestamps: true })
export class Court {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true })
  venueId!: Types.ObjectId;

  @Prop({ required: true, enum: SportType })
  sportType!: SportType;

  @Prop()
  description?: string;

  @Prop()
  coverImage?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop({ required: true })
  pricePerHour!: number;

  @Prop({ default: CourtStatus.ACTIVE, enum: CourtStatus })
  status!: CourtStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const CourtSchema = SchemaFactory.createForClass(Court);
