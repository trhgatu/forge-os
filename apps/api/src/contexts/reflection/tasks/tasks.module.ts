import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { TasksController } from './presentation/tasks.controller';
import { CommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';
import { TaskEventHandlers } from './application/events';
import { TaskPresenter } from './presentation/presenters/task.presenter';

@Module({
  imports: [CqrsModule, PrismaModule, AuthModule],
  controllers: [TasksController],
  providers: [TaskPresenter, ...CommandHandlers, ...QueryHandlers, ...TaskEventHandlers],
})
export class TasksModule {}
