import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';
import { CreateCityDto, UpdateCityDto } from '@my-airways/shared-dto-v2';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCityDto) {
    try {
      const { country_id } = data;
      const country = await this.prisma.country.findUnique({
        where: { id: country_id },
      });
      if (!country) throw new RpcException('Country not found');
      return await this.prisma.city.create({ data });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getAll() {
    try {
      return await this.prisma.city.findMany({
        include: {
          country: true,
          Airports: true,
        },
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getById(id: number) {
    try {
      const city = await this.prisma.city.findUnique({
        where: { id },
        include: {
          country: true,
          Airports: true,
        },
      });
      if (!city) throw new RpcException('City not found');
      return city;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async update(id: number, data: UpdateCityDto) {
    try {
      if (data.country_id) {
        const country = await this.prisma.country.findUnique({
          where: { id: data.country_id },
        });
        if (!country) throw new RpcException('Country not found');
      }

      return await this.prisma.city.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const city = await this.prisma.city.delete({ where: { id } });
      if (!city) throw new RpcException('City not found');
      return city;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
