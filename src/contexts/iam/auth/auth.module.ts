import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy, JwtStrategy } from './application/strategies';
import { UserModule } from '../users/users.module';
import { RoleModule } from '../roles/roles.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
