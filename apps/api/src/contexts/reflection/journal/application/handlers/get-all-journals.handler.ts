import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllJournalsQuery } from '../queries/get-all-journals.query';
import { JournalRepository } from '../../application/ports/journal.repository';
import { CacheService } from '@shared/services';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { JournalResponse } from '../../presentation/dto/journal.response';
import { JournalCacheKeys } from '../../infrastructure/cache/journal-cache.keys';

@QueryHandler(GetAllJournalsQuery)
export class GetAllJournalsHandler implements IQueryHandler<GetAllJournalsQuery> {
  constructor(
    private readonly journalRepo: JournalRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllJournalsQuery,
  ): Promise<PaginatedResponse<JournalResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = JournalCacheKeys.GET_ALL_ADMIN(page, limit, payload);

    const cached =
      await this.cacheService.get<PaginatedResponse<JournalResponse>>(cacheKey);

    if (cached) return cached;

    const journals = await this.journalRepo.findAll(payload);

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
