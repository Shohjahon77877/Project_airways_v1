import { Module } from '@nestjs/common';
import { UserController } from './app.controller';
import { UserService } from './app.service';
import { SharedServicesModule } from '@my-airways/shared-services-v2';

@Module({
  imports: [SharedServicesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
