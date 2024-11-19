import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserRepository {
  private readonly prisma = new PrismaClient();

  async findByKakaoId(kakaoId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { kakaoId } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, kakaoId, location_lat, location_long } =
      createUserDto;
    const newUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password,
        kakaoId,
        location_lat,
        location_long,
      },
    });
    return newUser;
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
