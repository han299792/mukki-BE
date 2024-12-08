import { Injectable } from '@nestjs/common';
import { PrismaClient, Restaurants } from '@prisma/client';
import { RestaurantRepository } from './restaurant.repository';
import { ResPhotoDto } from './dto/resPhoto.dto';
import { S3Service } from 'src/S3';
import { FilterDto } from './dto/requestRestaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaClient,
    private restaurantRepository: RestaurantRepository,
    private readonly s3Service: S3Service,
  ) {}

  async getRestaurantList(filterDto: FilterDto): Promise<Restaurants[]> {
    return this.restaurantRepository.findRestaurantInCondition(filterDto);
  }

  async uploadRestaurantPhoto(resPhotoDto: ResPhotoDto): Promise<Restaurants> {
    return await this.restaurantRepository.uploadRestaurantPhoto(resPhotoDto);
  }
}
