import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @ApiResponse({
    status: 200,
    description: '조건에 맞는 식당의 리스트 반환',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Sample Restaurant' },
          foodCategory: { type: 'string', example: 'Korean' },
          contact_number: { type: 'string', example: '010-2241-2543' },
          address_si: { type: 'string', example: 'gwangju' },
          address_gu: { type: 'string', example: 'bokgu' },
          address_dong: { type: 'string', example: 'Ohoung' },
          address_detail: { type: 'string', example: '123-14' },
          is_res_vegan: { type: 'Boolean', example: 'true' },
          is_res_halal: { type: 'boolean', example: 'false' },
          is_res_peanut: { type: 'boolean', example: 'false' },
        },
      },
    },
  })
  @Get('filteredLIst')
  async getRestaurantInCondition(
    @Query('vegan') is_vegan: boolean,
    @Query('halal') is_halal: boolean,
    @Query('peanut') is_peanut: boolean,
  ) {
    const filterDto = { is_vegan, is_halal, is_peanut };
    return await this.restaurantService.getRestaurantList(filterDto);
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @Param('id', ParseIntPipe) restaurant_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.restaurantService.uploadRestaurantPhoto({
      restaurant_id,
      file,
    });
  }

  @Post()
  async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Get('info/:id')
  @ApiResponse({
    status: 200,
    description: 'Restaurant information retrieved successfully.',
    schema: {
      example: {
        restaurant_id: 1,
        name: 'The Gourmet Spot',
        food_category: 'Italian',
        contact_number: '123-456-7890',
        address_si: 'Seoul',
        address_gu: 'Gangnam',
        address_dong: 'Apgujeong',
        address_detail: 'Building 123',
        time_open: '10:00',
        time_close: '22:00',
        is_res_halal: true,
        is_res_vegan: false,
        photo: {
          photo_id: 1,
          filepath: '/uploads/restaurant1.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Restaurant with ID 1 not found',
        error: 'Not Found',
      },
    },
  })
  async getRestaurantInfo(@Param('id', ParseIntPipe) restaurantId: number) {
    return this.restaurantService.getRestaurantInfo(restaurantId);
  }
  @Put('update/:id')
  @ApiOperation({ summary: 'Update restaurant information' })
  @ApiResponse({
    status: 200,
    description: 'Restaurant information updated successfully.',
    schema: {
      example: {
        restaurant_id: 1,
        name: 'Updated Gourmet Spot',
        food_category: 'Fusion',
        contact_number: '123-456-7890',
        address_si: 'Seoul',
        address_gu: 'Gangnam',
        address_dong: 'Apgujeong',
        address_detail: 'Building 123',
        time_open: '11:00',
        time_close: '23:00',
        is_res_halal: false,
        is_res_vegan: true,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Restaurant with ID 1 not found',
        error: 'Not Found',
      },
    },
  })
  @ApiBody({
    description: 'Updated restaurant data',
    schema: {
      example: {
        name: 'Updated Gourmet Spot',
        food_category: 'Fusion',
        contact_number: '123-456-7890',
        address_si: 'Seoul',
        address_gu: 'Gangnam',
        address_dong: 'Apgujeong',
        address_detail: 'Building 123',
        time_open: '11:00',
        time_close: '23:00',
        is_res_halal: false,
        is_res_vegan: true,
      },
    },
  })
  async updateRestaurantInfo(
    @Param('id', ParseIntPipe) restaurantId: number,
    @Body() data: any,
  ) {
    return this.restaurantService.updateRestaurantInfo(restaurantId, data);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a restaurant' })
  @ApiResponse({
    status: 200,
    description: 'Restaurant deleted successfully.',
    schema: {
      example: {
        message: 'Restaurant with ID 1 has been deleted.',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Restaurant with ID 1 not found',
        error: 'Not Found',
      },
    },
  })
  async deleteRestaurant(@Param('id', ParseIntPipe) restaurantId: number) {
    await this.restaurantService.deleteRestaurant(restaurantId);
    return { message: `Restaurant with ID ${restaurantId} has been deleted.` };
  }
}
