import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { GlobalHttpModule } from 'src/http/http.module';

@Module({
  imports: [GlobalHttpModule],
  providers: [AuthService, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
