import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '../delete-project.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../../ports/project.repository';
import { LoggerService } from '@shared/logging/logger.service';
import { ProjectModifiedEvent } from '../../events/project-modified.event';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly logger: LoggerService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteProjectCommand): Promise<void> {
    const { id, userId } = command;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id.toString()} not found`);
    }

    project.delete();
    await this.projectRepository.save(project);

    this.logger.warn(
      `Project soft-deleted: ${id.toString()} (Title: "${project.title}")`,
      'DeleteProjectHandler',
    );

    await this.eventBus.publish(new ProjectModifiedEvent(id, 'soft-delete', userId));

    return;
  }
}
