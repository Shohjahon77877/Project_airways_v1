import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaneDto {
  @IsString()
  @IsNotEmpty()
  model_name!: string;

  @IsInt()
  @IsNotEmpty()
  company_id!: number;

  @IsInt()
  @IsNotEmpty()
  total_seats!: number;
}

export class UpdatePlaneDto extends PartialType(CreatePlaneDto) {}
