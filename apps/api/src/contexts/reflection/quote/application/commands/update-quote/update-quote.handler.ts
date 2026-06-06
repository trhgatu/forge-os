import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateQuoteCommand } from './update-quote.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { Quote } from '../../../domain/quote.entity';
import { QuoteModifiedEvent } from '../../events/quote-modified.event';

@CommandHandler(UpdateQuoteCommand)
export class UpdateQuoteHandler implements ICommandHandler<UpdateQuoteCommand, Quote> {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateQuoteCommand): Promise<Quote> {
    const { id, payload } = command;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found');

    const mappedPayload = {
      ...payload,
      content: payload.content ? new Map(Object.entries(payload.content)) : undefined,
    };

    quote.updateInfo(mappedPayload);

    await this.quoteRepo.save(quote);

    this.eventBus.publish(new QuoteModifiedEvent(id, 'update'));

    return quote;
  }
}
