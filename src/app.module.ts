import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { RestaurantService } from './restaurant/restaurant.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalHttpModule } from './http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GlobalHttpModule,
    UserModule,
    LocationModule,
    RestaurantModule,
    LocationModule,
    PrismaModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    LocationController,
  ],
  providers: [
    AppService,
    AuthService,
    ConfigService,
    UserService,
    RestaurantService,
    LocationService,
  ],
})
export class AppModule {}
