import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProjectsQuery } from '../get-all-projects.query';
import { Inject } from '@nestjs/common';
import { ProjectRepository } from '../../ports/project.repository';
import { CacheService } from '@shared/services';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { ProjectPresenter } from '../../../presentation/project.presenter';
import { ProjectResponse } from '../../../presentation/dto/project.response';
import { ProjectCacheKeys } from '../../../infrastructure/cache/project-cache.keys';

@QueryHandler(GetAllProjectsQuery)
export class GetAllProjectsHandler implements IQueryHandler<GetAllProjectsQuery> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllProjectsQuery): Promise<PaginatedResponse<ProjectResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const version = await this.cacheService.getVersion('projects');
    const cacheKey = ProjectCacheKeys.GET_ALL_ADMIN(version, page, limit, payload);

    return this.cacheService.wrap(
      cacheKey,
      async () => {
        const projects = await this.projectRepository.findAll(payload);
        return {
          meta: projects.meta,
          data: projects.data.map((project) => ProjectPresenter.toResponse(project)),
        };
      },
      60,
    );
  }
}
