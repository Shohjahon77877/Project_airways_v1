import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAirportDto, UpdateAirportDto } from '@my-airways/shared-dto-v2';
import { AirportService } from '@my-airways/shared-services-v2';

@Controller()
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @MessagePattern({ cmd: 'create_airport' })
  create(@Payload() dto: CreateAirportDto) {
    return this.airportService.create(dto);
  }

  @MessagePattern({ cmd: 'get_airports' })
  getAll() {
    return this.airportService.getAll();
  }

  @MessagePattern({ cmd: 'get_airport_by_id' })
  getById(@Payload() id: number) {
    return this.airportService.getById(id);
  }

  @MessagePattern({ cmd: 'update_airport' })
  update(@Payload() payload: { id: number; data: UpdateAirportDto }) {
    return this.airportService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_airport' })
  remove(@Payload() id: number) {
    return this.airportService.remove(id);
  }
}
