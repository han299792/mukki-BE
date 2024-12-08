import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantRepository } from './restaurant.repository';
import { S3Service } from 'src/S3';

@Module({
  providers: [RestaurantService, RestaurantRepository, S3Service],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
