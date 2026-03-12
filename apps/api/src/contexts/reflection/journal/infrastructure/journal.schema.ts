import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MoodType } from '@shared/enums';
import { JournalType, JournalStatus } from '../domain/enums';
import { SoftDeletePlugin } from '@shared/database/mongo/plugins/soft-delete.plugin';

export type JournalDocument = JournalSchemaClass &
  Document & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };

@Schema()
export class JournalRelation {
  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  id!: string;
}
const JournalRelationSchema = SchemaFactory.createForClass(JournalRelation);

@Schema({ timestamps: true })
export class JournalSchemaClass {
  @Prop()
  title?: string;

  @Prop({ required: true })
  content!: string;

  @Prop({
    type: String,
    enum: MoodType,
    required: false,
  })
  mood?: MoodType;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({
    type: String,
    enum: JournalType,
    default: JournalType.THOUGHT,
    required: true,
  })
  type!: JournalType;

  @Prop({
    type: String,
    enum: JournalStatus,
    default: JournalStatus.PRIVATE,
    required: true,
  })
  status!: JournalStatus;

  @Prop({
    type: String,
    enum: ['user', 'ai', 'system'],
    default: 'user',
  })
  source!: 'user' | 'ai' | 'system';

  @Prop({ type: [JournalRelationSchema], default: [] })
  relations!: JournalRelation[];

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const JournalSchema = SchemaFactory.createForClass(JournalSchemaClass);

JournalSchema.plugin(SoftDeletePlugin);
