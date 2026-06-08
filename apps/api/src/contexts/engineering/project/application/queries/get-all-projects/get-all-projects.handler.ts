import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProjectsQuery } from './get-all-projects.query';
import { Inject } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/project.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { Project } from '../../../domain/entities/project.entity';
import { ProjectCacheKeys } from '../../../infrastructure/cache/project-cache.keys';

import { ProjectMapper } from '../../../infrastructure/repositories/project.mapper';

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

    const cached = await this.cacheService.get<PaginatedResult<any>>(cacheKey);
    if (cached) {
      return {
        meta: cached.meta,
        data: cached.data.map((doc) => ProjectMapper.toDomain(doc)),
      };
    }

    const result = await this.projectRepository.findAll(payload);

    const cacheData = {
      meta: result.meta,
      data: result.data.map((p) => ProjectMapper.toPersistence(p)),
    };

    await this.cacheService.set(cacheKey, cacheData, 60);
    return result;
  }
}
