import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

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
  async getMenuList(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.menuService.getMenuListByRestaurant(restaurantId);
  }

  @Get('info/:menuId')
  @ApiOperation({ summary: 'Get menu information by menu ID' })
  @ApiResponse({
    status: 200,
    description: 'Menu information retrieved successfully.',
    schema: {
      example: {
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
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Menu not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Menu with ID 1 not found',
        error: 'Not Found',
      },
    },
  })
  async getMenuInfo(@Param('menuId', ParseIntPipe) menuId: number) {
    return this.menuService.getMenuInfo(menuId);
  }

  @Post('upload-photo/:menuId')
  @ApiOperation({ summary: 'Upload and link a photo to a menu' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Photo successfully uploaded and linked to the menu.',
    schema: {
      example: {
        message: 'Photo successfully uploaded and linked to menu 1',
        photo: {
          photo_id: 123,
          file_path: '/uploads/menu_photo.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Menu not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Menu with ID 1 not found',
        error: 'Not Found',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadMenuPhoto(
    @Param('menuId', ParseIntPipe) menuId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{
    message: string;
    photo: { photo_id: number; file_path: string };
  }> {
    const filePath = `/uploads/${file.originalname}`;
    return this.menuService.uploadMenuPhoto(menuId, filePath);
  }
}
