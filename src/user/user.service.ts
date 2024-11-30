import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(createUserDto: CreateUserDto): Promise partial implements<User> {
    const { username, email, password, kakaoId } = createUserDto;
  }
}
