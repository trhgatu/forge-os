import { Module, Global } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SystemConfigController } from './presentation/controllers/system-config.controller';
import { ConfigService } from './application/services/config.service';
import { PrismaSystemConfigRepository } from './infrastructure/repositories/prisma-system-config.repository';
import { UpdateSystemConfigHandler } from './application/commands/update-config/update-config.handler';

const CommandHandlers = [UpdateSystemConfigHandler];

@Global()
@Module({
  imports: [CqrsModule],
  controllers: [SystemConfigController],
  providers: [
    {
      provide: 'SystemConfigRepository',
      useClass: PrismaSystemConfigRepository,
    },
    ConfigService,
    ...CommandHandlers,
  ],
  exports: [ConfigService],
})
export class SystemConfigModule {}
