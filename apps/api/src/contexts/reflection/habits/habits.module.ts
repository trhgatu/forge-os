import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { HabitController } from './presentation/controllers/habit.controller';
import { HabitsRepository } from './domain/habits.repository';
import { PrismaHabitsRepository } from './infrastructure/prisma-habits.repository';
import { CommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';
import { HabitPresenter } from './presentation/presenters/habit.presenter';
import { HabitsAutomationDispatcher } from './application/events/habits-automation.dispatcher';

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule, AuthModule],
  controllers: [HabitController],
  providers: [
    {
      provide: HabitsRepository,
      useClass: PrismaHabitsRepository,
    },
    {
      provide: 'HabitsRepository',
      useClass: PrismaHabitsRepository,
    },
    HabitPresenter,
    HabitsAutomationDispatcher,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [HabitsRepository, 'HabitsRepository'],
})
export class HabitsModule implements OnModuleInit {
  constructor(private readonly dispatcher: HabitsAutomationDispatcher) {}

  onModuleInit() {
    this.dispatcher.onModuleInit();
  }
}
