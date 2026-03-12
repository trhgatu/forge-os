import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateProjectCommand } from '../commands/update-project.command';
import { ProjectRepository } from '../ports/project.repository';
import { Project } from '../../domain/project.entity';
import { LoggerService } from '@shared/logging/logger.service';
import { CacheService } from '@shared/services';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly logger: LoggerService,
    private readonly cacheService: CacheService,
  ) {}

  async execute(command: UpdateProjectCommand): Promise<Project> {
    const { id, payload } = command;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    project.updateInfo(payload);

    await this.projectRepository.save(project);

    this.logger.log(`Project ${id} updated. Links count: ${project.links?.length}`);

    await this.cacheService.deleteByPattern('projects:*');

    return project;
  }
}
