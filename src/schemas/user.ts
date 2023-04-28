import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../utils';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: Role.LEARNER })
  role: Role;

  @Prop({ default: Date.now })
  date_of_birth: Date;

  @Prop({ required: false })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ default: true })
  gender: boolean;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  last_login_date: Date;

  @Prop({ required: false })
  avatar: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
