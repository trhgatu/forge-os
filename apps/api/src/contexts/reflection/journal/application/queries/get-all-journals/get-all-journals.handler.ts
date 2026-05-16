import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllJournalsQuery } from './get-all-journals.query';
import { Inject } from '@nestjs/common';
import { JournalRepository } from '../../../domain/journal.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { Journal } from '../../../domain/journal.entity';

@QueryHandler(GetAllJournalsQuery)
export class GetAllJournalsHandler implements IQueryHandler<
  GetAllJournalsQuery,
  PaginatedResult<Journal>
> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllJournalsQuery): Promise<PaginatedResult<Journal>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `journals:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
    const cached = await this.cacheService.get<PaginatedResult<Journal>>(cacheKey);
    if (cached) return cached;

    const result = await this.journalRepo.findAll(payload);

    const cacheableResult = {
      ...result,
      data: result.data.map((journal) => journal.toPrimitives()),
    };

    await this.cacheService.set(cacheKey, cacheableResult, 60);

    return result;
  }
}
