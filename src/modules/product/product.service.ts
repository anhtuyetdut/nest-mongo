import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExportToCsv, Options } from 'export-to-csv';
import { FilterQuery, Model } from 'mongoose';
import { Category, CategoryDocument } from '../../schemas/category';
import { Product, ProductDocument } from '../../schemas/product';
import { getPagination, Pagination } from '../../utils';
import { ProductCreateDto, ProductUpdateDto } from './dto';

const HEADER = ['ID', 'Name', 'Quantity', 'Price', 'Category'];

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectModel(Product.name) private readonly productRepo: Model<ProductDocument>,
    @InjectModel(Category.name) private readonly catRepo: Model<CategoryDocument>,
  ) {}

  async getListProduct(input: Pagination, keyword: string) {
    this.logger.log('Get list product');

    const { page, take, skip } = getPagination(input.take, input.page);

    const where: FilterQuery<unknown>[] = [];
    if (keyword && keyword.length) {
      where.push({ name: { $regex: keyword, $options: 'i' } });
    }

    const [count, listProducts] = await Promise.all([
      this.productRepo.find(where.length ? { $or: where } : {}).count(),
      this.productRepo
        .find(where.length ? { $or: where } : {}, {
          _id: true,
          name: true,
          number: true,
          status: true,
          price: true,
          category: { _id: true, name: true },
        })
        .skip(skip)
        .limit(take)
        .lean(),
    ]);

    return { count, page, listProducts };
  }

  async getProduct(_id: string) {
    this.logger.log(`Get product: ${_id}`);

    const product = await this.productRepo
      .find(
        { _id },
        { _id: true, name: true, number: true, status: true, price: true, category: { _id: true, name: true } },
      )
      .lean();

    return product;
  }

  async createProduct(dto: ProductCreateDto) {
    this.logger.log(`Create new product: ${JSON.stringify(dto)}`);

    if (dto.number && dto.number < 0) return new BadRequestException('Invalid number of product');

    const { categoryId, ...data } = dto;

    const category = await this.catRepo.findOne({ _id: categoryId });
    if (!category) return new BadRequestException('Category is invalid');

    const newProduct = await new this.productRepo({ ...data, category }).save();
    const { _id, name } = newProduct;

    return { _id, name };
  }

  async updateProduct(_id: string, dto: ProductUpdateDto) {
    this.logger.log(`Update product: ${JSON.stringify(dto)}`);

    const { categoryId, ...data } = dto;

    if (categoryId) {
      const category = await this.catRepo.findOne({ _id: dto.categoryId });
      return await this.productRepo.findByIdAndUpdate({ _id }, { ...data, category }, { new: true });
    }

    return await this.productRepo.findByIdAndUpdate({ _id }, data, { new: true });
  }

  async deleteProduct(_id: string) {
    return await this.productRepo.deleteMany({ _id });
  }

  async exportToCsv() {
    const data: unknown[] = [];

    const listProducts = await this.productRepo
      .find({}, { _id: true, name: true, number: true, status: true, price: true, category: { _id: true, name: true } })
      .lean();

    listProducts.map((item) => {
      data.push({
        id: item._id,
        name: item.name,
        quantity: item.number,
        price: item.price,
        category: item.category?.name,
      });
    });

    const options: Options = {
      useKeysAsHeaders: true,
      headers: HEADER,
    };

    const output = new ExportToCsv(options);
    return output.generateCsv(data, true);
  }
}
