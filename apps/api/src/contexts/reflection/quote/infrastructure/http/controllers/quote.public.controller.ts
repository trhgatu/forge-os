import { Controller, Get, Param, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { QuoteId } from '../../../domain/value-objects/quote-id.vo';
import { QuoteResponse } from '../responses/quote.response';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { GetAllQuotesForPublicQuery } from '../../../application/queries/get-all/get-all-quotes-for-public.query';
import { GetQuoteByIdForPublicQuery } from '../../../application/queries/get-by-id/get-quote-by-id-public.query';
import { GetDailyQuoteQuery } from '../../../application/queries/get-daily/get-daily-quote.query';
import { QuoteQueryRequest } from '../requests/query-quote.request';

@Controller('quotes')
export class QuotePublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('daily')
  @HttpCode(HttpStatus.OK)
  async getDaily(@Query('lang') lang: string = 'en'): Promise<QuoteResponse | null> {
    return this.queryBus.execute(new GetDailyQuoteQuery(lang));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QuoteQueryRequest,
    @Query('lang') lang: string = 'en',
  ): Promise<PaginatedResponse<QuoteResponse>> {
    return this.queryBus.execute(new GetAllQuotesForPublicQuery(query, lang));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id') id: string,
    @Query('lang') lang: string = 'en',
  ): Promise<QuoteResponse> {
    return this.queryBus.execute(new GetQuoteByIdForPublicQuery(QuoteId.create(id), lang));
  }
}
