import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class SoftDeleteJournalCommand {
  constructor(public readonly id: JournalId) {}
}
