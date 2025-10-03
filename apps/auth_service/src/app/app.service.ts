import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PasswordUtil } from '@my-airways/shared-utils';
import { PrismaService } from '@my-airways/shared-services-v2';
import { TokenService } from '@my-airways/shared-services-v2';
import { CreateUserDto } from '@my-airways/shared-dto-v2';
import { UpdateUserDto } from '@my-airways/shared-dto-v2';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async validateAdminToken(token: string) {
    return this.tokenService.validateAccessToken(token);
  }

  async refreshToken(userId: number) {
    return this.tokenService.generateAccessFromRefresh(userId);
  }

  async logout(userId: number) {
    return this.tokenService.revokeTokens(userId);
  }

  async admin_login(credential: { email: string; password: string }) {
    const { email, password } = credential;

    const userlogin = await this.prisma.admin.findUnique({
      where: { email },
    });
    console.log(userlogin);

    if (!userlogin) {
      throw new NotFoundException(`Email or password is incorrect`);
    }

    console.log('INPUT:', credential.password);
    const passwordMatch = await PasswordUtil.comparePassword(
      password,
      userlogin.password,
    );
    if (!passwordMatch) {
      throw new NotFoundException(`Email or password is incorrect`);
    }

    const { id, role } = userlogin;
    const tokens = await this.tokenService.generateTokens(id, email, role);
    console.log(tokens)
    const { password: _, ...result } = userlogin;
    return { user: result, tokens };
  }

  async user_login(credential: { email: string; password: string }) {
    const { email, password } = credential;
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`Email or password is incorrect`);
    }

    const passwordMatch = await PasswordUtil.comparePassword(
      password,
      user.password_hash,
    );
    if (!passwordMatch) {
      throw new NotFoundException(`Email or password is incorrect`);
    }

    const { id } = user;
    const tokens = await this.tokenService.generateTokens(id, email);
    const { password_hash, ...result } = user;
    return { user: result, tokens };
  }

  async register_user(dto: CreateUserDto) {
    const existing = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await PasswordUtil.hashPassword(dto.password);
    const newUser = await this.prisma.users.create({
      data: {
        ...dto,
        password_hash: hashedPassword,
      },
    });

    const { id, email } = newUser;
    const tokens = await this.tokenService.generateTokens(id, email);
    const { password_hash, ...result } = newUser;
    return { user: result, tokens };
  }
}
