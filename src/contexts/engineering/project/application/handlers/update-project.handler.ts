import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { UpdateProjectCommand } from '../commands/update-project.command';
import { ProjectRepository } from '../ports/project.repository';
import { Project } from '../../domain/project.entity';
// import { ProjectResponse } from '../../presentation/dto/project.response';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  private readonly logger = new Logger(UpdateProjectHandler.name);

  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: UpdateProjectCommand): Promise<Project> {
    const { id, payload } = command;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    this.logger.log(
      `Updating project ${id} with data: ${JSON.stringify(payload)}`,
    );

    project.updateInfo(payload);

    await this.projectRepository.save(project);

    this.logger.log(
      `Project ${id} updated in DB. Links count: ${project.links?.length}`,
    );
    return project;
  }
}
