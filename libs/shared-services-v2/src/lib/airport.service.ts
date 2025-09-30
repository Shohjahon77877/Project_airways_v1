import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '@my-airways/shared-services-v2';
import { CreateAirportDto, UpdateAirportDto } from '@my-airways/shared-dto-v2';

@Injectable()
export class AirportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAirportDto) {
    try {
      const city = await this.prisma.city.findUnique({
        where: { id: data.city_id },
      });
      if (!city) throw new RpcException('City not found');
      return await this.prisma.airports.create({ data });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getAll() {
    try {
      return await this.prisma.airports.findMany({
        include: {
          City: {
            include: {
              country: true,
            },
          },
          departures: true,
          arrivals: true,
        },
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getById(id: number) {
    try {
      const airport = await this.prisma.airports.findUnique({
        where: { id },
        include: {
          City: {
            include: {
              country: true,
            },
          },
          departures: true,
          arrivals: true,
        },
      });
      if (!airport) throw new RpcException('Airport not found');
      return airport;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async update(id: number, data: UpdateAirportDto) {
    try {
      const city = await this.prisma.city.findUnique({
        where: { id: data.city_id },
      });
      if (!city) throw new RpcException('City not found');

      return await this.prisma.airports.update({ where: { id }, data });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const airport = await this.prisma.airports.delete({ where: { id } });
      if (!airport) throw new RpcException('Airport not found');
      return airport;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
