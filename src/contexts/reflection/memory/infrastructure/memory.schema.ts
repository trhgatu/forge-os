import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MemoryStatus, MoodType } from '@shared/enums';

export type MemoryDocument = Document & {
  _id: Types.ObjectId;
  title: Map<string, string>;
  content: Map<string, string>;
  mood?: string;
  tags?: string[];
  status: MemoryStatus;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class Memory {
  @Prop({
    type: Map,
    of: String,
    required: true,
    default: {},
  })
  title!: Map<string, string>;

  @Prop({
    type: Map,
    of: String,
    required: true,
    default: {},
  })
  content!: Map<string, string>;

  @Prop({
    type: String,
    enum: MoodType,
    required: false,
  })
  mood?: MoodType;

  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Prop({ required: true, enum: MemoryStatus, default: MemoryStatus.INTERNAL })
  status!: MemoryStatus;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const MemorySchema = SchemaFactory.createForClass(Memory);
