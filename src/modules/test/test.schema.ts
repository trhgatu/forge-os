// test.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDocument = Test & Document;

@Schema({ timestamps: true })
export class Test {
  @Prop({ required: true })
  name!: string;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status!: string;
}

export const TestSchema = SchemaFactory.createForClass(Test);
