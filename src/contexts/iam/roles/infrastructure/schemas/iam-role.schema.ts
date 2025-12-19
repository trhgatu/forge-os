import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Permission' }] })
  permissions!: Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
