import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, kakaoId } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.createUser({
      username,
      email,
      password: hashedPassword,
      kakaoId,
    });

    return newUser;
  }
}
