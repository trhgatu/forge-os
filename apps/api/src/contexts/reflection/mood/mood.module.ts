import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaMoodRepository } from './infrastructure/repositories/prisma-mood.repository';
import { MoodMapper } from './infrastructure/repositories/mood.mapper';
import { MoodRepository } from './application/ports/mood.repository';
import { MoodAdminController } from './presentation/controllers/mood.admin.controller';
import { MoodPublicController } from './presentation/controllers/mood.public.controller';
import {
  CreateMoodHandler,
  UpdateMoodHandler,
  DeleteMoodHandler,
  GetAllMoodsHandler,
  GetMoodByIdHandler,
} from './application/handlers';
import { SharedModule } from '@shared/shared.module';

const CommandHandlers = [CreateMoodHandler, UpdateMoodHandler, DeleteMoodHandler];
const QueryHandlers = [GetAllMoodsHandler, GetMoodByIdHandler];

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [MoodAdminController, MoodPublicController],
  providers: [
    {
      provide: MoodRepository,
      useClass: PrismaMoodRepository,
    },
    {
      provide: 'MoodRepository',
      useClass: PrismaMoodRepository,
    },
    MoodMapper,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [MoodRepository],
})
export class MoodModule {}
