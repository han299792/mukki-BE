import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/userLocation.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaClient) {}

  async saveUserLocation(userId: number, locationDto: CreateLocationDto) {
    return this.prisma.user.update({
      where: { user_id: userId },
      data: {
        location_lat: locationDto.latitude,
        location_long: locationDto.longitude,
      },
    });
  }
}
