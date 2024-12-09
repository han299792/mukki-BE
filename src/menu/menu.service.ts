import { Injectable, NotFoundException } from '@nestjs/common';
import MenuRepository from './menu.repository';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async getMenuListByRestaurant(restaurantId: number) {
    return this.menuRepository.getMenusByRestaurantId(restaurantId);
  }

  async getMenuInfo(menuId: number) {
    const menu = await this.menuRepository.getMenuInfo(menuId);
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${menuId} not found`);
    }
    return menu;
  }

  async uploadMenuPhoto(menuId: number, filePath: string) {
    const photo = await this.menuRepository.savePhoto(filePath);

    const menu = await this.menuRepository.updateMenuPhoto(
      menuId,
      photo.photo_id,
    );

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${menuId} not found`);
    }

    return {
      message: `Photo successfully uploaded and linked to menu ${menuId}`,
      photo,
    };
  }
}
