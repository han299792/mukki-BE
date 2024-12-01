import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { CreateLocationDto } from './dto/userLocation.dto';
import { User } from '@prisma/client';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async saveUserLocation(
    userId: number,
    locationDto: CreateLocationDto,
  ): Promise<User> {
    return this.locationRepository.updateUserLocation(userId, locationDto);
  }
}
