import { QueryQuoteDto } from '../dto';
import { QuoteFilter } from '../../application/queries/quote-filter';

export function mapQueryQuoteDtoToFilter(dto: QueryQuoteDto): QuoteFilter {
  return {
    keyword: dto.keyword,
    status: dto.status,
    source: dto.source,
    author: dto.author,
    tags: dto.tags,
    isDeleted: dto.isDeleted,
    page: dto.page,
    limit: dto.limit,
  };
}
