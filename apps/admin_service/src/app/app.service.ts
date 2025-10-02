import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@my-airways/shared-services-v2';
import { CreateAdminDto, UpdateAdminDto } from '@my-airways/shared-dto-v2';
import { PasswordUtil } from '@my-airways/shared-utils';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(data: CreateAdminDto) {
    try {
      const { password } = data;
      const hashedPassword = await PasswordUtil.hashPassword(password);

      return await this.prisma.admin.create({
        data: {
          ...data,
          password: hashedPassword
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAdmins() {
    try {
      return await this.prisma.admin.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findAdminById(id: number) {
    try {
      const admin = await this.prisma.admin.findUnique({ where: { id } });
      if (!admin) {
        throw new NotFoundException(404, `Admin by id ${id} not found`);
      }
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateAdmin(id: number, data: UpdateAdminDto) {
    try {
      if (Object.keys(data).length === 0) {
        return new NotFoundException('No data provided to update.');
      }

      if (data.password) {
        data.password = await PasswordUtil.hashPassword(data.password);
      }

      return await this.prisma.admin.update({ where: { id }, data });
    } catch (error) {
      throw error;
    }
  }

  async removeAdmin(id: number) {
    try {
      return await this.prisma.admin.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
