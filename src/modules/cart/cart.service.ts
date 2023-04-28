import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../../core/decorator';
import { Cart, CartDocument } from '../../schemas/cart';
import { getPagination, Pagination } from '../../utils';
import { CartItemDto } from './dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(@InjectModel(Cart.name) private readonly cartRepo: Model<CartDocument>) {}

  async getCartByUser(_id: string, input: Pagination) {
    this.logger.log(`Get cart by user: ${_id}`);

    const { page, take, skip } = getPagination(input.take, input.page);

    const [count, data] = await Promise.all([
      this.cartRepo.find({ user: { _id } }).count,
      this.cartRepo
        .find({ user: { _id } }, { _id: true, product: { name: true }, number: true })
        .skip(skip)
        .limit(take)
        .lean(),
    ]);

    return { count, page, data };
  }

  async addItemToCart(dto: CartItemDto, auth: Auth) {
    this.logger.log(`Create cart item: ${JSON.stringify(dto)}`);

    const isExistCart = await this.cartRepo
      .findOne({ user: auth.id }, { _id: true, products: true, totalPrice: true })
      .lean();

    if (isExistCart) {
      const { _id } = isExistCart;

      const newItem = await this.cartRepo.updateOne(
        { _id },
        { $push: { products: dto.products }, updatedAt: new Date() },
        { new: true },
      );

      return newItem;
    } else {
      const data = {
        user: auth.id,
        products: [dto.products],
        createdAt: new Date(),
      };

      const newCart = await new this.cartRepo(data).save();
      return newCart._id;
    }
  }

  async updateItem(_id: string, dto: CartItemDto) {
    this.logger.log(`Update cart item: ${JSON.stringify(dto)}`);

    const { product, number } = dto.products;

    const data = await this.cartRepo.updateOne(
      { _id, 'products.product': product },
      { $set: { 'products.$.number': number } },
    );

    return data;
  }

  async removeItem(_id: string, auth: Auth) {
    this.logger.log(`Remove item: ${_id}`);

    return await this.cartRepo.updateOne({ user: auth.id }, { $pull: { products: { productId: _id } } });
  }
}
