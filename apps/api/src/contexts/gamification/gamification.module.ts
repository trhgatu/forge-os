import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GamificationController } from './presentation/gamification.controller';
import { GamificationGateway } from './presentation/gamification.gateway';
import { PrismaUserStatsRepository } from './infrastructure/prisma-user-stats.repository';
import { UserStatsRepository } from './domain/ports/user-stats.repository';
import { GetUserStatsHandler } from './application/queries/get-user-stats.query';
import { AwardXpHandler } from './application/handlers/award-xp.handler';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../iam/auth/auth.module';

const Handlers = [GetUserStatsHandler, AwardXpHandler];

@Module({
  imports: [CqrsModule, SharedModule, AuthModule],
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
    ...Handlers,
  ],
  exports: [UserStatsRepository],
})
export class GamificationModule {}
