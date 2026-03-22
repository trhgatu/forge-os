import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectSchema } from './infrastructure/project.schema';
import { ProjectController } from './presentation/project.controller';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { EventHandlers } from './application/events/handlers';

import { MongoProjectRepository } from './infrastructure/repositories/mongo-project.repository';
import { HttpGithubRepository } from './infrastructure/repositories/http-github.repository';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [ProjectController],
  providers: [
    {
      provide: 'ProjectRepository',
      useClass: MongoProjectRepository,
    },
    {
      provide: 'GithubRepository',
      useClass: HttpGithubRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [],
})
export class ProjectModule {}
