import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop()
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId;
        ref: 'Product';
      };
      number: {
        type: Number;
        default: 1;
      };
    },
  ];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: ObjectId;

  @Prop({ default: 0 })
  totalPrice: Number;

  @Prop()
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
