import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from 'src/contexts/iam/auth/auth.module';
import { UserModule } from 'src/contexts/iam/users/users.module';
import { PresenceGateway } from './presence.gateway';

@Module({
  imports: [AuthModule, UserModule, CqrsModule],
  providers: [PresenceGateway],
  exports: [PresenceGateway],
})
export class PresenceModule {}
