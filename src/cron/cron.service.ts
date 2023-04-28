import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(@InjectModel(Product.name) private readonly productRepo: Model<ProductDocument>) {}

  async checkEnabledProduct() {
    const listDisabledProduct = await this.productRepo.find({ status: true }).count();
    return listDisabledProduct;
  }

  @Cron('45 * * * * *')
  async handleCron() {
    this.logger.log(`Task Scheduling called at: ${new Date()}`);

    const count = await this.checkEnabledProduct();

    this.logger.log(`Enabled Product: ${count}`);
    this.logger.log(`TaskScheduling stoped at: ${new Date()}`);
  }
}
