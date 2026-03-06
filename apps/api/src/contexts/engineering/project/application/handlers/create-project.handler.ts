import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateProjectCommand } from '../commands/create-project.command';
import { ProjectRepository } from '../ports/project.repository';
import { Project } from '../../domain/project.entity';
import { ProjectId } from '../../domain/value-objects/project-id.vo';
import { CacheService } from '@shared/services';
import { ACTIVITY_STREAM_PORT, IActivityStreamPort } from '@shared/ports/activity-stream.port';
import { LoggerService } from '@shared/logging/logger.service';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand, Project> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    @Inject(ACTIVITY_STREAM_PORT)
    private readonly activityStream: IActivityStreamPort,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: CreateProjectCommand): Promise<Project> {
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

    console.time('ProjectRepo.save');
    await this.projectRepository.save(project);
    console.timeEnd('ProjectRepo.save');

    console.time('Cache.deleteByPattern');
    await this.cacheService.deleteByPattern('projects:*');
    console.timeEnd('Cache.deleteByPattern');

    console.time('ActivityStream.emit');
    await this.activityStream.emit('engineering.project.created', userId, {
      projectId: projectId.toString(),
      title: project.title,
      createdAt: new Date(),
    });
    console.timeEnd('ActivityStream.emit');

    this.logger.log(
      `Project created: "${project.title}" (ID: ${projectId.toString()})`,
      'CreateProjectHandler',
    );

    return project;
  }
}
