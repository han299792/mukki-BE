import { IsBoolean } from 'class-validator';

export class FilterDto {
  @IsBoolean()
  is_vegan?: boolean;
  @IsBoolean()
  is_halal?: boolean;
  @IsBoolean()
  is_peanut?: boolean;
}
