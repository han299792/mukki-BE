import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  private readonly prisma = new PrismaClient();

  async findByKakaoId(kakaoId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { kakaoId } });
  }

  async findOne(where: Partial<User>): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  async createUser(data: Partial<User>): Promise<User> {
    return this.prisma.user.create({ data });
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
