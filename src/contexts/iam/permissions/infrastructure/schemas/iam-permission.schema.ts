import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PermissionDocument = Permission &
  Document & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class Permission {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  resource!: string;

  @Prop({ required: true })
  action!: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
