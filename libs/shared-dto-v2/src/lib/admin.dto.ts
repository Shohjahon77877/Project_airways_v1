import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  IsEmail,
  IsBoolean,
  IsInt,
  IsDate,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

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

  @IsBoolean()
  @IsOptional()
  is_super_admin?: boolean;

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
