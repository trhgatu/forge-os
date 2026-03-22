import { IQuery } from '@nestjs/cqrs';

export class GetRandomQuoteQuery implements IQuery {
  constructor(public readonly lang: string = 'en') {}
}
