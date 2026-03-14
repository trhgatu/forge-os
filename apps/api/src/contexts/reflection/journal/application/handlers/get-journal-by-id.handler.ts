import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetJournalByIdQuery } from '../queries/get-journal-by-id.query';
import { JournalRepository } from '../../application/ports/journal.repository';
import { Journal } from '../../domain/journal.entity';

@QueryHandler(GetJournalByIdQuery)
export class GetJournalByIdHandler implements IQueryHandler<GetJournalByIdQuery> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepository: JournalRepository,
  ) {}

  async execute(query: GetJournalByIdQuery): Promise<Journal> {
    const { id } = query;

    const journal = await this.journalRepository.findById(id);
    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id.toString()} not found`);
    }

    return journal;
  }
}
