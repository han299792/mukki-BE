import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalHttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

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
    AuthModule,
  ],
  providers: [ConfigService],
  controllers: [AppController],
})
export class AppModule {}
