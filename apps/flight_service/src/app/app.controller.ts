import { Controller, Get } from '@nestjs/common';
import { FlightService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFlightDto, UpdateFlightDto } from '@my-airways/shared-dto-v2';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern({ cmd: 'create_flight' })
  createFlight(@Payload() data: CreateFlightDto) {
    return this.flightService.createFlight(data);
  }

  @MessagePattern({ cmd: 'get_flights' })
  getFLights() {
    return this.flightService.getFlights();
  }

  @MessagePattern({ cmd: 'get_flight_by_id' })
  getAdminById(@Payload() id: number) {
    return this.flightService.getFlightById(id);
  }

  @MessagePattern({ cmd: 'update_flight' })
  updateAdmin(@Payload() payload: { id: number; flight: UpdateFlightDto }) {
    const { id, flight } = payload;
    return this.flightService.updateFlight(id, flight);
  }

  @MessagePattern({ cmd: 'delete_flight' })
  deleteFlight(@Payload() id: number) {
    return this.flightService.deleteFlight(id);
  }
}
