import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class DeleteJournalCommand {
  constructor(public readonly id: JournalId) {}
}
