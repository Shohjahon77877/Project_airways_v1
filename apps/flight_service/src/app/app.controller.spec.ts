import { Test, TestingModule } from '@nestjs/testing';
import { FlightController } from './app.controller';
import { FlightService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [FlightController],
      providers: [FlightService],
    }).compile();
  });
});
