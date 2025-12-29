import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from '../dtos';
import { UserRepository } from 'src/contexts/iam/users/application/ports/user.repository';
import { RoleRepository } from 'src/contexts/iam/roles/application/ports/role.repository';
import {
  InvalidCredentialsException,
  EmailAlreadyInUseException,
  RoleNotFoundException,
} from '../../domain/exceptions/iam.exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new EmailAlreadyInUseException({ email: dto.email });
    }

    const role = await this.roleRepository.findById(dto.roleId);
    if (!role) {
      throw new RoleNotFoundException({ roleId: dto.roleId });
    }

    // Create User via Repository (which returns Entity)
    const newUser = await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      roleId: dto.roleId,
    });

    // Use Entity properties directly
    const userId = newUser.id.toString();
    const tokens = await this.getTokens(userId, newUser.email);
    await this.updateRefreshToken(userId, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: newUser.id.toString(), // Entity ID
        name: newUser.name,
        email: newUser.email,
        role: newUser.roleId,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new InvalidCredentialsException({ email: dto.email });
    }

    if (!user.password) {
      throw new InvalidCredentialsException({
        email: dto.email,
        reason: 'No password set',
      });
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new InvalidCredentialsException({ email: dto.email });
    }

    const userId = user.id.toString();
    const tokens = await this.getTokens(userId, user.email);
    await this.updateRefreshToken(userId, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async getTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRT = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.updateRefreshToken(userId, hashedRT);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) throw new ForbiddenException('Invalid Refresh Token');

    const newTokens = await this.getTokens(user.id.toString(), user.email);
    await this.updateRefreshToken(userId, newTokens.refreshToken);

    return newTokens;
  }
  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new ForbiddenException('Invalid token');
    }
  }
}
