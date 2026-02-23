import { MoodFilter } from './mood-filter';

export class GetAllMoodsQuery {
  constructor(public readonly filter: MoodFilter) {}
}
