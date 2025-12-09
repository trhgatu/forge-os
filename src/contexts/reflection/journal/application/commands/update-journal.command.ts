import { UpdateJournalDto } from '../../presentation/dto/update-journal.dto';
import { JournalId } from '../../domain/value-objects/journal-id.vo';

export class UpdateJournalCommand {
  constructor(
    public readonly id: JournalId,
    public readonly payload: UpdateJournalDto,
  ) {}
}
