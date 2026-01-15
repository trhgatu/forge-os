import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateQuoteCommand } from '../commands/create-quote.command';
import { QuoteRepository } from '../ports/quote.repository';
import { Quote } from '../../domain/quote.entity';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { QuotePresenter } from '../../presentation/quote.presenter';
import { QuoteResponse } from '../../presentation/dto/quote.response';
import { QuoteModifiedEvent } from '../events/quote-modified.event';
import { QuoteStatus } from '@shared/enums';

@CommandHandler(CreateQuoteCommand)
export class CreateQuoteHandler
  implements ICommandHandler<CreateQuoteCommand, QuoteResponse>
{
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateQuoteCommand): Promise<QuoteResponse> {
    const { payload, lang } = command;

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

    return QuotePresenter.toResponse(quote, lang);
  }
}
