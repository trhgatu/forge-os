import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { RegisterDto, LoginDto } from '../../application/dtos';
import {
  JwtAuthGuard,
  RefreshTokenGuard,
} from 'src/contexts/iam/auth/application/guards';
import { GetUser } from '../../application/decorators/get-user.decorator';
import { Request } from 'express';
import { extractBearerToken } from '@shared/utils/extract-bearer-token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@GetUser('_id') userId: string, @Req() req: Request) {
    const refreshToken = extractBearerToken(req);
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser() user: any) {
    return {
      status: 'success',
      message: 'Get current user successfully',
      data: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
