import { Injectable } from '@nestjs/common';
import { PrismaClient, Restaurants } from '@prisma/client';
import { RestaurantRepository } from './restaurant.repository';
@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaClient,
    private restaurantRepository: RestaurantRepository,
  ) {}

  async getRestaurantList(isVegan, isHalal): Promise<Restaurants[]> {
    const is_vegan = isVegan == 'true' ? true : false;
    const is_halal = isHalal == 'true' ? true : false;
    const filterDto = { is_vegan, is_halal };
    return this.restaurantRepository.findRestaurantInCondition(filterDto);
  }
}
