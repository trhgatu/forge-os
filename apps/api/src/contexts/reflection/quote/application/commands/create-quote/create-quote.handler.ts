import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateQuoteCommand } from './create-quote.command';
import { Inject } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { Quote } from '../../../domain/quote.entity';
import { QuoteId } from '../../../domain/value-objects/quote-id.vo';
import { QuoteModifiedEvent } from '../../events/quote-modified.event';
import { QuoteStatus } from '@shared/enums';

@CommandHandler(CreateQuoteCommand)
export class CreateQuoteHandler implements ICommandHandler<CreateQuoteCommand, Quote> {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateQuoteCommand): Promise<Quote> {
    const { payload } = command;

    const now = new Date();
    const quoteId = QuoteId.random();

    const quote = Quote.create(
      {
        ...payload,
        author: payload.author ?? 'Unknown',
        content: new Map(Object.entries(payload.content)),
        tags: payload.tags ?? [],
        status: payload.status ?? QuoteStatus.INTERNAL,
      },
      quoteId,
      now,
    );

    await this.quoteRepo.save(quote);

    this.eventBus.publish(new QuoteModifiedEvent(quoteId, 'create'));

    return quote;
  }
}
