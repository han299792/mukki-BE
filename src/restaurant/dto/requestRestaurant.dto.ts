import { IsBoolean } from 'class-validator';

export class FillterDto {
  @IsBoolean()
  is_vegan: boolean;
  @IsBoolean()
  is_halal: boolean;
}
