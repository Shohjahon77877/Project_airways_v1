import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateReviewDto, UpdateReviewDto } from '@my-airways/shared-dto-v2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_review' })
  createReview(@Payload() data: CreateReviewDto) {
    return this.appService.createReview(data);
  }

  @MessagePattern({ cmd: 'get_reviews' })
  getReviews() {
    return this.appService.findAllReviews();
  }

  @MessagePattern({ cmd: 'get_review_by_id' })
  getReviewById(@Payload() id: number) {
    return this.appService.findReviewById(id);
  }

  @MessagePattern({ cmd: 'update_review' })
  updateReview(@Payload() payload: { id: number; data: UpdateReviewDto }) {
    const { id, data } = payload;
    return this.appService.updateReview(id, data);
  }

  @MessagePattern({ cmd: 'delete_review' })
  deleteReview(@Payload() id: number) {
    return this.appService.deleteReview(id);
  }
}
