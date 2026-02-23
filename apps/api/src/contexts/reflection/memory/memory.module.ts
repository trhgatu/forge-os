import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { MemorySchema } from './infrastructure/memory.schema';
import { MongoMemoryRepository } from './infrastructure/repositories/mongo-memory.repository';
import { MemoryAdminController } from './presentation/controllers/memory.admin.controller';
import { MemoryPublicController } from './presentation/controllers/memory.public.controller';
import { SharedModule } from '@shared/shared.module';
import { MemoryHandlers } from './application/handlers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Memory', schema: MemorySchema }]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [MemoryAdminController, MemoryPublicController],
  providers: [
    {
      provide: 'MemoryRepository',
      useClass: MongoMemoryRepository,
    },
    MongoMemoryRepository,
    ...MemoryHandlers,
  ],
  exports: [],
})
export class MemoryModule {}
