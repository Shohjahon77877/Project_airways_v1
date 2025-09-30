import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAirportDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsInt()
  @IsNotEmpty()
  city_id!: number;
}

export class UpdateAirportDto extends PartialType(CreateAirportDto) {}
