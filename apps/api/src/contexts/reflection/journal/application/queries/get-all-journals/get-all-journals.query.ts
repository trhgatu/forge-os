import { QueryJournalDto } from '../../../presentation/dto';

export class GetAllJournalsQuery {
  constructor(public readonly payload: QueryJournalDto) {}
}
