import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserStatsDocument = UserStatsModel & Document;

@Schema({ collection: 'user_stats', timestamps: true })
export class UserStatsModel {
  @Prop({ required: true, unique: true, index: true })
  userId!: string;

  @Prop({ default: 0 })
  xp!: number;

  @Prop({ default: 1 })
  level!: number;

  @Prop({ default: 'Novice' })
  title!: string;

  @Prop({ default: 0 })
  streak!: number;

  @Prop({ default: Date.now })
  lastActivityDate!: Date;

  @Prop({ type: [String], default: [] })
  achievements!: string[];
}

export const UserStatsSchema = SchemaFactory.createForClass(UserStatsModel);
