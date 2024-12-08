import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FillterDto } from './dto/requestRestaurant.dto';

@Injectable()
export class RestaurantRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findRestaurantInCondition(filterDto: FillterDto) {
    return this.prisma.restaurants;
  }
}
