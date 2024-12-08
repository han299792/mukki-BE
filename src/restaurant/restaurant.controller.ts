import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';

@ApiTags('restaurants') // Swagger 태그
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('nearby')
  @ApiOperation({
    summary: 'Get nearby restaurants',
    description:
      'Retrieve a list of restaurants near the provided coordinates.',
  })
  @ApiQuery({
    name: 'lat',
    type: Number,
    description: 'Latitude of the user',
    example: 37.5665,
  })
  @ApiQuery({
    name: 'lng',
    type: Number,
    description: 'Longitude of the user',
    example: 126.978,
  })
  @ApiQuery({
    name: 'radius',
    type: Number,
    required: false,
    description: 'Search radius in kilometers (default: 5)',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'List of nearby restaurants.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Sample Restaurant' },
          latitude: { type: 'number', example: 37.5665 },
          longitude: { type: 'number', example: 126.978 },
          foodCategory: { type: 'string', example: 'Korean' },
          distance: { type: 'number', example: 0.8 },
        },
      },
    },
  })
  async getNearbyRestaurants(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number = 5,
  ) {
    //return this.restaurantService.findNearbyRestaurants(lat, lng, radius);
  }

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
        },
      },
    },
  })
  @Get('filteredLIst')
  async getRestaurantInCondition(
    @Query('vegan') isVegan: boolean,
    @Query('halal') isHalal: boolean,
  ) {
    return this.restaurantService.getRestaurantList(isVegan, isHalal);
  }
}
