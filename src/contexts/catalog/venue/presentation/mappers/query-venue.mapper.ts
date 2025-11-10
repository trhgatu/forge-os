import { QueryVenueDto } from '@modules/venue/dtos';
import { VenueFilter } from '../../application/queries/venue-filter';

export function mapQueryVenueDtoToFilter(dto: QueryVenueDto): VenueFilter {
  return {
    keyword: dto.keyword,
    status: dto.status,
    sportType: dto.sportType,
    isDeleted: dto.isDeleted,
    page: dto.page,
    skip: (dto.page - 1) * dto.limit,
    limit: dto.limit,
  };
}
