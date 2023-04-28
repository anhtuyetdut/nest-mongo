import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, getAuth } from '../../core/decorator';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';
import { JwtRolesGuard } from '../../jwt/role.guard';
import { Pagination } from '../../utils';
import { CartService } from './cart.service';
import { CartItemDto } from './dto';

@Controller('api/cart')
@ApiTags('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  async getCart(@Param('id') id: string, @Query() pagination: Pagination) {
    return this.cartService.getCartByUser(id, pagination);
  }

  @Post()
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  async addItem(@Body() dto: CartItemDto, @getAuth() auth: Auth) {
    return this.cartService.addItemToCart(dto, auth);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  async removeItem(@Param('id') id: string, @getAuth() auth: Auth) {
    return this.cartService.removeItem(id, auth);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  async updateItem(@Param('id') id: string, @Body() dto: CartItemDto) {
    return this.cartService.updateItem(id, dto);
  }
}
