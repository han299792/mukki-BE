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

  async getRestaurantList(isVegan, isHalal): Promise<Restaurants[]> {
    const is_vegan = isVegan == 'true' ? true : false;
    const is_halal = isHalal == 'true' ? true : false;
    const filterDto = { is_vegan, is_halal };
    return this.restaurantRepository.findRestaurantInCondition(filterDto);
  }

  async uploadRestaurantPhoto(resPhotoDto: ResPhotoDto): Promise<Restaurants> {
    return this.restaurantRepository.uploadRestaurantPhoto(resPhotoDto);
  }
}
