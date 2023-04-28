import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Course } from './course';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema()
export class Lesson {
  @Prop({ type: Course })
  course: Course;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  video_url: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
