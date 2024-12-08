import { Injectable } from '@nestjs/common';
import { PrismaClient, Restaurants } from '@prisma/client';
import { FillterDto } from './dto/requestRestaurant.dto';
import { RestaurantRepository } from './restaurant.repository';
@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaClient) {}

  async getRestaurantList(filterDto: FillterDto): Promise<Restaurants[]> {
    return RestaurantRepository.findRestaurantInCondition(filterDto);
  }
}
