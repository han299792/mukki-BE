import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'JohnDoe',
    description: 'The unique username of the user.',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 12345,
    description: 'Optional Kakao ID for the user.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  kakaoId?: number;
}
