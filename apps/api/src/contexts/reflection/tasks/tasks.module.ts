import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { TasksController } from './presentation/tasks.controller';
import { CommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';
import { TaskEventHandlers } from './application/events';
import { TaskPresenter } from './presentation/presenters/task.presenter';
import { TasksRepository } from './domain/tasks.repository';
import { PrismaTasksRepository } from './infrastructure/prisma-tasks.repository';
import { TaskMapper } from './infrastructure/task.mapper';

@Module({
  imports: [CqrsModule, PrismaModule, AuthModule],
  controllers: [TasksController],
  providers: [
    TaskPresenter,
    TaskMapper,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository,
    },
    {
      provide: 'TasksRepository',
      useClass: PrismaTasksRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...TaskEventHandlers,
  ],
  exports: [TasksRepository, 'TasksRepository'],
})
export class TasksModule {}
