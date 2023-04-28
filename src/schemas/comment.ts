import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' })
  lessonId: ObjectId;

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
