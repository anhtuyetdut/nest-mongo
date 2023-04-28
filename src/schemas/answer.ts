import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema()
export class Answer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  questionId: ObjectId;

  @Prop()
  content: string;

  @Prop({ default: false })
  is_correct: boolean;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
