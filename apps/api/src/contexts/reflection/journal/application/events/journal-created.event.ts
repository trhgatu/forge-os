import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class JournalCreatedEvent {
  constructor(public readonly id: JournalId) {}
}
