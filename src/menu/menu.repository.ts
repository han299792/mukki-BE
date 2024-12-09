import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export default class MenuRepository {
  constructor(private readonly prisma: PrismaClient) {}

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
  async savePhoto(filePath: string) {
    return this.prisma.photo.create({
      data: {
        file_path: filePath,
      },
    });
  }

  async updateMenuPhoto(menuId: number, photoId: number) {
    return this.prisma.menu.update({
      where: { menu_id: menuId },
      data: { photo_id: photoId },
    });
  }
}
