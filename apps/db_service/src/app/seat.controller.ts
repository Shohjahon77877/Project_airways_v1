import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSeatDto, UpdateSeatDto } from '@my-airways/shared-dto-v2';
import { SeatsService } from '@my-airways/shared-services-v2';

@Controller()
export class SeatController {
  constructor(private readonly seatService: SeatsService) {}

  @MessagePattern({ cmd: 'create_seat' })
  create(@Payload() dto: CreateSeatDto) {
    return this.seatService.create(dto);
  }

  @MessagePattern({ cmd: 'get_seats' })
  getAll() {
    return this.seatService.getAll();
  }

  @MessagePattern({ cmd: 'get_seat_by_id' })
  getById(@Payload() id: number) {
    return this.seatService.getById(id);
  }

  @MessagePattern({ cmd: 'update_seat' })
  update(@Payload() payload: { id: number; data: UpdateSeatDto }) {
    return this.seatService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_seat' })
  remove(@Payload() id: number) {
    return this.seatService.remove(id);
  }
}
