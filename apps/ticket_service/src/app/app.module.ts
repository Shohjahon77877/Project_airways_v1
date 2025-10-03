import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedServicesModule } from '@my-airways/shared-services-v2';

@Module({
  imports: [SharedServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
