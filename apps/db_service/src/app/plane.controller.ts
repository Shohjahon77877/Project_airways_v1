import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePlaneDto, UpdatePlaneDto } from '@my-airways/shared-dto-v2';
import { PlaneService } from '@my-airways/shared-services-v2';

@Controller()
export class PlaneController {
  constructor(private readonly planeService: PlaneService) {}

  @MessagePattern({ cmd: 'create_plane' })
  create(@Payload() dto: CreatePlaneDto) {
    return this.planeService.create(dto);
  }

  @MessagePattern({ cmd: 'get_planes' })
  getAll() {
    return this.planeService.getAll();
  }

  @MessagePattern({ cmd: 'get_plane_by_id' })
  getById(@Payload() id: number) {
    return this.planeService.getById(id);
  }

  @MessagePattern({ cmd: 'update_plane' })
  update(@Payload() payload: { id: number; data: UpdatePlaneDto }) {
    return this.planeService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_plane' })
  remove(@Payload() id: number) {
    return this.planeService.remove(id);
  }
}
