import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { HabitController } from './presentation/controllers/habit.controller';
import { HabitsRepository } from './domain/habits.repository';
import { PrismaHabitsRepository } from './infrastructure/prisma-habits.repository';
import { CreateHabitHandler } from './application/commands/create-habit.command';
import { CompleteHabitHandler } from './application/commands/complete-habit.command';
import { GetAllHabitsHandler } from './application/queries/get-all-habits.query';

const CommandHandlers = [CreateHabitHandler, CompleteHabitHandler];
const QueryHandlers = [GetAllHabitsHandler];

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule, AuthModule],
  controllers: [HabitController],
  providers: [
    {
      provide: HabitsRepository,
      useClass: PrismaHabitsRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [HabitsRepository],
})
export class HabitsModule {}
