import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  id!: number;
}
