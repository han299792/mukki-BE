import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FillterDto } from './dto/requestRestaurant.dto';
import { S3Service } from 'src/S3';
import { ResPhotoDto } from './dto/resPhoto.dto';

@Injectable()
export class RestaurantRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly s3Service: S3Service,
  ) {}

  async findRestaurantInCondition(filterDto: FillterDto) {
    const { is_vegan, is_halal } = filterDto;
    return this.prisma.restaurants.findMany({
      where: {
        is_res_vegan: is_vegan,
        is_res_halal: is_halal,
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
}
