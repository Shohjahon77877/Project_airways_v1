import { IsString, IsNotEmpty, IsNumber, IsDecimal } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  class_name!: string;

  @IsNumber()
  @IsNotEmpty()
  base_price!: number;
}

export class UpdateClassDto extends PartialType(CreateClassDto) {
  id!: number;
}
