import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetJournalByIdForPublicQuery } from '../queries/get-journal-by-id-public.query';
import { JournalRepository } from '../../application/ports/journal.repository';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

@QueryHandler(GetJournalByIdForPublicQuery)
export class GetJournalByIdForPublicHandler
  implements IQueryHandler<GetJournalByIdForPublicQuery, JournalResponse>
{
  constructor(private readonly journalRepo: JournalRepository) {}

  async execute(query: GetJournalByIdForPublicQuery): Promise<JournalResponse> {
    const { id } = query;

    const journal = await this.journalRepo.findById(id);

    if (!journal || journal.isJournalDeleted) {
      throw new NotFoundException('Journal not found');
    }

    return JournalPresenter.toResponse(journal);
  }
}
