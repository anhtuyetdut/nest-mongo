import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../core/decorator';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';
import { JwtRolesGuard } from '../../jwt/role.guard';
import { Pagination } from '../../utils';
import { UserCreateDto } from './dto';
import { UserService } from './user.service';

@Controller('api/auth')
@ApiTags('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post()
  async createUser(@Body() user: UserCreateDto) {
    return this.userService.create(user);
  }

  @Public()
  @Post('/login')
  async login(@Body() user: UserCreateDto) {
    return this.userService.validateUser(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  async getAllUsers(@Query() pagination: Pagination, @Query('keyword') keyword: string) {
    return this.userService.getAllUsers(pagination, keyword);
  }
}
