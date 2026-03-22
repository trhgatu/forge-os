import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateProjectCommand } from '../update-project.command';
import { ProjectRepository } from '../../ports/project.repository';
import { Project } from '../../../domain/entities/project.entity';
import { ProjectModifiedEvent } from '../../events/project-modified.event';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateProjectCommand): Promise<Project> {
    const { id, payload } = command;
    const project = await this.projectRepository.findById(id);
    const userId = payload.userId;

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    project.updateInfo(payload);

    await this.projectRepository.save(project);

    this.eventBus.publish(new ProjectModifiedEvent(id, 'update', userId));

    return project;
  }
}
