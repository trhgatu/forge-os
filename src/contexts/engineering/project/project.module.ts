import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { Project, ProjectSchema } from './infrastructure/project.schema';
import { ProjectController } from './presentation/project.controller';
import { CommandHandlers, QueryHandlers } from './application/handlers';
import { MongoProjectRepository } from './infrastructure/repositories/mongo-project.repository';
import { HttpGithubRepository } from './infrastructure/repositories/http-github.repository';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
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
  ],
  exports: [],
})
export class ProjectModule {}
