import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { GetAllJournalsForPublicQuery } from '../queries/get-all-journals-for-public.query';

import { JournalRepository } from '../../application/ports/journal.repository';
import { CacheService } from '@shared/services';

import { PaginatedResult } from '@shared/types/paginated-result';
import { PaginatedResponse } from '@shared/types/paginated-response';

import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

@QueryHandler(GetAllJournalsForPublicQuery)
export class GetAllJournalsForPublicHandler
  implements IQueryHandler<GetAllJournalsForPublicQuery>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,

    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllJournalsForPublicQuery,
  ): Promise<PaginatedResponse<JournalResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `journals:public:p${page}:l${limit}:${JSON.stringify(
      payload,
    )}`;

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
