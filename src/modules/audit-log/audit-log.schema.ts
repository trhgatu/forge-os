import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({ required: true })
  action!: string;

  @Prop()
  method!: string;

  @Prop()
  statusCode!: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user!: Types.ObjectId;

  @Prop()
  path!: string;

  @Prop({ type: Object })
  params: any;

  @Prop({ type: Object })
  query: any;

  @Prop({ type: Object })
  body: any;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
