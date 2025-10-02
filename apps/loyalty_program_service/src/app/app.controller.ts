import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateLoyaltyProgramDto,
  CreateTicketDto,
  UpdateLoyaltyProgramDto,
  UpdateTicketDto,
} from '@my-airways/shared-dto-v2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_loyalty_member' })
  createLoyaltyMember(@Payload() loyaltyMember: CreateLoyaltyProgramDto) {
    return this.appService.createLoyaltyMember(loyaltyMember);
  }

  @MessagePattern({ cmd: 'get_loyalty_members' })
  getLoyaltyMember() {
    return this.appService.getLoyaltyMembers();
  }

  @MessagePattern({ cmd: 'get_loyalty_member_by_id' })
  getLoyaltyMemberById(@Payload() id: number) {
    return this.appService.getLoyaltyMemberById(id);
  }

  @MessagePattern({ cmd: 'update_loyalty_points' })
  updateLoyaltyMember(
    @Payload() payload: { id: number; loyaltyMember: UpdateLoyaltyProgramDto },
  ) {
    return this.appService.updateLoyaltyMember(
      payload.id,
      payload.loyaltyMember,
    );
  }

  @MessagePattern({ cmd: 'delete_loyalty_member' })
  deleteLoyaltyMember(@Payload() id: number) {
    return this.appService.deleteLoyaltyMember(id);
  }
}
