import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SoftDeleteQuoteCommand } from './soft-delete-quote.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { QuoteModifiedEvent } from '../../events/quote-modified.event';
import { Quote } from '../../../domain/quote.entity';

@CommandHandler(SoftDeleteQuoteCommand)
export class SoftDeleteQuoteHandler implements ICommandHandler<SoftDeleteQuoteCommand, Quote> {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SoftDeleteQuoteCommand): Promise<Quote> {
    const { id } = command;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found');

    quote.delete();

    await this.quoteRepo.save(quote);

    this.eventBus.publish(new QuoteModifiedEvent(id, 'soft-delete'));

    return quote;
  }
}
