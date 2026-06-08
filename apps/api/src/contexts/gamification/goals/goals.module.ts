import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { GamificationModule } from '../gamification.module';

import { GoalController } from './presentation/controllers/goal.controller';
import { GoalsService } from './application/goals.service';

import { CommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule, AuthModule, GamificationModule],
  controllers: [GoalController],
  providers: [GoalsService, ...CommandHandlers, ...QueryHandlers],
  exports: [GoalsService],
})
export class GoalsModule {}
