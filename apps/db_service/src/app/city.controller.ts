import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCityDto, UpdateCityDto } from '@my-airways/shared-dto-v2';
import { CityService } from '@my-airways/shared-services-v2';

@Controller()
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @MessagePattern({ cmd: 'create_city' })
  create(@Payload() dto: CreateCityDto) {
    return this.cityService.create(dto);
  }

  @MessagePattern({ cmd: 'get_cities' })
  getAll() {
    return this.cityService.getAll();
  }

  @MessagePattern({ cmd: 'get_city_by_id' })
  getById(@Payload() id: number) {
    return this.cityService.getById(id);
  }

  @MessagePattern({ cmd: 'update_city' })
  update(@Payload() payload: { id: number; data: UpdateCityDto }) {
    return this.cityService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_city' })
  remove(@Payload() id: number) {
    return this.cityService.remove(id);
  }
}
