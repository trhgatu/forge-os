import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { SportType, VenueStatus } from '@shared/enums';

export type Coordinates = {
  lat: number;
  lng: number;
};

@Schema({ timestamps: true })
export class Venue {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true, enum: SportType })
  sportType!: SportType;

  @Prop({ default: VenueStatus.ACTIVE, enum: VenueStatus })
  status!: VenueStatus;

  @Prop()
  description?: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;

  @Prop({ type: { lat: Number, lng: Number }, _id: false })
  coordinates?: Coordinates;

  @Prop()
  coverImage?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

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

export type VenueDocument = Document & {
  _id: Types.ObjectId;
  name: string;
  location: string;
  sportType: SportType;
  status: VenueStatus;
  description?: string;
  slug: string;
  coordinates?: Coordinates;
  coverImage?: string;
  images?: string[];
  numOfCourts?: number;
  phoneNumber?: string;
  email?: string;
  website?: string;
  openHour?: string;
  closeHour?: string;
  pricePerHour?: number;
  ownerId?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const VenueSchema = SchemaFactory.createForClass(Venue);
