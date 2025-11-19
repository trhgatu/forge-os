import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class RestoreJournalCommand {
  constructor(public readonly id: JournalId) {}
}
