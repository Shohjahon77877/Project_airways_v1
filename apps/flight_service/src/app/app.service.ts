import { PrismaService } from '@my-airways/shared-services-v2';
import { CreateFlightDto, UpdateFlightDto } from '@my-airways/shared-dto-v2';
import { Injectable } from '@nestjs/common';
import { errorResponse } from '@my-airways/shared-utils';

@Injectable()
export class FlightService {
  constructor(private readonly prisma: PrismaService) {}

  async createFlight(data: CreateFlightDto) {
    const [plane, departureAirport, arrivalAirport] = await Promise.all([
      this.prisma.planes.findUnique({ where: { id: data.plane_id } }),
      this.prisma.airports.findUnique({
        where: { id: data.departure_airport_id },
      }),
      this.prisma.airports.findUnique({
        where: { id: data.arrival_airport_id },
      }),
    ]);

    if (!plane) return errorResponse(404, 'Plane not found');
    if (!departureAirport)
      return errorResponse(404, 'Departure airport not found');
    if (!arrivalAirport) return errorResponse(404, 'Arrival airport not found');

    const prismaData = {
      flight_number: data.flight_number,
      price: data.price,
      plane_id: data.plane_id,
      departure_airport_id: data.departure_airport_id,
      arrival_airport_id: data.arrival_airport_id,
      departure_time: data.departure_time,
      arrival_time: data.arrival_time,
      status: data.status,
    };
    return await this.prisma.flights.create({ data: prismaData });
  }

  async findFlights() {
    return await this.prisma.flights.findMany({
      include: {
        Plane: true,
        arrival: true,
        departure: true,
      },
    });
  }

  async findFlightById(id: number) {
    const flight = await this.prisma.flights.findUnique({
      where: { id },
      include: {
        Plane: true,
        arrival: true,
        departure: true,
      },
    });

    if (!flight) {
      return errorResponse(404, 'Flight not found');
    }

    return flight;
  }

  async updateFlight(id: number, data: UpdateFlightDto) {
    const existing = await this.prisma.flights.findUnique({ where: { id } });
    if (!existing) return errorResponse(404, 'Flight not found');

    const [plane, departureAirport, arrivalAirport] = await Promise.all([
      data.plane_id
        ? this.prisma.planes.findUnique({ where: { id: data.plane_id } })
        : null,
      data.departure_airport_id
        ? this.prisma.airports.findUnique({
            where: { id: data.departure_airport_id },
          })
        : null,
      data.arrival_airport_id
        ? this.prisma.airports.findUnique({
            where: { id: data.arrival_airport_id },
          })
        : null,
    ]);

    if (!plane) return errorResponse(404, 'Plane not found');
    if (!departureAirport)
      return errorResponse(404, 'Departure airport not found');
    if (!arrivalAirport) return errorResponse(404, 'Arrival airport not found');

    return await this.prisma.flights.update({
      where: { id },
      data,
    });
  }

  async deleteFlight(id: number) {
    const flight = await this.prisma.flights.findUnique({ where: { id } });
    if (!flight) return errorResponse(404, 'Flight not found');

    return await this.prisma.flights.delete({ where: { id } });
  }
}
