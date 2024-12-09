import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
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
        ...(is_vegan == true ? { is_res_vegan: is_vegan } : {}),
        ...(is_halal == true ? { is_res_halal: is_halal } : {}),
        ...(is_peanut == true ? { is_res_peanut: is_peanut } : {}),
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
}
