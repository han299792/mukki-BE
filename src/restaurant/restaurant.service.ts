import { Injectable } from '@nestjs/common';
import { Prisma, Restaurants } from '@prisma/client';
import { RestaurantRepository } from './restaurant.repository';
import { ResPhotoDto } from './dto/resPhoto.dto';
import { FilterDto } from './dto/requestRestaurant.dto';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async getRestaurantList(filterDto: FilterDto): Promise<Restaurants[]> {
    return this.restaurantRepository.findRestaurantInCondition(filterDto);
  }

  async uploadRestaurantPhoto(resPhotoDto: ResPhotoDto): Promise<Restaurants> {
    return await this.restaurantRepository.uploadRestaurantPhoto(resPhotoDto);
  }
  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantRepository.createRestaurant(
      createRestaurantDto,
    );
  }
  async getRestaurantInfo(restaurantId: number) {
    return this.restaurantRepository.getRestaurantById(restaurantId);
  }
  async updateRestaurantInfo(
    restaurantId: number,
    data: Prisma.RestaurantsUpdateInput,
  ) {
    return this.restaurantRepository.updateRestaurant(restaurantId, data);
  }

  async deleteRestaurant(restaurantId: number) {
    return this.restaurantRepository.deleteRestaurant(restaurantId);
  }
}
