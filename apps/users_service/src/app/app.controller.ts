import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './app.service';
import { CreateUserDto, UpdateUserDto } from '@my-airways/shared-dto-v2';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  createUser(@Payload() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.userService.findUsers();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  getUserById(@Payload() id: number) {
    return this.userService.findUserById(id);
  }

  @MessagePattern({ cmd: 'update_user' })
  updateUser(@Payload() payload: { id: number; user: UpdateUserDto }) {
    const { id, user } = payload;
    return this.userService.updateUser(id, user);
  }

  @MessagePattern({ cmd: 'delete_user' })
  deleteUser(@Payload() id: number) {
    return this.userService.removeUser(id);
  }
}
