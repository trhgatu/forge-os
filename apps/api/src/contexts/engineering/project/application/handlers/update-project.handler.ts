import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateProjectCommand } from '../commands/update-project.command';
import { ProjectRepository } from '../ports/project.repository';
import { Project } from '../../domain/project.entity';
import { LoggerService } from '@shared/logging/logger.service';
import { ProjectUpdatedEvent } from '../../domain/events/project-updated.event';
import { CacheService } from '@shared/services';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand> {
  // private readonly logger = new Logger(UpdateProjectHandler.name);

  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly logger: LoggerService,
    private readonly eventBus: EventBus,
    private readonly cacheService: CacheService,
  ) {}

  async execute(command: UpdateProjectCommand): Promise<Project> {
    const { id, payload } = command;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    this.logger.log(`Updating project ${id} with data: ${JSON.stringify(payload)}`);

    project.updateInfo(payload);

    await this.projectRepository.save(project);

    this.eventBus.publish(
      new ProjectUpdatedEvent(
        id.toString(),
        ((payload as any).userId as string) || 'system', // TODO: Update DTO to include userId or pass from Command
        payload,
        new Date(),
      ),
    );

    this.logger.log(`Project ${id} updated in DB. Links count: ${project.links?.length}`);

    // Invalidate project list cache
    await this.cacheService.deleteByPattern('projects:*');

    return project;
  }
}
