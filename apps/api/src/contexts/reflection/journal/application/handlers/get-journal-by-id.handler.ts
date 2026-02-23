import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { GetJournalByIdQuery } from '../queries/get-journal-by-id.query';

import { JournalRepository } from '../../application/ports/journal.repository';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

@QueryHandler(GetJournalByIdQuery)
export class GetJournalByIdHandler implements IQueryHandler<
  GetJournalByIdQuery,
  JournalResponse
> {
  constructor(private readonly journalRepo: JournalRepository) {}

  async execute(query: GetJournalByIdQuery): Promise<JournalResponse> {
    const { id } = query;

    const journal = await this.journalRepo.findById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    return JournalPresenter.toResponse(journal);
  }
}
