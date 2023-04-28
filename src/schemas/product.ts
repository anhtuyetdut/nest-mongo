import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category, CategorySchema } from './category';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  number: number;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: 0 })
  price: number;

  @Prop({ type: CategorySchema, required: true })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
