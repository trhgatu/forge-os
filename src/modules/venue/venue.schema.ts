import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { SportType, VenueStatus } from '@shared/enums';

export type VenueDocument = Document & {
  _id: Types.ObjectId;
} & Venue;

@Schema({ timestamps: true })
export class Venue {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  location!: string;

  @Prop({
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
  })
  coordinates?: {
    lat: number;
    lng: number;
  };

  @Prop()
  coverImage?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop({ required: true, enum: SportType })
  sportType!: SportType;

  @Prop({ default: VenueStatus.ACTIVE, enum: VenueStatus })
  status!: VenueStatus;

  @Prop({ default: 1 })
  numOfCourts?: number;

  @Prop()
  phoneNumber?: string;

  @Prop()
  email?: string;

  @Prop()
  website?: string;

  @Prop()
  openHour?: string;

  @Prop()
  closeHour?: string;

  @Prop()
  pricePerHour?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId?: Types.ObjectId;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
