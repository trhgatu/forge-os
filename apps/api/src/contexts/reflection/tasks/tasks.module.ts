import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { TasksController } from './presentation/tasks.controller';
import { TasksService } from './application/tasks.service';

@Module({
  imports: [CqrsModule, PrismaModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
