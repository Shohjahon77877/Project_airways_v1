import { Module } from '@nestjs/common';
import { PrismaService } from '@my-airways/shared-services-v2';
import {
  AirportService,
  CityService,
  CountryService,
  CompanyService,
  PlaneService,
  ClassesService,
  SeatsService,
} from '@my-airways/shared-services-v2';

import { AirportController } from './airport.controller';
import { CityController } from './city.controller';
import { CountryController } from './country.controller';
import { CompanyController } from './company.controller';
import { PlaneController } from './plane.controller';
import { ClassController } from './class.controller';
import { SeatController } from './seat.controller';

@Module({
  imports: [],
  controllers: [
    AirportController,
    CityController,
    CountryController,
    CompanyController,
    PlaneController,
    ClassController,
    SeatController,
  ],
  providers: [
    PrismaService,
    AirportService,
    CityService,
    CountryService,
    CompanyService,
    PlaneService,
    ClassesService,
    SeatsService,
  ],
})
export class AppModule {}
