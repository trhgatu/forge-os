import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryQuoteDto } from '../dto';
import {
  GetAllQuotesForPublicQuery,
  GetQuoteByIdForPublicQuery,
} from '../../application/queries';
import { GetRandomQuoteQuery } from '../../application/queries/get-random-quote.query';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { QueryBus } from '@nestjs/cqrs';

@Controller('quotes')
export class QuotePublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('random')
  getRandom(@Query('lang') lang?: string) {
    return this.queryBus.execute(new GetRandomQuoteQuery(lang));
  }

  @Get()
  findAll(@Query() query: QueryQuoteDto) {
    return this.queryBus.execute(new GetAllQuotesForPublicQuery(query));
  }

  @Get(':id')
  findById(@Param('id') id: string, @Query('lang') lang?: string) {
    return this.queryBus.execute(
      new GetQuoteByIdForPublicQuery(QuoteId.create(id), lang ?? 'en'),
    );
  }
}
