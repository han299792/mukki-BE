import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
}
