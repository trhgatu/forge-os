import { QuerySportDto } from '@modules/sport/dtos';
import { SportFilter } from '../../application/queries/sport-filter';

export function mapQuerySportDtoToFilter(dto: QuerySportDto): SportFilter {
  return {
    keyword: dto.keyword,
    status: dto.status,
    isDeleted: dto.isDeleted,
    page: dto.page,
    skip: (dto.page - 1) * dto.limit,
    limit: dto.limit,
  };
}
