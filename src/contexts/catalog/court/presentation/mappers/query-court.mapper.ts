import { QueryCourtDto } from '@modules/court/dtos';
import { CourtFilter } from '../../application/queries/court-filter';
import { VenueId } from '../../../venue/domain/value-objects/venue-id.vo';

export function mapQueryCourtDtoToFilter(dto: QueryCourtDto): CourtFilter {
  return {
    keyword: dto.keyword,
    status: dto.status,
    sportType: dto.sportType,
    isDeleted: dto.isDeleted,
    venueId: dto.venueId ? VenueId.create(dto.venueId) : undefined,
    page: dto.page,
    limit: dto.limit,
  };
}
