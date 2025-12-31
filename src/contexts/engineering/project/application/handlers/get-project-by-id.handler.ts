import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProjectByIdQuery } from '../queries/get-project-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../ports/project.repository';
import { ProjectPresenter } from '../../presentation/project.presenter';
import { ProjectResponse } from '../../presentation/dto/project.response';
import { LoggerService } from '@shared/logging/logger.service';

@QueryHandler(GetProjectByIdQuery)
export class GetProjectByIdHandler
  implements IQueryHandler<GetProjectByIdQuery>
{
  // private readonly logger = new Logger(GetProjectByIdHandler.name);

  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute(query: GetProjectByIdQuery): Promise<ProjectResponse> {
    const { id } = query;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id.toString()} not found`);
    }

    return ProjectPresenter.toResponse(project);
  }
}
