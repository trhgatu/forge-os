import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllJournalsForPublicQuery } from './get-all-journals-for-public.query';
import { Inject } from '@nestjs/common';
import { JournalRepository } from '../../../domain/journal.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { Journal } from '../../../domain/journal.entity';

@QueryHandler(GetAllJournalsForPublicQuery)
export class GetAllJournalsForPublicHandler implements IQueryHandler<GetAllJournalsForPublicQuery, PaginatedResult<Journal>> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllJournalsForPublicQuery): Promise<PaginatedResult<Journal>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `journals:public:p${page}:l${limit}:${JSON.stringify(payload)}`;
    const cached = await this.cacheService.get<PaginatedResult<Journal>>(cacheKey);
    if (cached) return cached;

    const result = await this.journalRepo.findAllPublic(payload);
    await this.cacheService.set(cacheKey, result, 60);

    return result;
  }
}
