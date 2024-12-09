import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { S3Service } from 'src/S3';

@Injectable()
export default class MenuRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly s3Service: S3Service,
  ) {}

  async getMenusByRestaurantId(restaurantId: number) {
    return this.prisma.menu.findMany({
      where: { restaurant_id: restaurantId },
      include: {
        photo: {
          select: {
            photo_id: true,
            file_path: true,
          },
        },
      },
    });
  }
  async getMenuInfo(menuId: number) {
    return this.prisma.menu.findUnique({
      where: { menu_id: menuId },
      include: {
        photo: {
          select: {
            photo_id: true,
            file_path: true,
          },
        },
      },
    });
  }
}
