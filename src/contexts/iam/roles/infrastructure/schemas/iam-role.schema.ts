import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type RoleDocument = Role &
  Document & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Permission' }] })
  permissions!: Types.ObjectId[];

  @Prop({ default: false })
  isSystem!: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
