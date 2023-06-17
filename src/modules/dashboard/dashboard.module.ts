import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/schemas/accounts';
import { Itinerary, ItinerarySchema } from 'src/schemas/itineraries';
import { Location, LocationSchema } from 'src/schemas/locations';
import { AccountsModule } from '../account/account.module';
import { LocationModule } from '../location/location.module';
import { RouteModule } from '../route/route.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Location.name, schema: LocationSchema },
      { name: Itinerary.name, schema: ItinerarySchema },
    ]),
    JwtModule,
    AccountsModule,
    LocationModule,
    RouteModule,
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
