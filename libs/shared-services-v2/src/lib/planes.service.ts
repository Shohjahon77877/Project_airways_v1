import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '@my-airways/shared-services-v2';
import { CreatePlaneDto, UpdatePlaneDto } from '@my-airways/shared-dto-v2';

@Injectable()
export class PlaneService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePlaneDto) {
    try {
      const { company_id } = data;
      const company = await this.prisma.company.findUnique({
        where: { id: company_id },
      });
      if (!company) throw new RpcException('Company not found');

      return await this.prisma.planes.create({ data });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getAll() {
    try {
      return await this.prisma.planes.findMany({
        include: {
          company: true,
          Seats: true,
          Flights: true,
        },
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getById(id: number) {
    try {
      const plane = await this.prisma.planes.findUnique({
        where: { id },
        include: {
          company: true,
          Seats: true,
          Flights: true,
        },
      });
      if (!plane) throw new RpcException('Plane not found');
      return plane;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async update(id: number, data: UpdatePlaneDto) {
    try {
      if (data.company_id) {
        const company = await this.prisma.company.findUnique({
          where: { id: data.company_id },
        });
        if (!company) throw new RpcException('Company not found');
      }

      return await this.prisma.planes.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const plane = await this.prisma.planes.delete({ where: { id } });
      if (!plane) throw new RpcException('Plane not found');
      return plane;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
