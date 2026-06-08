import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectController } from './presentation/project.controller';
import { ProjectCommandHandlers } from './application/commands';
import { ProjectQueryHandlers } from './application/queries';
import { EventHandlers } from './application/events/handlers';
import { PrismaProjectRepository } from './infrastructure/repositories/prisma-project.repository';
import { HttpGithubRepository } from './infrastructure/repositories/http-github.repository';
import { SharedModule } from '@shared/shared.module';
import { ProjectRepository } from './domain/project.repository';

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [ProjectController],
  providers: [
    {
      provide: 'ProjectRepository',
      useClass: PrismaProjectRepository,
    },
    {
      provide: ProjectRepository,
      useClass: PrismaProjectRepository,
    },
    {
      provide: 'GithubRepository',
      useClass: HttpGithubRepository,
    },
    ...ProjectCommandHandlers,
    ...ProjectQueryHandlers,
    ...EventHandlers,
  ],
  exports: [ProjectRepository],
})
export class ProjectModule {}
