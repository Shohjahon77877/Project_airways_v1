import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@my-airways/shared-services-v2';
import {
  CreateLoyaltyProgramDto,
  UpdateLoyaltyProgramDto,
} from '@my-airways/shared-dto-v2';
import { errorResponse } from '@my-airways/shared-utils';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async createLoyaltyMember(data: CreateLoyaltyProgramDto) {
    const { user_id } = data;
    const user = await this.prisma.users.findUnique({ where: { id: user_id } });
    console.log(data);
    if (!user) {
      return errorResponse(404, 'User not found');
    }
    return await this.prisma.loyaltyProgram.create({ data });
  }

  async getLoyaltyMembers() {
    return await this.prisma.loyaltyProgram.findMany({ include: { user: true } });
  }

  async getLoyaltyMemberById(id: number) {
    const member = await this.prisma.loyaltyProgram.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!member) {
      return errorResponse(404, 'Member not found');
    }
    return member;
  }

  async updateLoyaltyMember(id: number, data: UpdateLoyaltyProgramDto) {
    const member = await this.prisma.loyaltyProgram.findUnique({
      where: { id },
    });
    if (!member) {
      return errorResponse(404, 'Member not found');
    }

    const { user_id } = member;
    const user = await this.prisma.users.findUnique({ where: { id: user_id } });
    if (!user) {
      return errorResponse(404, 'User not found');
    }

    return await this.prisma.loyaltyProgram.update({ where: { id }, data });
  }

  async deleteLoyaltyMember(id: number) {
    const member = await this.prisma.loyaltyProgram.findUnique({
      where: { id },
    });
    if (!member) {
      return errorResponse(404, 'Member not found');
    }

    return await this.prisma.loyaltyProgram.delete({ where: { id } });
  }
}
