import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Flight_Status } from '../../../../generated/prisma';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFlightDto {
  @IsInt()
  @IsNotEmpty()
  flight_number!: number;

  @IsInt()
  @IsNotEmpty()
  plane_id!: number;

  @IsInt()
  @IsNotEmpty()
  departure_airport_id!: number;

  @IsInt()
  @IsNotEmpty()
  arrival_airport_id!: number;

  @IsDate()
  @IsNotEmpty()
  departure_time!: number;

  @IsDate()
  @IsNotEmpty()
  arrival_time!: number;

  @IsEnum(Flight_Status)
  @IsOptional()
  status?: Flight_Status;
}

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
  id!: number;
}
