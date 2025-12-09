import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJournalByIdQuery } from '../queries';
import { Inject, NotFoundException } from '@nestjs/common';
import { JournalRepository } from '../ports/journal.repository';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

@QueryHandler(GetJournalByIdQuery)
export class GetJournalByIdHandler
  implements IQueryHandler<GetJournalByIdQuery, JournalResponse>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(query: GetJournalByIdQuery): Promise<JournalResponse> {
    const journal = await this.journalRepo.findById(query.id);
    if (!journal) throw new NotFoundException('Journal not found');
    return JournalPresenter.toResponse(journal);
  }
}
