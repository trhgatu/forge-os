import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProjectsQuery } from '../queries/get-all-projects.query';
import { Inject } from '@nestjs/common';
import { ProjectRepository } from '../ports/project.repository';
import { CacheService } from '@shared/services';
import { LoggerService } from '@shared/logging/logger.service';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { ProjectPresenter } from '../../presentation/project.presenter';
import { ProjectResponse } from '../../presentation/dto/project.response';

@QueryHandler(GetAllProjectsQuery)
export class GetAllProjectsHandler
  implements IQueryHandler<GetAllProjectsQuery>
{
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async execute(
    query: GetAllProjectsQuery,
  ): Promise<PaginatedResponse<ProjectResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const safeKeyword = payload.keyword || '';
    const safeStatus = payload.status || '';
    const safeTags = [...(payload.tags || [])].sort().join(',');
    const safeIsDeleted =
      payload.isDeleted !== undefined ? String(payload.isDeleted) : '';
    const safeIsPinned =
      payload.isPinned !== undefined ? String(payload.isPinned) : '';
    const p = page;
    const l = limit;
    const cacheKey = `projects:list:${p}:${l}:${safeKeyword}:${safeStatus}:${safeTags}:${safeIsDeleted}:${safeIsPinned}`;

    const cached =
      await this.cacheService.get<PaginatedResponse<ProjectResponse>>(cacheKey);

    if (cached) {
      this.logger.debug(`Cache hit for ${cacheKey}`);
      return cached;
    }

    this.logger.debug(`Cache miss for ${cacheKey}. Fetching from DB.`);

    const result = await this.projectRepository.findAll(payload);

    const response = {
      meta: result.meta,
      data: result.data.map((project) => ProjectPresenter.toResponse(project)),
    };

    await this.cacheService.set(cacheKey, response, 60); // Cache for 60s
    return response;
  }
}
