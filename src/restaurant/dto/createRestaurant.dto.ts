import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  food_category: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 15)
  contact_number: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  address_si: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  address_gu: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  address_dong: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  address_detail: string;

  @IsString()
  @IsNotEmpty()
  time_open: string;

  @IsString()
  @IsNotEmpty()
  time_close: string;

  @IsBoolean()
  @IsOptional()
  is_res_halal: boolean;

  @IsBoolean()
  @IsOptional()
  is_res_vegan: boolean;

  @IsBoolean()
  @IsOptional()
  is_res_peanut: boolean;

  @IsOptional()
  photo_id?: number;
}
