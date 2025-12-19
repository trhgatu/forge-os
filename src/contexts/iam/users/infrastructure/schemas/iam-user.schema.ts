import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = Document & {
  _id: Types.ObjectId;
} & User;

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
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  next();
});
