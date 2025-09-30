import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto, UpdateNewsDto } from '@my-airways/shared-dto-v2';
import { PrismaService } from '@my-airways/shared-services-v2';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getNews() {
    try {
      return await this.prisma.news.findMany();
    } catch (error) {
      return new Error('Failed to get news');
    }
  }

  async getNewsById(id: number) {
    try {
      const news = await this.prisma.news.findUnique({ where: { id } });
      if (!news) {
        return new NotFoundException(`News by id ${id} not found`);
      }

      return news;
    } catch (error) {
      throw new Error('Failed to get news by id');
    }
  }

  async createNews(news: CreateNewsDto) {
    try {
      const { published_by_admin_id } = news;
      const existsAdmin = await this.prisma.admin.findUnique({
        where: { id: published_by_admin_id },
      });
      if (!existsAdmin) {
        throw new NotFoundException(
          404,
          `Admin by id ${published_by_admin_id} not found`,
        );
      }

      return await this.prisma.news.create({
        data: {
          ...news,
          published_at: new Date(),
        },
      });
    } catch (error) {
      throw new Error('Failed to create news');
    }
  }

  async updateNews(id: number, data: UpdateNewsDto) {
    try {
      if (Object.keys(data).length === 0) {
        throw new NotFoundException('No data provided to update.');
      }
      const news = await this.prisma.news.findUnique({ where: { id } });
      if (!news) {
        return new NotFoundException(`News by id ${id} not found`);
      }

      const { published_by_admin_id } = data;
      const existsAdmin = await this.prisma.admin.findUnique({
        where: { id: published_by_admin_id },
      });
      if (!existsAdmin) {
        return new NotFoundException(
          404,
          `Admin by id ${published_by_admin_id} not found`,
        );
      }

      return await this.prisma.news.update({
        where: { id },
        data,
      });
    } catch (error) {
      return new Error('Failed to update news');
    }
  }

  async deleteNews(id: number) {
    try {
      const deletedNews = await this.prisma.news.delete({ where: { id } });
      if (!deletedNews) {
        throw new NotFoundException(`News by id ${id} not found`);
      }
      return deletedNews;
    } catch (error) {
      throw new Error('Failed to delete news');
    }
  }
}
