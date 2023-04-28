import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Delete, UseGuards } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles } from '../../core/decorator';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';
import { JwtRolesGuard } from '../../jwt/role.guard';
import { Pagination, Role } from '../../utils';
import { CategoryService } from './category.service';
import { CategoryDto, CreateCategoryDto } from './dto';

@Controller('api/category')
@ApiTags('category')
@UseGuards(JwtRolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async getListCategories(@Query() dto: CategoryDto, @Query() pagination: Pagination) {
    return this.categoryService.getListCategoryies(dto, pagination);
  }

  @Get('/:id')
  @Public()
  async getCategory(@Param('id') id: string) {
    return this.categoryService.getCategory(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Patch('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  async updateCategory(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
