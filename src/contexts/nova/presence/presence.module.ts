import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from 'src/contexts/iam/auth/auth.module';
import { PresenceGateway } from './presence.gateway';

@Module({
  imports: [AuthModule, CqrsModule],
  providers: [PresenceGateway],
  exports: [PresenceGateway],
})
export class PresenceModule {}
