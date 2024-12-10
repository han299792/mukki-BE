import { Module } from '@nestjs/common';
import MenuRepository from './menu.repository';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { S3Service } from 'src/S3';

@Module({
  providers: [MenuRepository, MenuService, S3Service],
  controllers: [MenuController],
})
export class MenuModule {}
