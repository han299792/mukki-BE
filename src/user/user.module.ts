import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [HttpModule],
  providers: [UserService, ConfigService, HttpService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
