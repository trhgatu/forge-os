import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJournalByIdForPublicQuery } from './get-journal-by-id-for-public.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { JournalRepository } from '../../../domain/journal.repository';
import { Journal } from '../../../domain/journal.entity';

@QueryHandler(GetJournalByIdForPublicQuery)
export class GetJournalByIdForPublicHandler implements IQueryHandler<GetJournalByIdForPublicQuery, Journal> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(query: GetJournalByIdForPublicQuery): Promise<Journal> {
    const { id } = query;

    const journal = await this.journalRepo.findByIdPublic(id);
    if (!journal) throw new NotFoundException('Journal not found or is private');

    return journal;
  }
}
