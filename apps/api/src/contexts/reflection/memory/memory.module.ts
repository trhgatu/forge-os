import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaMemoryRepository } from './infrastructure/repositories/prisma-memory.repository';
import { MemoryMapper } from './infrastructure/repositories/memory.mapper';
import { MemoryRepository } from './domain/memory.repository';
import { MemoryAdminController } from './presentation/controllers/memory.admin.controller';
import { MemoryPublicController } from './presentation/controllers/memory.public.controller';
import { MemoryCommandHandlers } from './application/commands';
import { MemoryQueryHandlers } from './application/queries';
import { MemoryEventHandlers } from './application/events';
import { SharedModule } from '@shared/shared.module';
import { MemoryPresenter } from './presentation/presenters/memory.presenter';

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [MemoryAdminController, MemoryPublicController],
  providers: [
    {
      provide: MemoryRepository,
      useClass: PrismaMemoryRepository,
    },
    {
      provide: 'MemoryRepository',
      useClass: PrismaMemoryRepository,
    },
    MemoryMapper,
    MemoryPresenter,
    ...MemoryCommandHandlers,
    ...MemoryQueryHandlers,
    ...MemoryEventHandlers,
  ],
  exports: [MemoryRepository, 'MemoryRepository'],
})
export class MemoryModule {}
