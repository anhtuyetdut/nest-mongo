import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../core/decorator';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';
import { Pagination } from '../../utils';
import { ProductCreateDto, ProductUpdateDto } from './dto';
import { ProductService } from './product.service';

@Controller('api/product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  @Public()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() dto: ProductCreateDto) {
    return this.productService.createProduct(dto);
  }

  @Patch('/:id')
  @Public()
  @UseGuards(JwtAuthGuard)
  async updateProduct(@Param('id') id: string, @Body() dto: ProductUpdateDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete('/:id')
  @Public()
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get()
  @Public()
  async getListProducts(@Query() pagination: Pagination, @Query('keyword') keyword: string) {
    return this.productService.getListProduct(pagination, keyword);
  }

  @Get('/:id')
  @Public()
  async getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Get('export/export')
  @Public()
  async exportToCsv() {
    return this.productService.exportToCsv();
  }
}
