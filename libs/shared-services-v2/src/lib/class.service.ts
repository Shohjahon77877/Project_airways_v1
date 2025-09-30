import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';
import { CreateClassDto, UpdateClassDto } from '@my-airways/shared-dto-v2';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClassDto) {
    try {
      return await this.prisma.classes.create({ data });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getAll() {
    try {
      return await this.prisma.classes.findMany({
        include: {
          Seats: true,
        },
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getById(id: number) {
    try {
      const cls = await this.prisma.classes.findUnique({
        where: { id },
        include: {
          Seats: true,
        },
      });
      if (!cls) throw new RpcException('Class not found');
      return cls;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async update(id: number, data: UpdateClassDto) {
    try {
      await this.getById(id);

      return await this.prisma.classes.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const cls = await this.prisma.classes.delete({ where: { id } });
      if (!cls) throw new RpcException('Class not found');
      return cls;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
