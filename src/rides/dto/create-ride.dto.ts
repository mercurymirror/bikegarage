import {
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateRideDto {
  @IsDate()
  @IsOptional()
  date?: Date;
  @IsNumber()
  @IsInt()
  @IsPositive()
  distanceKm!: number;
}
