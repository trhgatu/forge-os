import { IQuery } from '@nestjs/cqrs';

export class GetActiveEffectsQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
