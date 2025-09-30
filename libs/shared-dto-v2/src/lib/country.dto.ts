import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  id!: number;
}
