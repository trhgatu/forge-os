import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProjectByIdQuery } from './get-project-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/project.repository';
import { Project } from '../../../domain/entities/project.entity';

@QueryHandler(GetProjectByIdQuery)
export class GetProjectByIdHandler implements IQueryHandler<GetProjectByIdQuery, Project> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(query: GetProjectByIdQuery): Promise<Project> {
    const { id } = query;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id.toString()} not found`);
    }

    return project;
  }
}
