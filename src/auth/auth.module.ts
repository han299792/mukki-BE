import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [HttpModule],
  providers: [AuthService, ConfigService, HttpService, PrismaClient],
  controllers: [AuthController],
})
export class AuthModule {}
