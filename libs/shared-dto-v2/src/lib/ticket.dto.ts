import {
  IsInt,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsDecimal,
  IsDate,
} from 'class-validator';
import { Ticket_status } from '../../../../generated/prisma';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTicketDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  user_id!: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  flight_id!: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  seat_id!: number;

  @IsBoolean()
  @IsNotEmpty()
  is_round_trip!: boolean;

  @IsDate()
  @IsOptional()
  purchase_date?: string;

  @IsDecimal()
  @IsNotEmpty()
  price!: number;

  @IsEnum(Ticket_status)
  @IsNotEmpty()
  ticket_status!: Ticket_status;
}

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
