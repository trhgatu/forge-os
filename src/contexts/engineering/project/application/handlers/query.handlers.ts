import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetProjectsQuery,
  GetProjectQuery,
} from '../queries/get-projects.query';
import { Inject, Logger } from '@nestjs/common';
import { ProjectRepository } from '../ports/project.repository';
import { Project } from '../../domain/project.entity';

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements IQueryHandler<GetProjectsQuery> {
  private readonly logger = new Logger(GetProjectsHandler.name);

  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(query: GetProjectsQuery): Promise<Project[]> {
    this.logger.debug(`Executing GetProjectsQuery: ${JSON.stringify(query)}`);
    return this.projectRepository.findAll();
  }
}

@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(query: GetProjectQuery): Promise<Project | null> {
    return this.projectRepository.findById(query.id);
  }
}
