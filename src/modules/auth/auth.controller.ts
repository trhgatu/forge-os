import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dtos';
import { JwtAuthGuard, RefreshTokenGuard } from '@modules/auth/guards';
import { GetUser } from './decorators/get-user.decorator';
import { UserDocument } from '@modules/user/user.schema';
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
  async getMe(@GetUser() user: UserDocument) {
    await user.populate('roleId');

    return {
      status: 'success',
      message: 'Get current user successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.roleId,
      },
    };
  }
}
