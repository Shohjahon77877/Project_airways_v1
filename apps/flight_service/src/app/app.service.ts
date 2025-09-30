import { PrismaService } from '@my-airways/shared-services-v2';
import { CreateFlightDto } from '@my-airways/shared-dto-v2';
import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../../generated/prisma';

@Injectable()
export class FlightService {
  constructor(private readonly prisma: PrismaService) {}

  async createFlight(data: CreateFlightDto) {
    try {
      return await this.prisma.flights.create({
        data: data as unknown as Prisma.FlightsUncheckedCreateInput,
      });
    } catch (error) {
      throw error;
    }
  }

  async getFlights() {
    return this.prisma.flights.findMany();
  }

  async getFlightById(id: number) {
    return this.prisma.flights.findUnique({
      where: { id },
    });
  }

  async updateFlight(id: number, data: Partial<CreateFlightDto>) {
    return this.prisma.flights.update({
      where: { id },
      data: data as unknown as Prisma.FlightsUncheckedCreateInput,
    });
  }

  async deleteFlight(id: number) {
    return this.prisma.flights.delete({
      where: { id },
    });
  }
}
