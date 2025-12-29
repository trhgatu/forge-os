import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from '../commands/create-project.command';
import { Inject } from '@nestjs/common';
import { ProjectRepository } from '../ports/project.repository';
import { Project } from '../../domain/project.entity';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: CreateProjectCommand): Promise<Project> {
    // Basic factory logic (should be in Domain Factory ideally)
    const newProject = new Project(
      '', // ID handled by DB
      command.title,
      command.description || '',
      'active',
      [],
      false,
      {},
      {},
      0,
      { todo: [], inProgress: [], done: [] },
      [],
      [], // logs
      new Date(),
      new Date(),
    );
    return this.projectRepository.create(newProject);
  }
}
