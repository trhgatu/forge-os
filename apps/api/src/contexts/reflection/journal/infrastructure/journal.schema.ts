import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MoodType } from '@shared/enums';
import {
  JournalType,
  JournalStatus,
  JournalRelationType,
} from '../domain/enums';

import { SoftDeletePlugin } from '@shared/database/mongo/plugins/soft-delete.plugin';

export type JournalDocument = Document & {
  _id: Types.ObjectId;
  title?: string;
  content: string;
  mood?: MoodType;
  tags?: string[];
  type: JournalType;
  status: JournalStatus;
  source: 'user' | 'ai' | 'system';
  relations?: { type: JournalRelationType; id: string }[];
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class Journal {
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
  tags?: string[];

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

  @Prop({
    type: [
      {
        type: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    default: [],
  })
  relations?: { type: string; id: string }[];

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);

JournalSchema.plugin(SoftDeletePlugin);
