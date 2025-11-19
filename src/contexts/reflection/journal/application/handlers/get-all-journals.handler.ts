import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { GetAllJournalsQuery } from '../queries/get-all-journals.query';

import { JournalRepository } from '../../application/ports/journal.repository';
import { CacheService } from '@shared/services';

import { JournalPresenter } from '../../presentation/journal.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { JournalResponse } from '../../presentation/dto/journal.response';

@QueryHandler(GetAllJournalsQuery)
export class GetAllJournalsHandler
  implements IQueryHandler<GetAllJournalsQuery>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,

    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllJournalsQuery,
  ): Promise<PaginatedResponse<JournalResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `journals:admin:p${page}:l${limit}:${JSON.stringify(
      payload,
    )}`;

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
