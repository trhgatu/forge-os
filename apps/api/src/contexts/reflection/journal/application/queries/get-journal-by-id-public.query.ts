import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class GetJournalByIdForPublicQuery {
  constructor(public readonly id: JournalId) {}
}
