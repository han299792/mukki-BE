import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import MenuRepository from './menu.repository';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly menuRepository: MenuRepository,
  ) {}

  @Get('list/:restaurantId')
  @ApiOperation({ summary: 'Get menu list by restaurant ID' })
  @ApiResponse({
    status: 200,
    description: 'Menu list retrieved successfully.',
    schema: {
      example: [
        {
          menu_id: 1,
          restaurant_id: 10,
          name: 'Spaghetti Carbonara',
          photo: {
            photo_id: 101,
            filepath: '/uploads/carbonara.jpg',
          },
          price: 12.99,
          is_menu_halal: true,
          is_menu_vegan: false,
          is_menu_peanut: false,
        },
        {
          menu_id: 2,
          restaurant_id: 10,
          name: 'Vegan Salad',
          photo: {
            photo_id: 102,
            filepath: '/uploads/vegan_salad.jpg',
          },
          price: 9.99,
          is_menu_halal: false,
          is_menu_vegan: true,
          is_menu_peanut: false,
        },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant or menu not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'No menus found for restaurant ID 10',
        error: 'Not Found',
      },
    },
  })
  async getMenuList(@Param('restaurantId') restaurantId: number) {
    return this.menuService.getMenuListByRestaurant(restaurantId);
  }
}
