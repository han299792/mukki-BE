import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationRepository } from './location.repository';

@Module({
  providers: [LocationService, LocationRepository],
  controllers: [LocationController],
})
export class LocationModule {}
