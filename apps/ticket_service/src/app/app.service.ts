import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@my-airways/shared-services-v2';
import { CreateTicketDto, UpdateTicketDto } from '@my-airways/shared-dto-v2';
import { Loyalt_Program_Rank } from '../../../../generated/prisma';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ticket: CreateTicketDto) {
    let { user_id, flight_id, seat_id, price } = ticket;
    const [user, flight, seat] = await this.prisma.$transaction([
      this.prisma.users.findUnique({ where: { id: user_id } }),
      this.prisma.flights.findUnique({ where: { id: flight_id } }),
      this.prisma.seats.findUnique({ where: { id: seat_id } }),
    ]);

    if (!user) throw new NotFoundException(`User ID ${user_id} not found.`);
    if (!flight) throw new NotFoundException(`Flight ID ${flight_id} not found.`);
    if (!seat) throw new NotFoundException(`Seat ID ${seat_id} not found.`);

    // Checking a aviability in plane
    const availableSeats = await this.prisma.seats.count({
      where: {
        plane_id: seat.plane_id,
        is_available: true,
      },
    });
    if (!availableSeats) {
      throw new BadRequestException('There are no more available seats');
    }

    // Deciding final price
    const baseClass = await this.prisma.classes.findUnique({
      where: { id: seat.class_id },
    });

    let finalPrice: number = Number(price);
    if (!baseClass) {
      throw new NotFoundException('Class not found');
    } else {
      finalPrice += Number(baseClass.base_price);
    }

    if (seat.extra_fee) {
      finalPrice += Number(seat.extra_fee);
    }
    const data = {
      ...ticket,
      price: finalPrice,
    };

    const newTicket = await this.prisma.ticket.create({ data });
    await this.prisma.seats.update({
      where: { id: seat_id },
      data: { is_available: false },
    });

    const pointsEarned = Math.floor(Number(finalPrice));
    let loyalty = await this.prisma.loyaltyProgram.findUnique({
      where: { user_id: user_id },
    });

    if (!loyalty) {
      loyalty = await this.prisma.loyaltyProgram.create({
        data: {
          user_id,
          points: pointsEarned,
          level: this.getRank(pointsEarned),
        },
      });
    } else {
      const updatedPoints = loyalty.points + pointsEarned;
      loyalty = await this.prisma.loyaltyProgram.update({
        where: { id: loyalty.id },
        data: {
          points: updatedPoints,
          level: this.getRank(updatedPoints),
        },
      });
    }

    return {
      ticket: newTicket,
      loyalty,
    };
  }

  async findAll() {
    return this.prisma.ticket.findMany();
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({ where: { id } });
    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found.`);
    return ticket;
  }

  async update(id: number, ticket: UpdateTicketDto) {
    try {
      return await this.prisma.ticket.update({
        where: { id },
        data: ticket,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.ticket.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  private getRank(points: number): Loyalt_Program_Rank {
    if (points >= 5000) return Loyalt_Program_Rank.PLATINUM;
    if (points >= 2000) return Loyalt_Program_Rank.GOLD;
    if (points >= 1000) return Loyalt_Program_Rank.SILVER;
    return Loyalt_Program_Rank.BRONZE;
  }
}
