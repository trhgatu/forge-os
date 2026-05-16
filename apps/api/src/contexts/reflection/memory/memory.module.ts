import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaMemoryRepository } from './infrastructure/repositories/prisma-memory.repository';
import { MemoryMapper } from './infrastructure/repositories/memory.mapper';
import { MemoryRepository } from './application/ports/memory.repository';
import { MemoryAdminController } from './presentation/controllers/memory.admin.controller';
import { MemoryPublicController } from './presentation/controllers/memory.public.controller';
import {
  CreateMemoryHandler,
  UpdateMemoryHandler,
  DeleteMemoryHandler,
  GetAllMemoriesHandler,
  GetAllMemoriesForPublicHandler,
  GetMemoryByIdHandler,
  SoftDeleteMemoryHandler,
  RestoreMemoryHandler,
} from './application/handlers';
import { SharedModule } from '@shared/shared.module';

const CommandHandlers = [
  CreateMemoryHandler,
  UpdateMemoryHandler,
  DeleteMemoryHandler,
  SoftDeleteMemoryHandler,
  RestoreMemoryHandler,
];

const QueryHandlers = [GetAllMemoriesHandler, GetAllMemoriesForPublicHandler, GetMemoryByIdHandler];

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
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [MemoryRepository],
})
export class MemoryModule {}
