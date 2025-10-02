import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE_RABBITMQ } from '../shared-services-v2.module';
import { Roles } from '../../../../../generated/prisma';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_RABBITMQ)
    private readonly authRMQClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    const token = authHeader.split(' ')[1];
    const result = await firstValueFrom(
      this.authRMQClient.send({ cmd: 'validate_token' }, token),
    );

    if (!result.valid || !result.role) {
      throw new UnauthorizedException('Unauthorized user or invalid token');
    }

    req.user = { userId: result.userId, role: result.role };
    if (result.role !== Roles.SUPER_ADMIN) {
      throw new ForbiddenException('Only SUPER_ADMIN can perform this action');
    }

    return true;
  }
}
