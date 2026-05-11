import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class JournalModifiedEvent {
  constructor(
    public readonly id: JournalId,
    public readonly action: 'create' | 'update' | 'delete' | 'restore' | 'soft-delete',
  ) {}
}
