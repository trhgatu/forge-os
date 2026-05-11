import { Injectable } from '@nestjs/common';
import { Journal } from '../../domain/journal.entity';
import { JournalResponse, QueryJournalDto } from '../dto';
import { JournalFilter } from '../../application/queries/journal-filter';

@Injectable()
export class JournalPresenter {
  /**
   * Map domain entity to API response DTO
   */
  toResponse(journal: Journal): JournalResponse {
    const props = journal.toPrimitives();

    return {
      id: props.id,
      title: props.title ?? '',
      content: props.content,
      mood: props.mood,
      tags: props.tags ?? [],
      type: props.type,
      status: props.status,
      source: props.source,
      relations: props.relations ?? [],
      createdAt: props.createdAt?.toISOString() ?? '',
      updatedAt: props.updatedAt?.toISOString() ?? '',
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt?.toISOString() ?? null,
    };
  }

  /**
   * Map domain entities array to API response DTOs array
   */
  toResponseArray(journals: Journal[]): JournalResponse[] {
    return journals.map((j) => this.toResponse(j));
  }

  /**
   * Map Query DTO to Application Layer Filter
   */
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
