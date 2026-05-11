import { QueryJournalDto } from '../../../presentation/dto';

export class GetAllJournalsForPublicQuery {
  constructor(public readonly payload: QueryJournalDto) {}
}
