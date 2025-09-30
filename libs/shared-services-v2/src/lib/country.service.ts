import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '@my-airways/shared-services-v2';
import { CreateCountryDto, UpdateCountryDto } from '@my-airways/shared-dto-v2';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCountryDto) {
    try {
      return await this.prisma.country.create({ data });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getAll() {
    try {
      return await this.prisma.country.findMany({
        include: {
          City: true,
        },
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getById(id: number) {
    try {
      const country = await this.prisma.country.findUnique({
        where: { id },
        include: {
          City: true,
        },
      });
      if (!country) throw new RpcException('Country not found');
      return country;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async update(id: number, data: UpdateCountryDto) {
    try {
      await this.getById(id);

      return await this.prisma.country.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const country = await this.prisma.country.delete({ where: { id } });
      if (!country) throw new RpcException('Country not found');
      return country;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
