import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllJournalsForPublicQuery } from '../queries/get-all-journals-for-public.query';

import { JournalRepository } from '../../application/ports/journal.repository';
import { CacheService } from '@shared/services';

import { PaginatedResult } from '@shared/types/paginated-result';
import { PaginatedResponse } from '@shared/types/paginated-response';

import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';
import { JournalCacheKeys } from '../../infrastructure/cache/journal-cache.keys';

@QueryHandler(GetAllJournalsForPublicQuery)
export class GetAllJournalsForPublicHandler implements IQueryHandler<GetAllJournalsForPublicQuery> {
  constructor(
    private readonly journalRepo: JournalRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllJournalsForPublicQuery,
  ): Promise<PaginatedResponse<JournalResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = JournalCacheKeys.GET_ALL_PUBLIC(page, limit, payload);

    const cached =
      await this.cacheService.get<PaginatedResult<JournalResponse>>(cacheKey);
    if (cached) return cached;

    const journals = await this.journalRepo.findAll({
      ...payload,
      isDeleted: false,
    });

    const response = {
      meta: journals.meta,
      data: journals.data.map((journal) =>
        JournalPresenter.toResponse(journal),
      ),
    };

    await this.cacheService.set(cacheKey, response, 60);
    return response;
  }
}
