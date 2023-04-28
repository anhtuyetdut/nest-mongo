import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Auth, getAuth, Public, Roles } from '../../core/decorator';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';
import { JwtRolesGuard } from '../../jwt/role.guard';
import { Pagination, Role } from '../../utils';
import { CourseService } from './course.service';
import { CourseDto, CourseUpdateDto } from './dto';

@Controller('api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @Public()
  async getAllCourses(@Query() input: Pagination) {
    return this.courseService.getAllCourses(input);
  }

  @Post()
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  async createNewCourse(@Body() dto: CourseDto, @getAuth() auth: Auth) {
    return this.courseService.createNewCourse(dto, auth);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  async updateCourse(@Param('id') id: string, @Body() dto: CourseUpdateDto) {
    return this.courseService.updateCourse(id, dto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  async deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }
}
