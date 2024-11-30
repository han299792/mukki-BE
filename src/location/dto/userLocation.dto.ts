import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsDecimal()
  latitude: number;

  @IsNotEmpty()
  @IsDecimal()
  longitude: number;
}
