import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantRepository } from './restaurant.repository';

@Module({
  providers: [RestaurantService, RestaurantRepository],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
