import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RestoreQuoteCommand } from '../commands/restore-quote.command';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { NotFoundException } from '@nestjs/common';
import { QuoteModifiedEvent } from '../events/quote-modified.event';
import { QuotePresenter } from '../../presentation/quote.presenter';
import { QuoteResponse } from '../../presentation/dto/quote.response';

@CommandHandler(RestoreQuoteCommand)
export class RestoreQuoteHandler implements ICommandHandler<
  RestoreQuoteCommand,
  QuoteResponse
> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreQuoteCommand): Promise<QuoteResponse> {
    const { id, lang } = command;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found');

    quote.restore();

    await this.quoteRepo.save(quote);

    this.eventBus.publish(new QuoteModifiedEvent(id, 'restore'));

    return QuotePresenter.toResponse(quote, lang);
  }
}
