import { JournalFilter } from '../../application/queries/journal-filter';
import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class JournalCacheKeys {
  static readonly ALL_JOURNALS_PATTERN = 'journals:*';
  static readonly PUBLIC_JOURNALS_PATTERN = 'journals:public:*';

  static GET_ALL_PUBLIC(page: number, limit: number, payload: JournalFilter): string {
    return `journals:public:p${page}:l${limit}:${JSON.stringify(payload)}`;
  }

  static GET_ALL_ADMIN(page: number, limit: number, payload: JournalFilter): string {
    return `journals:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
  }

  static GET_BY_ID(id: JournalId) {
    return `journals:id:${id.toString()}`;
  }
}
