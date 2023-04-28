import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type TestDocument = HydratedDocument<Test>;

@Schema()
export class Test {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' })
  lessonId: ObjectId;

  @Prop()
  name: string;

  @Prop()
  time_limit: number;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const TestSchema = SchemaFactory.createForClass(Test);
