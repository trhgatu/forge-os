import { IQuery } from '@nestjs/cqrs';

export class GetVitalityStatsQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
