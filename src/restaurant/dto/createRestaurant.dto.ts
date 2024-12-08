import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
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
  address_detail?: string;

  @IsDateString()
  @IsNotEmpty()
  time_open: Date;

  @IsDateString()
  @IsNotEmpty()
  time_close: Date;

  @IsBoolean()
  @IsOptional()
  is_res_halal?: boolean;

  @IsBoolean()
  @IsOptional()
  is_res_vegan?: boolean;

  @IsOptional()
  photo_id?: number;
}
