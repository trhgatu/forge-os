import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DiscoveryModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { GamificationController } from './presentation/gamification.controller';
import { AuthModule } from '../iam/auth/auth.module';
import { MongoUserStatsRepository } from './infrastructure/mongo-user-stats.repository';
import { UserStatsModel, UserStatsSchema } from './infrastructure/user-stats.schema';
import { AwardXpHandler } from './application/handlers/award-xp.handler';
import { GetUserStatsHandler } from './application/queries/get-user-stats.query';
import { GamificationGateway } from './presentation/gamification.gateway';
import { XpAwardingProcessor } from './application/processors/xp-awarding.processor';
import { ProjectCreatedXpStrategy } from './application/strategies/engineering/project-created.strategy';
import { GithubSyncXpStrategy } from './application/strategies/engineering/github-sync.strategy';
import { RedisModule } from '@shared/insfrastructure/redis/redis.module';
import { XpRateLimitService } from './application/services/xp-rate-limit.service';

@Module({
  imports: [
    CqrsModule,
    DiscoveryModule,
    MongooseModule.forFeature([{ name: UserStatsModel.name, schema: UserStatsSchema }]),
    AuthModule,
    RedisModule,
  ],
  controllers: [GamificationController],
  providers: [
    AwardXpHandler,
    ProjectCreatedXpStrategy,
    GithubSyncXpStrategy,
    GetUserStatsHandler,
    GamificationGateway,
    XpAwardingProcessor,
    XpRateLimitService,
    {
      provide: 'UserStatsRepository',
      useClass: MongoUserStatsRepository,
    },
  ],
})
export class GamificationModule {}
