import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaMoodRepository } from './infrastructure/repositories/prisma-mood.repository';
import { MoodMapper } from './infrastructure/repositories/mood.mapper';
import { MoodRepository } from './domain/mood.repository';
import { MoodAdminController } from './presentation/controllers/mood.admin.controller';
import { MoodPublicController } from './presentation/controllers/mood.public.controller';
import { MoodCommandHandlers } from './application/commands';
import { MoodQueryHandlers } from './application/queries';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../../iam/auth/auth.module';

const CommandHandlers = MoodCommandHandlers;
const QueryHandlers = MoodQueryHandlers;

@Module({
  imports: [CqrsModule, SharedModule, AuthModule],
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
