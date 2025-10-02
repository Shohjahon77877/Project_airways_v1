import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateTicketDto, UpdateTicketDto } from '@my-airways/shared-dto-v2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'get_tickets' })
  getTickets() {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'get_ticket_by_id' })
  getTicketById(id: number) {
    return this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_ticket' })
  createTicket(ticket: CreateTicketDto) {
    return this.appService.create(ticket);
  }

  @MessagePattern({ cmd: 'update_ticket' })
  updateTicket(payload: { id: number; ticket: UpdateTicketDto }) {
    return this.appService.update(payload.id, payload.ticket);
  }

  @MessagePattern({ cmd: 'delete_ticket' })
  deleteTicket(id: number) {
    return this.appService.remove(id);
  }
}
