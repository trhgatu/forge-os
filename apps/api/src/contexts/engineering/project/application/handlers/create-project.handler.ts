import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateProjectCommand } from '../commands/create-project.command';
import { ProjectRepository } from '../ports/project.repository';
import { Project } from '../../domain/project.entity';
import { ProjectId } from '../../domain/value-objects/project-id.vo';
import { ProjectResponse } from '../../presentation/dto/project.response';
import { ProjectPresenter } from '../../presentation/project.presenter';
import { CacheService } from '@shared/services';
// import { ProjectCreatedEvent } from '../../domain/events/project-created.event';
import { ActivityStreamService } from '@shared/insfrastructure/redis/activity-stream.service';
import { LoggerService } from '@shared/logging/logger.service';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<
  CreateProjectCommand,
  ProjectResponse
> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly activityStream: ActivityStreamService,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: CreateProjectCommand): Promise<ProjectResponse> {
    const { payload } = command;

    const projectId = ProjectId.create(new Types.ObjectId());
    const userId = payload.userId || 'system';

    const project = Project.create(
      {
        title: payload.title ?? 'New Project',
        description: payload.description || '',
      },
      projectId,
    );

    await this.projectRepository.save(project);
    await this.cacheService.deleteByPattern('projects:*');

    await this.activityStream.emit('engineering.project.created', userId, {
      projectId: projectId.toString(),
      title: project.title,
      createdAt: new Date(),
    });

    this.logger.log(
      `Project created and streamed: "${project.title}" (ID: ${projectId.toString()})`,
      'CreateProjectHandler',
    );

    return ProjectPresenter.toResponse(project);
  }
}
