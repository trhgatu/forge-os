import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateQuoteCommand } from '../commands/update-quote.command';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { NotFoundException } from '@nestjs/common';
import { QuoteModifiedEvent } from '../events/quote-modified.event';
import { QuotePresenter } from '../../presentation/quote.presenter';
import { QuoteResponse } from '../../presentation/dto/quote.response';

@CommandHandler(UpdateQuoteCommand)
export class UpdateQuoteHandler implements ICommandHandler<
  UpdateQuoteCommand,
  QuoteResponse
> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateQuoteCommand): Promise<QuoteResponse> {
    const { id, payload, lang } = command;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found');

    const mappedPayload = {
      ...payload,
      content: payload.content
        ? new Map(Object.entries(payload.content))
        : undefined,
    };

    quote.updateInfo(mappedPayload);

    await this.quoteRepo.save(quote);

    this.eventBus.publish(new QuoteModifiedEvent(id, 'update'));

    return QuotePresenter.toResponse(quote, lang);
  }
}
