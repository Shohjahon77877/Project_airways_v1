import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@my-airways/shared-dto-v2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'admin_login' })
  async adminLogin(
    @Payload() credentials: { email: string; password: string },
  ) {
    return this.appService.admin_login(credentials);
  }

  @MessagePattern({ cmd: 'user_login' })
  async userLogin(@Payload() credentials: { email: string; password: string }) {
    return this.appService.user_login(credentials);
  }

  @MessagePattern({ cmd: 'user_register' })
  async registerUser(@Payload() dto: CreateUserDto) {
    return this.appService.register_user(dto);
  }

  @MessagePattern({ cmd: 'refresh_token' })
  async refreshToken(@Payload() data: { userId: number }) {
    return this.appService.refreshToken(data.userId);
  }

  @MessagePattern({ cmd: 'validate_token' })
  async validateAccToken(@Payload() token: string) {
    return this.appService.validateAdminToken(token);
  }

  @MessagePattern({ cmd: 'logout' })
  async logout(@Payload() data: { userId: number }) {
    return this.appService.logout(data.userId);
  }
}
