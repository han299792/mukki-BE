import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaClient) {}

  async findNearbyRestaurants(lat: number, lng: number, radius: number) {
    const radiusInDegrees = radius / 111;
    return this.prisma.restaurants.findMany({
      where: {
        latitude: { gte: lat - radiusInDegrees, lte: lat + radiusInDegrees },
        longitude: { gte: lng - radiusInDegrees, lte: lng + radiusInDegrees },
      },
    });
  }
}
