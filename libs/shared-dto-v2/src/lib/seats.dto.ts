import {
  IsInt,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Extra_Detail } from '../../../../generated/prisma';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSeatDto {
  @IsInt()
  @IsNotEmpty()
  plane_id!: number;

  @IsInt()
  @IsNotEmpty()
  seat_number!: number;

  @IsInt()
  @IsNotEmpty()
  class_id!: number;

  @IsBoolean()
  @IsNotEmpty()
  is_available!: boolean;

  @IsOptional()
  @IsEnum(Extra_Detail)
  extra_detail?: Extra_Detail;

  @IsOptional()
  @IsNumber()
  extra_fee?: number;
}

export class UpdateSeatDto extends PartialType(CreateSeatDto) {
  id!: number;
}
