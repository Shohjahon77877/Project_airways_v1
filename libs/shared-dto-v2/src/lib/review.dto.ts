import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  user_id!: number;

  @IsInt()
  @IsNotEmpty()
  flight_id!: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  @IsNotEmpty()
  comment!: string;
}

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
