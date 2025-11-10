import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CourtStatus, SportType } from '@shared/enums';

export type CourtDocument = Document & {
  _id: Types.ObjectId;
  name: string;
  venueId: Types.ObjectId;
  sportType: SportType;
  status: CourtStatus;
  description?: string;
  slug: string;
  coverImage?: string;
  images?: string[];
  pricePerHour: number;
  isIndoor?: boolean;
  maxPlayers?: number;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class Court {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true })
  venueId!: Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true, unique: true })
  slug!: string;

  @Prop({ required: true, enum: SportType })
  sportType!: SportType;

  @Prop({ default: CourtStatus.ACTIVE, enum: CourtStatus })
  status!: CourtStatus;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop()
  coverImage?: string;

  @Prop({ required: true })
  pricePerHour!: number;

  @Prop()
  isIndoor?: boolean;

  @Prop()
  maxPlayers?: number;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const CourtSchema = SchemaFactory.createForClass(Court);
