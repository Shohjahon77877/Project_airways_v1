import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { PrismaService } from './prisma.service';

interface JwtPayload {
  type: string;
  sub: number;
  email?: string;
  role?: string | boolean;
}

@Injectable()
export class TokenService {
  private redisClient: Redis;
  private readonly jwtAccessSecret: string;
  private readonly jwtRefreshSecret: string;
  private readonly accessExpiryMinutes: number;
  private readonly refreshExpiryDays: number;

  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    const redisUrl =
      this.config.get<string>('REDIS_URL') ?? 'redis://localhost:6379';
    this.jwtAccessSecret = this.config.get<string>('JWT_ACCESS_TOKEN_SECRET') ?? 'supersecret';
    this.jwtRefreshSecret = this.config.get<string>('JWT_REFRESH_TOKEN_SECRET') ?? 'supersecretrefresh';
    this.accessExpiryMinutes = parseInt( this.config.get<string>('JWT_ACCESS_TOKEN_EXPIRY_MINUTES') ?? '30', 10, );
    this.refreshExpiryDays = parseInt(
      this.config.get<string>('JWT_REFRESH_TOKEN_EXPIRY_DAYS') ?? '7',
      10,
    );

    if (
      !redisUrl ||
      !this.jwtAccessSecret ||
      !this.jwtRefreshSecret ||
      !this.accessExpiryMinutes ||
      !this.refreshExpiryDays
    ) {
      throw new Error(
        'Missing required environment variables for TokenService.',
      );
    }

    this.redisClient = new Redis(redisUrl);
  }

  async generateTokens(
    userId: number,
    email?: string,
    role?: string | boolean,
  ) {
    try {
      const basePayload = { sub: userId, email, role };

      const accessToken = await this.jwtService.signAsync(
        { ...basePayload, type: 'access' },
        {
          secret: this.jwtAccessSecret,
          expiresIn: `${this.accessExpiryMinutes}m`,
        },
      );

      const refreshToken = await this.jwtService.signAsync(
        { ...basePayload, type: 'refresh' },
        {
          secret: this.jwtRefreshSecret,
          expiresIn: `${this.refreshExpiryDays}d`,
        },
      );

      await this.redisClient.set(
        `access_token:${userId}`,
        accessToken,
        'EX',
        this.accessExpiryMinutes * 60,
      );

      await this.redisClient.set(
        `refresh_token:${userId}`,
        refreshToken,
        'EX',
        this.refreshExpiryDays * 24 * 60 * 60,
      );

      return { accessToken, refreshToken };
    } catch (err: any) {
      throw new RpcException(err.message);
    }
  }

  async generateAccessFromRefresh(userId: number) {
    try {
      const refreshToken = await this.redisClient.get(
        `refresh_token:${userId}`,
      );
      if (!refreshToken) return null;

      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: this.jwtRefreshSecret,
        },
      );

      if (payload.type !== 'refresh') {
        throw new RpcException('Invalid token type');
      }

      let newPayload: JwtPayload;

      if (payload.role === 'admin' || payload.role === 'super_admin') {
        const admin = await this.prisma.admin.findUnique({
          where: { id: userId },
          select: { id: true, email: true, is_super_admin: true },
        });

        if (!admin) throw new RpcException('Admin not found');

        newPayload = {
          sub: admin.id,
          email: admin.email,
          role: admin.is_super_admin ? 'super_admin' : 'admin',
          type: 'access',
        };
      } else {
        const user = await this.prisma.users.findUnique({
          where: { id: userId },
          select: { id: true, email: true },
        });

        if (!user) throw new RpcException('User not found');

        newPayload = {
          sub: user.id,
          email: user.email,
          role: 'user',
          type: 'access',
        };
      }

      const newAccessToken = await this.jwtService.signAsync(newPayload, {
        secret: this.jwtAccessSecret,
        expiresIn: `${this.accessExpiryMinutes}m`,
      });

      await this.redisClient.set(
        `access_token:${userId}`,
        newAccessToken,
        'EX',
        this.accessExpiryMinutes * 60,
      );

      return newAccessToken;
    } catch (err: any) {
      throw new RpcException(err.message);
    }
  }

  async revokeTokens(userId: number) {
    try {
      await this.redisClient.del(`access_token:${userId}`);
      await this.redisClient.del(`refresh_token:${userId}`);
    } catch (err: any) {
      throw new RpcException(err.message);
    }
  }

  async validateAccessToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtAccessSecret,
      });

      if (decoded.type !== 'access') {
        return { valid: false, userId: null, role: null };
      }

      return { valid: true, userId: decoded.sub, role: decoded.role };
    } catch {
      return { valid: false, userId: null, role: null };
    }
  }

  async validateRefreshToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtRefreshSecret,
      });
    } catch {
      throw new RpcException('Invalid refresh token');
    }
  }
}
