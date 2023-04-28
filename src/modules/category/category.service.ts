import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Category, CategoryDocument } from '../../schemas/category';
import { getPagination, Pagination } from '../../utils';
import { CategoryDto, CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(@InjectModel(Category.name) private readonly catRepo: Model<CategoryDocument>) {}

  async getListCategoryies(dto: CategoryDto, pagination: Pagination) {
    this.logger.log(`Get list categories ${JSON.stringify(dto)}`);

    const { page, take, skip } = getPagination(pagination.take, pagination.page);

    const where: FilterQuery<unknown>[] = this.getWhere(dto);

    const [count, listCats] = await Promise.all([
      this.catRepo.find(where.length ? { $and: where } : {}).count(),
      this.catRepo
        .find(where.length ? { $and: where } : {})
        .select({ _id: true, name: true, status: true })
        .skip(skip)
        .limit(take)
        .lean(),
    ]);
    return { count, page, listCats };
  }

  async getCategory(_id: string) {
    this.logger.log(`Get category: ${_id}`);

    const category = await this.catRepo.findOne({ _id }, { _id: true, name: true, status: true }).lean();

    return category;
  }

  getWhere(dto: CategoryDto) {
    const where: FilterQuery<unknown>[] = [];

    if (dto.name && dto.name.length) where.push({ name: { $regex: dto.name, $options: 'i' } });
    if (dto.status) {
      const statusDto = dto.status.toLowerCase();
      const status = statusDto === 'true' ? true : false;
      where.push({ status });
    }

    return where;
  }

  async createCategory(dto: CreateCategoryDto) {
    this.logger.log(`Create new category: ${JSON.stringify(dto)}`);

    if (!dto.name && !dto.name.length) return new BadRequestException({ message: 'Name format error!' });

    const newCat = await new this.catRepo(dto).save();
    const { _id, name, status } = newCat;

    return { _id, name, status };
  }

  async updateCategory(_id: string, dto: CategoryDto) {
    return await this.catRepo.findByIdAndUpdate(_id, dto, { new: true });
  }

  async deleteCategory(_id: string) {
    await this.catRepo.deleteOne({ _id });
  }
}
