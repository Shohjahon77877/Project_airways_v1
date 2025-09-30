import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateNewsDto, UpdateNewsDto } from '@my-airways/shared-dto-v2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_news' })
  createNews(@Payload() news: CreateNewsDto) {
    return this.appService.createNews(news);
  }

  @MessagePattern({ cmd: 'get_news' })
  getNews() {
    return this.appService.getNews();
  }

  @MessagePattern({ cmd: 'get_news_by_id' })
  getNewsById(@Payload() id: number) {
    return this.appService.getNewsById(id);
  }

  @MessagePattern({ cmd: 'update_news' })
  updateNews(@Payload() payload: { id: number; news: UpdateNewsDto }) {
    return this.appService.updateNews(payload.id, payload.news);
  }

  @MessagePattern({ cmd: 'delete_news' })
  deleteNews(@Payload() id: number) {
    return this.appService.deleteNews(id);
  }
}
