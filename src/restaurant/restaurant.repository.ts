import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { S3Service } from 'src/S3';
import { ResPhotoDto } from './dto/resPhoto.dto';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { FilterDto } from './dto/requestRestaurant.dto';

@Injectable()
export class RestaurantRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly s3Service: S3Service,
  ) {}

  async findRestaurantInCondition(filterDto: FilterDto) {
    const { is_vegan, is_halal, is_peanut } = filterDto;
    return this.prisma.restaurants.findMany({
      where: {
        ...(Boolean(is_vegan) ? { is_res_vegan: true } : {}),
        ...(Boolean(is_halal) ? { is_res_halal: true } : {}),
        ...(Boolean(is_peanut) ? { is_res_peanut: true } : {}),
      },
      include: { photo: true },
    });
  }

  async uploadRestaurantPhoto(resPhotoDto: ResPhotoDto) {
    const { restaurant_id, file } = resPhotoDto;
    const photoUrl = await this.s3Service.uploadFile(file, 'menus');
    const photo = await this.prisma.photo.create({
      data: { file_path: photoUrl },
    });
    return await this.prisma.restaurants.update({
      where: { restaurant_id: restaurant_id },
      data: { photo_id: photo.photo_id },
    });
  }
  async createRestaurant(data: CreateRestaurantDto) {
    return await this.prisma.restaurants.create({
      data,
    });
  }
  async getRestaurantById(restaurantId: number) {
    return this.prisma.restaurants.findUnique({
      where: { restaurant_id: restaurantId },
      include: {
        photo: true,
      },
    });
  }

  async updateRestaurant(
    restaurantId: number,
    data: Prisma.RestaurantsUpdateInput,
  ) {
    return this.prisma.restaurants.update({
      where: { restaurant_id: restaurantId },
      data,
    });
  }

  async deleteRestaurant(restaurantId: number) {
    return this.prisma.restaurants.delete({
      where: { restaurant_id: restaurantId },
    });
  }
}
