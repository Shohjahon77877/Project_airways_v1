import { Injectable } from '@nestjs/common';
import { PrismaService } from '@my-airways/shared-services-v2';
import { errorResponse } from '@my-airways/shared-utils';
import { CreateReviewDto, UpdateReviewDto } from '@my-airways/shared-dto-v2';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(data: CreateReviewDto) {
    try {
      const [user, flight] = await Promise.all([
        this.prisma.users.findUnique({ where: { id: data.user_id } }),
        this.prisma.flights.findUnique({ where: { id: data.flight_id } }),
      ]);

      if (!user) return errorResponse(404, 'User not found');
      if (!flight) return errorResponse(404, 'Flight not found');

      return await this.prisma.reviews.create({
        data: {
          user_id: data.user_id,
          flight_id: data.flight_id,
          rating: data.rating,
          comment: data.comment,
        },
      });
    } catch (error) {
      throw errorResponse(500, error);
    }
  }

  async findAllReviews() {
    try {
      return await this.prisma.reviews.findMany({
        include: {
          user: true,
          flight: true,
        },
      });
    } catch (error) {
      throw errorResponse(500, error);
    }
  }

  async findReviewById(id: number) {
    try {
      const review = await this.prisma.reviews.findUnique({
        where: { id },
        include: {
          user: true,
          flight: true,
        },
      });

      if (!review) {
        return errorResponse(404, 'Review not found');
      }

      return review;
    } catch (error) {
      throw errorResponse(500, error);
    }
  }

  async updateReview(id: number, data: UpdateReviewDto) {
    try {
      const existing = await this.prisma.reviews.findUnique({ where: { id } });
      if (!existing) return errorResponse(404, 'Review not found');

      if (data.user_id) {
        const user = await this.prisma.users.findUnique({
          where: { id: data.user_id },
        });
        if (!user) return errorResponse(404, 'User not found');
      }

      if (data.flight_id) {
        const flight = await this.prisma.flights.findUnique({
          where: { id: data.flight_id },
        });
        if (!flight) return errorResponse(404, 'Flight not found');
      }

      return await this.prisma.reviews.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw errorResponse(500, error);
    }
  }

  async deleteReview(id: number) {
    try {
      const review = await this.prisma.reviews.findUnique({ where: { id } });
      if (!review) return errorResponse(404, 'Review not found');
      return await this.prisma.reviews.delete({ where: { id } });
    } catch (error) {
      throw errorResponse(500, error);
    }
  }
}
