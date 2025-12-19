import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true })
export class Permission {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop()
  description?: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
