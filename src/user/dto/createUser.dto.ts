import { IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  kakaoId?: number;
}
