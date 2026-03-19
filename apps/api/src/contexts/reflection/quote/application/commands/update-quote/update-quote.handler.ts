import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UpdateQuoteCommand } from '../update-quote/update-quote.command';
import { QuoteRepository } from '../../../domain/repositories/quote.repository';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';

@CommandHandler(UpdateQuoteCommand)
export class UpdateQuoteHandler implements ICommandHandler<UpdateQuoteCommand, QuoteResponse> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateQuoteCommand): Promise<QuoteResponse> {
    const { id, payload, lang } = command;
    const rawQuote = await this.quoteRepo.findById(id);
    if (!rawQuote) throw new NotFoundException(`Quote with ID ${id.value} not found to update`);
    const quote = this.publisher.mergeObjectContext(rawQuote);

    quote.updateInfo(payload);

    await this.quoteRepo.save(quote);

    quote.commit();

    return QuoteResponse.fromEntity(quote, lang);
  }
}
