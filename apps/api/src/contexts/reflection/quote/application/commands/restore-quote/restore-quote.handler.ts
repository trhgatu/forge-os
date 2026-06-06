import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RestoreQuoteCommand } from './restore-quote.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { QuoteModifiedEvent } from '../../events/quote-modified.event';
import { Quote } from '../../../domain/quote.entity';

@CommandHandler(RestoreQuoteCommand)
export class RestoreQuoteHandler implements ICommandHandler<RestoreQuoteCommand, Quote> {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreQuoteCommand): Promise<Quote> {
    const { id } = command;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found');

    quote.restore();

    await this.quoteRepo.save(quote);

    this.eventBus.publish(new QuoteModifiedEvent(id, 'restore'));

    return quote;
  }
}
