import { Module } from '@nestjs/common';
import { FlightController } from './app.controller';
import { FlightService } from './app.service';
import { SharedServicesModule } from '@my-airways/shared-services-v2';

@Module({
  imports: [SharedServicesModule],
  controllers: [FlightController],
  providers: [FlightService],
})
export class AppModule {}
