import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateAdminDto, UpdateAdminDto } from '@my-airways/shared-dto-v2';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AppService) {}

  @MessagePattern({ cmd: 'create_admin' })
  createAdmin(@Payload() dto: CreateAdminDto) {
    return this.adminService.createAdmin(dto);
  }

  @MessagePattern({ cmd: 'get_admins' })
  getAdmins() {
    return this.adminService.findAdmins();
  }

  @MessagePattern({ cmd: 'get_admin_by_id' })
  getAdminById(@Payload() id: number) {
    return this.adminService.findAdminById(id);
  }

  @MessagePattern({ cmd: 'update_admin' })
  updateAdmin(@Payload() payload: { id: number; admin: UpdateAdminDto }) {
    const { id, admin } = payload;
    return this.adminService.updateAdmin(id, admin);
  }

  @MessagePattern({ cmd: 'delete_admin' })
  deleteAdmin(@Payload() id: number) {
    return this.adminService.removeAdmin(id);
  }
}
