import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '@my-airways/shared-services-v2';
import { CreateSeatDto, UpdateSeatDto } from '@my-airways/shared-dto-v2';

@Injectable()
export class SeatsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSeatDto) {
    try {
      const { plane_id, class_id } = data;
      const plane = await this.prisma.planes.findUnique({
        where: { id: plane_id },
      });
      if (!plane) throw new RpcException('Plane not found');

      const totalAssignedSeatsForPlane = await this.prisma.seats.count({
        where: { plane_id },
      });
      if (totalAssignedSeatsForPlane >= plane.total_seats) {
        const message = { status: 400, message: 'Seats for plane exceeded' };
        throw new RpcException(JSON.stringify(message));
      }

      const cls = await this.prisma.classes.findUnique({
        where: { id: class_id },
      });
      if (!cls) {
        const message = { status: 404, message: 'Class not found' };
        throw new RpcException(JSON.stringify(message));
      }

      return await this.prisma.seats.create({ data });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async getAll() {
    try {
      return await this.prisma.seats.findMany({
        include: {
          Plane: true,
          Class: true,
          Ticket: true,
        },
      });
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  async getById(id: number) {
    try {
      const seat = await this.prisma.seats.findUnique({
        where: { id },
        include: {
          Plane: true,
          Class: true,
          Ticket: true,
        },
      });
      if (!seat) {
        const message = { status: 404, message: 'Seat not found' };
        throw new RpcException(JSON.stringify(message));
      }
      return seat;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async update(id: number, data: UpdateSeatDto) {
    try {
      await this.getById(id);
      if (data.plane_id) {
        const plane = await this.prisma.planes.findUnique({
          where: { id: data.plane_id },
        });
        if (!plane) throw new RpcException('Plane not found');
      }

      if (data.class_id) {
        const cls = await this.prisma.classes.findUnique({
          where: { id: data.class_id },
        });
        if (!cls) throw new RpcException('Class not found');
      }

      return await this.prisma.seats.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const seat = await this.prisma.seats.delete({ where: { id } });
      if (!seat) throw new RpcException('Seat not found');
      return seat;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
