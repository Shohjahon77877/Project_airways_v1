import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateClassDto, UpdateClassDto } from '@my-airways/shared-dto-v2';
import { ClassesService } from '@my-airways/shared-services-v2';

@Controller()
export class ClassController {
  constructor(private readonly classService: ClassesService) {}

  @MessagePattern({ cmd: 'create_class' })
  create(@Payload() dto: CreateClassDto) {
    return this.classService.create(dto);
  }

  @MessagePattern({ cmd: 'get_classes' })
  getAll() {
    return this.classService.getAll();
  }

  @MessagePattern({ cmd: 'get_class_by_id' })
  getById(@Payload() id: number) {
    return this.classService.getById(id);
  }

  @MessagePattern({ cmd: 'update_class' })
  update(@Payload() payload: { id: number; data: UpdateClassDto }) {
    return this.classService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_class' })
  remove(@Payload() id: number) {
    return this.classService.remove(id);
  }
}
