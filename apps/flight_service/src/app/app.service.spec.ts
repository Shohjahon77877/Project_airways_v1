import { Test } from '@nestjs/testing';
import { FlightService } from './app.service';

describe('FlightService', () => {
  let service: FlightService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [FlightService],
    }).compile();

    service = app.get<FlightService>(FlightService);
  });
});
