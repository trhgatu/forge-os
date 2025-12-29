import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = Document &
  User & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    deletedAt?: Date;
  };

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
  roleId!: Types.ObjectId;

  @Prop({ default: null })
  refreshToken!: string;

  @Prop({
    type: [
      {
        provider: { type: String, required: true },
        identifier: { type: String, required: true },
        metadata: { type: Object, default: {} },
        connectedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  connections!: {
    provider: string;
    identifier: string;
    metadata: Record<string, any>;
    connectedAt: Date;
  }[];

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Enterprise Grade: Compound Index for fast lookup by provider + identifier
UserSchema.index({ 'connections.provider': 1, 'connections.identifier': 1 });

UserSchema.pre('save', async function (next) {
  const user = this as unknown as UserDocument;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  next();
});
