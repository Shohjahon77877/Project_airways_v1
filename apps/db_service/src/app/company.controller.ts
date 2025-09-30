import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCompanyDto, UpdateCompanyDto } from '@my-airways/shared-dto-v2';
import { CompanyService } from '@my-airways/shared-services-v2';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @MessagePattern({ cmd: 'create_company' })
  create(@Payload() dto: CreateCompanyDto) {
    return this.companyService.create(dto);
  }

  @MessagePattern({ cmd: 'get_company_by_id' })
  getById(@Payload() id: number) {
    return this.companyService.getById(id);
  }

  @MessagePattern({ cmd: 'get_companies' })
  getAll() {
    return this.companyService.getAll();
  }

  @MessagePattern({ cmd: 'update_company' })
  update(@Payload() payload: { id: number; data: UpdateCompanyDto }) {
    return this.companyService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_company' })
  remove(@Payload() id: number) {
    return this.companyService.remove(id);
  }
}
