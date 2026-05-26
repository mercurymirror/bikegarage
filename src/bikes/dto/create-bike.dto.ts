import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { BikeType } from '@prisma/client';

export class CreateBikeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsEnum(BikeType)
  type!: BikeType;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;
}
