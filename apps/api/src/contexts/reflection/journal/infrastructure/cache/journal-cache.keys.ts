import { JournalFilter } from '../../application/queries/journal-filter';
import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class JournalCacheKeys {
  static GET_ALL_PUBLIC(
    version: string,
    page: number,
    limit: number,
    payload: JournalFilter,
  ): string {
    return `journals:v${version}:public:p${page}:l${limit}:${JSON.stringify(payload)}`;
  }

  static GET_ALL_ADMIN(
    version: string,
    page: number,
    limit: number,
    payload: JournalFilter,
  ): string {
    return `journals:v${version}:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
  }

  static GET_BY_ID(id: JournalId | string) {
    return `journals:id:${id.toString()}`;
  }
}
