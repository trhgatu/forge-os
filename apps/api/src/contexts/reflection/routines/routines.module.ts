import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { RoutineController } from './presentation/controllers/routine.controller';
import { RoutinesRepository } from './domain/routines.repository';
import { PrismaRoutinesRepository } from './infrastructure/prisma-routines.repository';
import { CommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';
import { RoutinePresenter } from './presentation/presenters/routine.presenter';
import { HabitsModule } from '../habits/habits.module';
import { RoutineAutomationListener } from './application/events/routine-automation.listener';
import { OnModuleInit } from '@nestjs/common';

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule, AuthModule, HabitsModule],
  controllers: [RoutineController],
  providers: [
    {
      provide: RoutinesRepository,
      useClass: PrismaRoutinesRepository,
    },
    {
      provide: 'RoutinesRepository',
      useClass: PrismaRoutinesRepository,
    },
    RoutinePresenter,
    RoutineAutomationListener,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [RoutinesRepository, 'RoutinesRepository'],
})
export class RoutinesModule implements OnModuleInit {
  constructor(private readonly listener: RoutineAutomationListener) {}

  onModuleInit() {
    this.listener.onModuleInit();
  }
}
