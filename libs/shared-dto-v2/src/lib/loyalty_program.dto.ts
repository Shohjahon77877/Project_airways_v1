import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Loyalt_Program_Rank } from '../../../../generated/prisma';

export class CreateLoyaltyProgramDto {
  @IsInt()
  @IsNotEmpty()
  user_id!: number;

  @IsInt()
  @IsOptional()
  points?: number;

  @IsEnum(Loyalt_Program_Rank)
  @IsOptional()
  level?: Loyalt_Program_Rank;
}

export class UpdateLoyaltyProgramDto {
  @IsInt()
  @IsOptional()
  points?: number;

  @IsOptional()
  level?: Loyalt_Program_Rank;
}
