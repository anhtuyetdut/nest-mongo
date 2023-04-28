import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Product, ProductSchema } from '../schemas/product';
import { CronService } from './cron.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), ScheduleModule.forRoot()],
  providers: [CronService],
})
export class CronModule {}
