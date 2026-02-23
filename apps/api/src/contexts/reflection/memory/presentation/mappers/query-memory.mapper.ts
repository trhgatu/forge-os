import { QueryMemoryDto } from '../dto';
import { MemoryFilter } from '../../application/queries/memory-filter';

export function mapQueryMemoryDtoToFilter(dto: QueryMemoryDto): MemoryFilter {
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
