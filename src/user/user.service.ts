import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository'; // Repository 파일을 import
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    return this.userRepository.updateUser(userId, data);
  }

  async deleteUser(userId: number): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }
}
