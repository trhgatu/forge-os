import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PermissionDocument = Permission &
  Document & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    deletedAt?: Date;
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

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
