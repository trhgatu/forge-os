import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DiscoveryModule } from '@nestjs/core';
import { GamificationController } from './presentation/gamification.controller';
import { GamificationGateway } from './presentation/gamification.gateway';
import { PrismaUserStatsRepository } from './infrastructure/prisma-user-stats.repository';
import { UserStatsRepository } from './domain/ports/user-stats.repository';
import { GetUserStatsHandler } from './application/queries/get-user-stats.query';
import { AwardXpHandler } from './application/handlers/award-xp.handler';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../iam/auth/auth.module';

import { XpAwardingProcessor } from './application/processors/xp-awarding.processor';
import { XpRateLimitService } from './application/services/xp-rate-limit.service';

import { GithubSyncXpStrategy } from './application/strategies/engineering/github-sync.strategy';
import { ProjectCreatedXpStrategy } from './application/strategies/engineering/project-created.strategy';
import { QuestCompletedXpStrategy } from './application/strategies/gamification/quest-completed.strategy';
import { HabitCompletedXpStrategy } from './application/strategies/reflection/habit-completed.strategy';
import { JournalCreatedXpStrategy } from './application/strategies/reflection/journal-created.strategy';
import { RoutineCompletedXpStrategy } from './application/strategies/reflection/routine-completed.strategy';
import { MoodLoggedXpStrategy } from './application/strategies/reflection/mood-logged.strategy';
import { MemoryCreatedXpStrategy } from './application/strategies/reflection/memory-created.strategy';

const Handlers = [GetUserStatsHandler, AwardXpHandler];
const Strategies = [
  GithubSyncXpStrategy,
  ProjectCreatedXpStrategy,
  QuestCompletedXpStrategy,
  HabitCompletedXpStrategy,
  JournalCreatedXpStrategy,
  RoutineCompletedXpStrategy,
  MoodLoggedXpStrategy,
  MemoryCreatedXpStrategy,
];

@Module({
  imports: [CqrsModule, SharedModule, AuthModule, DiscoveryModule],
  controllers: [GamificationController],
  providers: [
    GamificationGateway,
    {
      provide: UserStatsRepository,
      useClass: PrismaUserStatsRepository,
    },
    {
      provide: 'UserStatsRepository',
      useClass: PrismaUserStatsRepository,
    },
    XpAwardingProcessor,
    XpRateLimitService,
    ...Handlers,
    ...Strategies,
  ],
  exports: [UserStatsRepository, 'UserStatsRepository', GamificationGateway],
})
export class GamificationModule {}
