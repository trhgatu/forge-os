import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { UpdateProjectCommand } from '../commands/update-project.command';
import { ProjectRepository } from '../ports/project.repository';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  private readonly logger = new Logger(UpdateProjectHandler.name);

  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: UpdateProjectCommand): Promise<any> {
    const { id, data } = command;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Merge updates
    this.logger.log(
      `Updating project ${id} with data: ${JSON.stringify(data)}`,
    );
    Object.assign(project, data);
    project.updatedAt = new Date();

    const updatedProject = await this.projectRepository.update(project);
    this.logger.log(
      `Project ${id} updated in DB. Links count: ${project.links?.length}`,
    );
    return updatedProject;
  }
}
