import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '../../../../generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this['$connect']();
    Logger.log('Prisma connected');
  }

  async onModuleDestroy() {
    await this['$disconnect']();
    Logger.log('Prisma disconnected');
  }
}
