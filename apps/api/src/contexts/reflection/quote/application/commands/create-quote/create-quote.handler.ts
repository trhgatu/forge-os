import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateQuoteCommand } from './create-quote.command';
import { QuoteRepository } from '../../../domain/repositories/quote.repository';
import { IdGenerator } from '@shared/application/ports/id-generator.port';
import { Quote } from '../../../domain/entities/quote.entity';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';
import { QuoteId } from '../../../domain/value-objects/quote-id.vo';

@CommandHandler(CreateQuoteCommand)
export class CreateQuoteHandler implements ICommandHandler<CreateQuoteCommand, QuoteResponse> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly publisher: EventPublisher,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(command: CreateQuoteCommand): Promise<QuoteResponse> {
    const { payload, lang } = command;

    const rawId = this.idGenerator.generate();
    const quoteId = QuoteId.create(rawId);

    const quote = this.publisher.mergeObjectContext(Quote.create(quoteId, payload));

    await this.quoteRepo.save(quote);
    quote.commit();

    return QuoteResponse.fromEntity(quote, lang);
  }
}
