import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '../commands/delete-project.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../ports/project.repository';
import { ProjectId } from '../../domain/value-objects/project-id.vo';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: DeleteProjectCommand): Promise<void> {
    const { id } = command;
    const projectId = ProjectId.create(id);
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.projectRepository.softDelete(projectId);
    return;
  }
}
