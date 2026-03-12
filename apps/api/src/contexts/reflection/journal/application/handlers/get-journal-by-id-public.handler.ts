import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetJournalByIdForPublicQuery } from '../queries/get-journal-by-id-public.query';
import { JournalRepository } from '../../application/ports/journal.repository';
import { Journal } from '../../domain/journal.entity';

@QueryHandler(GetJournalByIdForPublicQuery)
export class GetJournalByIdForPublicHandler implements IQueryHandler<GetJournalByIdForPublicQuery> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepository: JournalRepository,
  ) {}

  async execute(query: GetJournalByIdForPublicQuery): Promise<Journal> {
    const { id } = query;

    const journal = await this.journalRepository.findById(id);

    if (!journal || journal.isJournalDeleted) {
      throw new NotFoundException('Journal not found');
    }

    return journal;
  }
}
