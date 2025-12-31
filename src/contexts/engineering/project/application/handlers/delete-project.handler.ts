import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '../commands/delete-project.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../ports/project.repository';
import { ProjectDeletedEvent } from '../../domain/events/project-deleted.event';
// import { ProjectId } from '../../domain/value-objects/project-id.vo'; // Unused now

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteProjectCommand): Promise<void> {
    const { id } = command;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id.toString()} not found`);
    }

    await this.projectRepository.softDelete(id);

    // TODO: Need userId in Command for full auditing
    this.eventBus.publish(
      new ProjectDeletedEvent(id.toString(), 'system', new Date()),
    );
    return;
  }
}
