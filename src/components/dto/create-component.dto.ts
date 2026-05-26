import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  brand!: string;
  @IsString()
  model!: string;
  @IsNumber()
  @IsPositive()
  @IsInt()
  installedAtKm!: number;
  componentTypeId!: string;
}
