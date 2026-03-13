import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllJournalsForPublicQuery } from '../queries/get-all-journals-for-public.query';

import { JournalRepository } from '../../application/ports/journal.repository';
import { CacheService } from '@shared/services';
import { LoggerService } from '@shared/logging';

import { PaginatedResponse } from '@shared/types/paginated-response';

import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';
import { JournalCacheKeys } from '../../infrastructure/cache/journal-cache.keys';

@QueryHandler(GetAllJournalsForPublicQuery)
export class GetAllJournalsForPublicHandler implements IQueryHandler<GetAllJournalsForPublicQuery> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepository: JournalRepository,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async execute(query: GetAllJournalsForPublicQuery): Promise<PaginatedResponse<JournalResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const version = await this.cacheService.getVersion('journals');

    const cacheKey = JournalCacheKeys.GET_ALL_PUBLIC(version, page, limit, payload);

    return this.cacheService.wrap(
      cacheKey,
      async () => {
        this.logger.debug(`Fetching journals from DB for key: ${cacheKey}`);

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
