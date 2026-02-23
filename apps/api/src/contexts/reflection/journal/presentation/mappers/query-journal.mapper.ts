import { QueryJournalDto } from '../dto';
import { JournalFilter } from '../../application/queries/journal-filter';

export function mapQueryJournalDtoToFilter(dto: QueryJournalDto): JournalFilter {
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
