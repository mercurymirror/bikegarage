import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateComponentTypeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsNumber()
  @IsPositive()
  wearLimitKm!: number;
}
