import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateLocationDto } from './dto/userLocation.dto';

@Injectable()
export class LocationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async updateUserLocation(userId: number, locationDto: CreateLocationDto) {
    return this.prisma.user.update({
      where: { user_id: userId },
      data: {
        location_lat: locationDto.latitude,
        location_long: locationDto.longitude,
      },
    });
  }
}
