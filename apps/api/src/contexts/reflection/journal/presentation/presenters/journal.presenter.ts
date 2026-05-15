import { Injectable } from '@nestjs/common';
import { Journal } from '../../domain/journal.entity';
import { JournalResponse, QueryJournalDto } from '../dto';
import { JournalFilter } from '../../application/queries/journal-filter';

@Injectable()
export class JournalPresenter {
  toResponse(journal: any): JournalResponse {
    const data = typeof journal.toPrimitives === 'function' ? journal.toPrimitives() : journal;

    return {
      id: String(data.id),
      title: data.title ?? '',
      content: data.content,
      mood: data.mood,
      tags: data.tags ?? [],
      type: data.type,
      status: data.status,
      source: data.source,
      relations: data.relations ?? [],
      createdAt:
        data.createdAt instanceof Date ? data.createdAt.toISOString() : (data.createdAt ?? ''),
      updatedAt:
        data.updatedAt instanceof Date ? data.updatedAt.toISOString() : (data.updatedAt ?? ''),
      isDeleted: data.isDeleted,
      analysis: data.analysis,
      deletedAt:
        data.deletedAt instanceof Date ? data.deletedAt.toISOString() : (data.deletedAt ?? null),
    };
  }
  toResponseArray(journals: Journal[]): JournalResponse[] {
    return journals.map((j) => this.toResponse(j));
  }
  toFilter(dto: QueryJournalDto): JournalFilter {
    return {
      keyword: dto.keyword,
      status: dto.status,
      mood: dto.mood,
      tags: dto.tags,
      isDeleted: dto.isDeleted,
      page: dto.page,
      limit: dto.limit,
    };
  }
}
