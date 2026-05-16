import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJournalByIdQuery } from './get-journal-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { JournalRepository } from '../../../domain/journal.repository';
import { Journal } from '../../../domain/journal.entity';

@QueryHandler(GetJournalByIdQuery)
export class GetJournalByIdHandler implements IQueryHandler<GetJournalByIdQuery, Journal> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(query: GetJournalByIdQuery): Promise<Journal> {
    const { id } = query;

    const journal = await this.journalRepo.findById(id, query.userId);
    if (!journal) throw new NotFoundException('Journal not found');

    return journal;
  }
}
