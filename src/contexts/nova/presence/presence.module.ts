import { Module } from '@nestjs/common';
import { PresenceGateway } from './presence.gateway';

@Module({
  providers: [PresenceGateway],
  exports: [PresenceGateway],
})
export class PresenceModule {}
