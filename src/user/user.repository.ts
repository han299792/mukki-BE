import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByKakaoId(kakaoId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { kakaoId } });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const registerData: Prisma.UserCreateInput = {
      username: data.username,
      email: data.email,
      password: data.password || '',
      kakaoId: data.kakaoId || null,
      location_lat: data.location_lat || null,
      location_long: data.location_long || null,
    };
    return this.prisma.user.create({ data: registerData });
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { user_id: userId },
      data,
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.prisma.user.delete({ where: { user_id: userId } });
  }
}
