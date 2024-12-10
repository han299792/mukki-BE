import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/userLocation.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post(':userId')
  async saveLocation(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() locationDto: CreateLocationDto,
  ) {
    return this.locationService.saveUserLocation(userId, locationDto);
  }
}
