import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProjectsQuery } from '../queries/get-all-projects.query';
import { Inject, Logger } from '@nestjs/common';
import { ProjectRepository } from '../ports/project.repository';
import { CacheService } from '@shared/services';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { ProjectPresenter } from '../../presentation/project.presenter';
import { ProjectResponse } from '../../presentation/dto/project.response';

@QueryHandler(GetAllProjectsQuery)
export class GetAllProjectsHandler
  implements IQueryHandler<GetAllProjectsQuery>
{
  private readonly logger = new Logger(GetAllProjectsHandler.name);

  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllProjectsQuery,
  ): Promise<PaginatedResponse<ProjectResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    // Create deterministic cache key by sorting inputs
    const safeKeyword = payload.keyword || '';
    const safeStatus = payload.status || '';
    const p = page;
    const l = limit;
    const cacheKey = `projects:list:${p}:${l}:${safeKeyword}:${safeStatus}`;

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
