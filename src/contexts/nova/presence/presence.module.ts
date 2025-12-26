import { Module } from '@nestjs/common';
import { PresenceGateway } from './presence.gateway';
import { AuthModule } from 'src/contexts/iam/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [PresenceGateway],
  exports: [PresenceGateway],
})
export class PresenceModule {}
