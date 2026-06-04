import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProjectsQuery } from './get-all-projects.query';
import { Inject } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/project.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { Project } from '../../../domain/entities/project.entity';
import { ProjectCacheKeys } from '../../../infrastructure/cache/project-cache.keys';

@QueryHandler(GetAllProjectsQuery)
export class GetAllProjectsHandler implements IQueryHandler<
  GetAllProjectsQuery,
  PaginatedResult<Project>
> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllProjectsQuery): Promise<PaginatedResult<Project>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const version = await this.cacheService.getVersion('projects');
    const cacheKey = ProjectCacheKeys.GET_ALL_ADMIN(version, page, limit, payload);

    return this.cacheService.wrap(
      cacheKey,
      async () => {
        return this.projectRepository.findAll(payload);
      },
      60,
    );
  }
}
