import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, kakaoId, location_lat, location_long } =
      createUserDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    return this.userRepository.createUser({
      username,
      email,
      password,
      kakaoId,
      location_lat,
      location_long,
    });
  }
}
