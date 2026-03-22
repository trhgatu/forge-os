import { Inject } from '@nestjs/common';
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
    @Inject('JournalRepository')
    private readonly journalRepository: JournalRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllJournalsQuery): Promise<PaginatedResponse<JournalResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;
    const version = await this.cacheService.getVersion('journals');
    const cacheKey = JournalCacheKeys.GET_ALL_ADMIN(version, page, limit, payload);

    return this.cacheService.wrap(
      cacheKey,
      async () => {
        const journals = await this.journalRepository.findAll(payload);
        return {
          meta: journals.meta,
          data: journals.data.map((journal) => JournalPresenter.toResponse(journal)),
        };
      },
      60,
    );
  }
}
