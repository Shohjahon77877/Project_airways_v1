import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  IsEmail,
  IsBoolean,
  IsInt,
  IsDate,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Roles } from '../../../../generated/prisma';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password too weak. Must contain uppercase, lowercase, number, and special character.',
    },
  )
  password!: string;

  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;

  @IsInt()
  @IsOptional()
  created_by?: number;

  @IsDate()
  @IsOptional()
  last_login?: Date;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  id!: number;
}
