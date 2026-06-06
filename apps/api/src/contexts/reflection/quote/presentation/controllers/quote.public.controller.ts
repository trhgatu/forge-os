import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryQuoteDto } from '../dto';
import {
  GetAllQuotesForPublicQuery,
  GetQuoteByIdForPublicQuery,
  GetDailyQuoteQuery,
  GetRandomQuoteQuery,
} from '../../application/queries';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { QueryBus } from '@nestjs/cqrs';
import { QuotePresenter } from '../presenters/quote.presenter';
import { Quote } from '../../domain/quote.entity';
import { PaginatedResult } from '@shared/types/paginated-result';

@Controller('quotes')
export class QuotePublicController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly presenter: QuotePresenter,
  ) {}

  @Get('daily')
  async getDaily(@Query('lang') lang?: string) {
    const quote = (await this.queryBus.execute(
      new GetDailyQuoteQuery(lang ?? 'en'),
    )) as Quote | null;
    return quote ? this.presenter.toResponse(quote, lang ?? 'en') : null;
  }

  @Get('random')
  async getRandom(@Query('lang') lang?: string) {
    const quote = (await this.queryBus.execute(
      new GetRandomQuoteQuery(lang ?? 'en'),
    )) as Quote | null;
    return quote ? this.presenter.toResponse(quote, lang ?? 'en') : null;
  }

  @Get()
  async findAll(@Query() query: QueryQuoteDto, @Query('lang') lang?: string) {
    const result: PaginatedResult<Quote> = await this.queryBus.execute(
      new GetAllQuotesForPublicQuery(query, lang ?? 'en'),
    );
    return {
      meta: result.meta,
      data: result.data.map((q) => this.presenter.toResponse(q, lang ?? 'en')),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Query('lang') lang?: string) {
    const quote = (await this.queryBus.execute(
      new GetQuoteByIdForPublicQuery(QuoteId.create(id), lang ?? 'en'),
    )) as Quote;
    return this.presenter.toResponse(quote, lang ?? 'en');
  }
}
