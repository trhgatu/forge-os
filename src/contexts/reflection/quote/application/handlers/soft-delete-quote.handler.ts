import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SoftDeleteQuoteCommand } from '../commands/soft-delete-quote.command';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { QuoteModifiedEvent } from '../events/quote-modified.event';
import { QuotePresenter } from '../../presentation/quote.presenter';
import { QuoteResponse } from '../../presentation/dto/quote.response';

@CommandHandler(SoftDeleteQuoteCommand)
export class SoftDeleteQuoteHandler
  implements ICommandHandler<SoftDeleteQuoteCommand, QuoteResponse>
{
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SoftDeleteQuoteCommand): Promise<QuoteResponse> {
    const { id, lang } = command;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found');

    quote.delete();

    await this.quoteRepo.save(quote);

    this.eventBus.publish(new QuoteModifiedEvent(id, 'soft-delete'));

    return QuotePresenter.toResponse(quote, lang);
  }
}
