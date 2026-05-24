import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { GamificationModule } from '../gamification.module';

import { GoalController } from './presentation/controllers/goal.controller';
import { GoalsService } from './application/goals.service';

import { CreateGoalHandler } from './application/commands/create-goal.command';
import { UpdateGoalHandler } from './application/commands/update-goal.command';
import { DeleteGoalHandler } from './application/commands/delete-goal.command';

import { GetGoalsHandler } from './application/queries/get-goals.query';
import { GetGoalByIdHandler } from './application/queries/get-goal-by-id.query';

const CommandHandlers = [CreateGoalHandler, UpdateGoalHandler, DeleteGoalHandler];
const QueryHandlers = [GetGoalsHandler, GetGoalByIdHandler];

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    SharedModule,
    AuthModule,
    GamificationModule,
  ],
  controllers: [GoalController],
  providers: [
    GoalsService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [GoalsService],
})
export class GoalsModule {}
