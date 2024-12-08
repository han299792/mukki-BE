import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FillterDto } from './dto/requestRestaurant.dto';

@Injectable()
export class RestaurantRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findRestaurantInCondition(filterDto: FillterDto) {
    const { is_vegan, is_halal } = filterDto;
    return this.prisma.restaurants.findMany({
      where: {
        is_res_vegan: is_vegan,
        is_res_halal: is_halal,
      },
    });
  }
}
