import { BadRequestException, Controller, Get, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Auth, GetAuth } from 'src/core/decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Role } from 'src/utils';
import { DashboardService } from './dashboard.service';
import { DashboardQueryDto } from './dto';

@Controller('/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(@GetAuth() auth: Auth, @Query() query: DashboardQueryDto) {
    if (auth.role !== Role.ADMIN)
      throw new UnauthorizedException({ message: 'You do not have permission to create a new location', data: null });

    const data = await this.dashboardService.getDashboard(query);

    if (!data) throw new BadRequestException('Bad Request');
    return {
      message: 'Success',
      data: data,
    };
  }

  @Get('/overview')
  @UseGuards(JwtAuthGuard)
  async getDataOverviewDashboard(@GetAuth() auth: Auth) {
    console.log(auth.role);
    if (auth.role !== Role.ADMIN)
      throw new UnauthorizedException({ message: 'You do not have permission', data: null });

    const data = await this.dashboardService.getDataOverviewDashboard();
    if (!data) throw new BadRequestException('Bad Request');
    return {
      message: 'Success',
      data: data,
    };
  }
}
