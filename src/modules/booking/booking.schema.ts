import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BookingStatus } from '@shared/enums';

export type BookingDocument = Document & {
  _id: Types.ObjectId;
} & Booking;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true })
  courtId!: Types.ObjectId;

  @Prop({ required: true })
  startTime!: Date;

  @Prop({ required: true })
  endTime!: Date;

  @Prop({ default: BookingStatus.PENDING, enum: BookingStatus })
  status!: BookingStatus;

  @Prop()
  totalPrice?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  cancelledBy?: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
  paymentId?: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  confirmedBy?: Types.ObjectId;

  @Prop()
  cancelledAt?: Date;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
