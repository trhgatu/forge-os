import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllJournalsQuery } from '../queries';
import { Inject } from '@nestjs/common';
import { JournalRepository } from '../ports/journal.repository';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { PaginatedResult } from '@shared/types/paginated-result';
import { JournalResponse } from '../../presentation/dto/journal.response';

@QueryHandler(GetAllJournalsQuery)
export class GetAllJournalsHandler
  implements
    IQueryHandler<GetAllJournalsQuery, PaginatedResult<JournalResponse>>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(
    query: GetAllJournalsQuery,
  ): Promise<PaginatedResult<JournalResponse>> {
    const result = await this.journalRepo.findAll(query.filter);
    return {
      meta: result.meta,
      data: result.data.map(JournalPresenter.toResponse),
    };
  }
}
