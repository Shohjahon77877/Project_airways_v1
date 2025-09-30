import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE_RABBITMQ } from '../shared-services-v2.module';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_RABBITMQ)
    private readonly authRMQClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers['authorization'];
      console.log(req.headers['authorization'])

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    const token = authHeader.split(' ')[1];
    const result = await firstValueFrom(
      this.authRMQClient.send({ cmd: 'validate_token' }, token),
    );
      console.log(result.valid, result.role, result);
    if (result.valid === false || result.role === false) {
      throw new UnauthorizedException('Unauthorized user or invalid token');
    }
    req.user = { userId: result.userId, role: result.role };
    return true;
  }
}
