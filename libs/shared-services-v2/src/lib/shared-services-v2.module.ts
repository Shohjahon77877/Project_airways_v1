import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { SeatsService } from './seats.service';
import { ClassesService } from './class.service';
import { CityService } from './city.service';
import { CountryService } from './country.service';
import { CompanyService } from './company.service';
import { AirportService } from './airport.service';
import { PlaneService } from './planes.service';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import path = require('path');

export const ADMIN_SERVICE_RABBITMQ = 'ADMIN_SERVICE_RABBITMQ';
export const FLIGHT_SERVICE_RABBITMQ = 'FLIGHT_SERVICE_RABBITMQ';
export const NEWS_SERVICE_RABBITMQ = 'NEWS_SERVICE_RABBITMQ';
export const DB_SERVICE_RABBITMQ = 'DB_SERVICE_RABBITMQ';
export const AUTH_SERVICE_RABBITMQ = 'AUTH_SERVICE_RABBITMQ';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../../.env'),
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${config.get<string>('JWT_ACCESS_TOKEN_EXPIRY_MINUTES')}m`,
        },
      }),
    }),
    ClientsModule.register([
      {
        name: ADMIN_SERVICE_RABBITMQ,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:Pass123@localhost:5672'],
          queue: 'admin_queue',
          queueOptions: { durable: true },
        },
      },
      {
        name: FLIGHT_SERVICE_RABBITMQ,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:Pass123@localhost:5672'],
          queue: 'flight_queue',
          queueOptions: { durable: true },
        },
      },
      {
        name: NEWS_SERVICE_RABBITMQ,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:Pass123@localhost:5672'],
          queue: 'news_queue',
          queueOptions: { durable: true },
        },
      },
      {
        name: DB_SERVICE_RABBITMQ,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:Pass123@localhost:5672'],
          queue: 'db_queue',
          queueOptions: { durable: true },
        },
      },
      {
        name: AUTH_SERVICE_RABBITMQ,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:Pass123@localhost:5672'],
          queue: 'auth_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [
    PrismaService,
    SeatsService,
    ClassesService,
    CityService,
    CountryService,
    CompanyService,
    AirportService,
    PlaneService,
    TokenService,
  ],
  exports: [
    ClientsModule,
    PrismaService,
    SeatsService,
    ClassesService,
    CityService,
    CountryService,
    CompanyService,
    AirportService,
    PlaneService,
    TokenService,
  ],
})
export class SharedServicesModule {}
