import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user';
export type CourseDocument = HydratedDocument<Course>;
@Schema()
export class Course {
  @Prop({ type: User })
  user: User;

  @Prop()
  name: string;

  @Prop()
  cost: number;

  @Prop()
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
