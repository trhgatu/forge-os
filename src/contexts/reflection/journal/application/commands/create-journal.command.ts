import { CreateJournalDto } from '../../presentation/dto/create-journal.dto';

export class CreateJournalCommand {
  constructor(public readonly payload: CreateJournalDto) {}
}
