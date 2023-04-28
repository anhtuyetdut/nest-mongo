import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStategy } from './jwt/jwt.strategy';
import { CartModule } from './modules/cart/cart.module';
import { CategoryModule } from './modules/category/category.module';
import { CoruseModule } from './modules/courses/course.module';
import { LessonModule } from './modules/lesson/lesson.modules';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CoruseModule,
    LessonModule,
  ],
  controllers: [],
  providers: [JwtStategy],
})
export class AppModule {}
