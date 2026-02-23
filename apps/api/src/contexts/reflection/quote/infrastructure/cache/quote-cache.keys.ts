import { QuoteFilter } from '../../application/queries/quote-filter';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
export class QuoteCacheKeys {
  static readonly ALL_QUOTES_PATTERN = 'quotes:*';
  static readonly PUBLIC_QUOTES_PATTERN = 'quotes:public:*';

  static GET_ALL_PUBLIC(page: number, limit: number, payload: QuoteFilter): string {
    return `quotes:public:p${page}:l${limit}:${JSON.stringify(payload)}`;
  }

  static GET_ALL_ADMIN(page: number, limit: number, payload: QuoteFilter): string {
    return `quotes:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
  }

  static GET_BY_ID(id: QuoteId) {
    return `quotes:id:${id.toString()}`;
  }
}
