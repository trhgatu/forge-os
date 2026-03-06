import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '../commands/delete-project.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../ports/project.repository';
import { LoggerService } from '@shared/logging/logger.service';
import { CacheService } from '@shared/services';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly logger: LoggerService,
    private readonly cacheService: CacheService,
  ) {}

  async execute(command: DeleteProjectCommand): Promise<void> {
    const { id } = command;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id.toString()} not found`);
    }

    await this.projectRepository.softDelete(id);

    this.logger.warn(
      `Project soft-deleted: ${id.toString()} (Title: "${project.title}")`,
      'DeleteProjectHandler',
    );

    await this.cacheService.deleteByPattern('projects:*');

    return;
  }
}
