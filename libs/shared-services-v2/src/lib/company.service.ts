import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '@my-airways/shared-services-v2';
import { CreateCompanyDto, UpdateCompanyDto } from '@my-airways/shared-dto-v2';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({ data });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getAll() {
    try {
      return await this.prisma.company.findMany({
        include: {
          Planes: true,
        },
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getById(id: number) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id },
        include: {
          Planes: true,
        },
      });
      if (!company) throw new RpcException('Company not found');
      return company;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async update(id: number, data: UpdateCompanyDto) {
    try {
      await this.getById(id);

      return await this.prisma.company.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const company = await this.prisma.company.delete({ where: { id } });
      if (!company) throw new RpcException('Company not found');
      return company;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
