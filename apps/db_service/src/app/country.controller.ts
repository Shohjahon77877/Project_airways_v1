import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCountryDto, UpdateCountryDto } from '@my-airways/shared-dto-v2';
import { CountryService } from '@my-airways/shared-services-v2';

@Controller()
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @MessagePattern({ cmd: 'create_country' })
  create(@Payload() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @MessagePattern({ cmd: 'get_country_by_id' })
  getById(@Payload() id: number) {
    return this.countryService.getById(id);
  }

  @MessagePattern({ cmd: 'get_countries' })
  getAll() {
    return this.countryService.getAll();
  }

  @MessagePattern({ cmd: 'update_country' })
  update(@Payload() payload: { id: number; data: UpdateCountryDto }) {
    return this.countryService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_country' })
  remove(@Payload() id: number) {
    return this.countryService.remove(id);
  }
}
