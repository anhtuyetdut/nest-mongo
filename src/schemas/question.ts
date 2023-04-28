import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Test' })
  testId: ObjectId;

  @Prop()
  content: string;

  @Prop({ default: false })
  is_multi_choice: boolean;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
