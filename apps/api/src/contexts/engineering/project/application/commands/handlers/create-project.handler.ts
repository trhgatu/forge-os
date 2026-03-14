import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateProjectCommand } from '../create-project.command';
import { ProjectRepository } from '../../ports/project.repository';
import { Project } from '../../../domain/entities/project.entity';
import { ProjectId } from '../../../domain/value-objects/project-id.vo';

import { ProjectModifiedEvent } from '../../events/project-modified.event';
import { LoggerService } from '@shared/logging';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand, Project> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly eventBus: EventBus,
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

    await this.projectRepository.save(project);

    this.logger.debug(`[1] Preparing to publish ProjectModifiedEvent for ${projectId}`);
    this.eventBus.publish(new ProjectModifiedEvent(projectId, 'create', userId));
    this.logger.debug(`[2] Event published to EventBus`);
    return project;
  }
}
