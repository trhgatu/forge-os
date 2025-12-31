import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateProjectCommand } from '../commands/create-project.command';
import { ProjectRepository } from '../ports/project.repository';
import { Project } from '../../domain/project.entity';
import { ProjectId } from '../../domain/value-objects/project-id.vo';
import { ProjectResponse } from '../../presentation/dto/project.response';
import { ProjectPresenter } from '../../presentation/project.presenter';
import { CacheService } from '@shared/services';
import { ProjectCreatedEvent } from '../../domain/events/project-created.event';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand, ProjectResponse>
{
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly eventBus: EventBus,
    private readonly cacheService: CacheService,
  ) {}

  async execute(command: CreateProjectCommand): Promise<ProjectResponse> {
    const { payload } = command;
    const projectId = ProjectId.create(new Types.ObjectId());
    const userId = payload.userId || 'system';
    const now = new Date();

    const project = Project.create(
      {
        title: payload.title ?? 'New Project',
        description: payload.description || '',
      },
      projectId,
    );

    // Save returns void now
    await this.projectRepository.save(project);

    // Publish event
    this.eventBus.publish(
      new ProjectCreatedEvent(
        projectId.toString(),
        userId,
        project.title, // Use getter since props are private
        now,
      ),
    );

    // Invalidate cache
    await this.cacheService.deleteByPattern('projects:list:*');

    console.log(
      'DEBUG: Project CreatedAt Type:',
      typeof project.createdAt,
      project.createdAt,
    );
    if (typeof project.createdAt === 'string') {
      console.error('CRITICAL: project.createdAt mutated to string!');
    }

    return ProjectPresenter.toResponse(project);
  }
}
