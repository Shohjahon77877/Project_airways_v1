import { CreateAdminDto, CreateUserDto, UpdateUserDto } from '@my-airways/shared-dto-v2';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@my-airways/shared-services-v2';
import { PasswordUtil, errorResponse } from '@my-airways/shared-utils';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async createUser(data: CreateUserDto) {
    try {
      const { password } = data;
      const hashedPassword = await PasswordUtil.hashPassword(password);
      console.log(data);

      return await this.prisma.users.create({
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password_hash: hashedPassword,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.prisma.users.findUnique({ where: { id } });
      if (!user) {
        throw errorResponse(404, `User by id: ${id} not found`)
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUsers() {
    try {
      return await this.prisma.users.findMany();
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, data: UpdateUserDto) {
    try {
      if (Object.keys(data).length === 0) {
        throw errorResponse(500, 'No data provided to update.');
      }

      if (data.password) {
        data.password = await PasswordUtil.hashPassword(data.password);
      }

      return await this.prisma.users.update({ where: { id }, data });
    } catch (error) {
      throw new RpcException(JSON.stringify(error));
    }
  }
  
  async removeUser(id: number) {
    try {
      const deletedUser = await this.prisma.users.delete({ where: { id } });
      if (!deletedUser) {
        throw errorResponse(404, `User by id: ${id} not found`)
      }
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
