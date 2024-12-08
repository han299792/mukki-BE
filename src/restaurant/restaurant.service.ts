import { Injectable } from '@nestjs/common';
import { PrismaClient, Restaurants } from '@prisma/client';
import { RestaurantRepository } from './restaurant.repository';
import { ResPhotoDto } from './dto/resPhoto.dto';
import { S3Service } from 'src/S3';

@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaClient,
    private restaurantRepository: RestaurantRepository,
    private readonly s3Service: S3Service,
  ) {}

  async getRestaurantList(
    is_vegan,
    is_halal,
    is_peanut,
  ): Promise<Restaurants[]> {
    const filterDto = {
      ...(is_vegan === true ? { is_vegan: true } : {}),
      ...(is_halal === true ? { is_halal: true } : {}),
      ...(is_peanut === true ? { is_peanut: true } : {}),
    };
    return this.restaurantRepository.findRestaurantInCondition(filterDto);
  }

  async uploadRestaurantPhoto(resPhotoDto: ResPhotoDto): Promise<Restaurants> {
    return await this.restaurantRepository.uploadRestaurantPhoto(resPhotoDto);
  }
}
