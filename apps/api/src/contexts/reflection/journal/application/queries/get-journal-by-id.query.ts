import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class GetJournalByIdQuery {
  constructor(public readonly id: JournalId) {}
}
