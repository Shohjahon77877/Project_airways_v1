import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsInt()
  @IsNotEmpty()
  published_by_admin_id!: number;

  @IsOptional()
  @IsDateString()
  published_at?: string;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  id!: number;
}
