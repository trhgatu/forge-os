import { Module } from '@nestjs/common';
import { AuthModule } from 'src/contexts/iam/auth/auth.module';
import { PresenceGateway } from './presence.gateway';

@Module({
  imports: [AuthModule],
  providers: [PresenceGateway],
  exports: [PresenceGateway],
})
export class PresenceModule {}
