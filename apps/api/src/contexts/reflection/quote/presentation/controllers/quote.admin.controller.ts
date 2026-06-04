import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateQuoteDto, UpdateQuoteDto, QueryQuoteDto } from '../dto';
import {
  CreateQuoteCommand,
  UpdateQuoteCommand,
  DeleteQuoteCommand,
  SoftDeleteQuoteCommand,
  RestoreQuoteCommand,
} from '../../application/commands';
import { GetAllQuotesQuery, GetQuoteByIdQuery } from '../../application/queries';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { QuotePresenter } from '../presenters/quote.presenter';
import { Quote } from '../../domain/quote.entity';
import { PaginatedResult } from '@shared/types/paginated-result';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/quotes')
export class QuoteAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_QUOTE)
  async create(@Body() dto: CreateQuoteDto, @Query('lang') lang?: string) {
    const quote = (await this.commandBus.execute(
      new CreateQuoteCommand(dto, lang ?? 'en'),
    )) as Quote;
    return QuotePresenter.toResponse(quote, lang ?? 'en');
  }

  @Get()
  @Permissions(PermissionEnum.READ_QUOTE)
  async findAll(@Query() query: QueryQuoteDto, @Query('lang') lang?: string) {
    const result: PaginatedResult<Quote> = await this.queryBus.execute(
      new GetAllQuotesQuery(query, lang ?? 'en'),
    );
    return {
      meta: result.meta,
      data: result.data.map((q) => QuotePresenter.toResponse(q, lang ?? 'en')),
    };
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_QUOTE)
  async findById(@Param('id') id: string, @Query('lang') lang?: string) {
    const quote: Quote = await this.queryBus.execute(
      new GetQuoteByIdQuery(QuoteId.create(id), lang ?? 'en'),
    );
    return QuotePresenter.toResponse(quote, lang ?? 'en');
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_MEMORY)
  async update(@Param('id') id: string, @Body() dto: UpdateQuoteDto, @Query('lang') lang?: string) {
    const quote = (await this.commandBus.execute(
      new UpdateQuoteCommand(QuoteId.create(id), dto, lang ?? 'en'),
    )) as Quote;
    return QuotePresenter.toResponse(quote, lang ?? 'en');
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_MEMORY)
  async delete(
    @Param('id') id: string,
    @Query('hard') hard?: 'true',
    @Query('lang') lang?: string,
  ) {
    const quoteId = QuoteId.create(id);
    if (hard === 'true') {
      await this.commandBus.execute(new DeleteQuoteCommand(quoteId));
      return { success: true };
    }
    const quote = (await this.commandBus.execute(
      new SoftDeleteQuoteCommand(quoteId, lang ?? 'en'),
    )) as Quote;
    return QuotePresenter.toResponse(quote, lang ?? 'en');
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_QUOTE)
  async restore(@Param('id') id: string, @Query('lang') lang?: string) {
    const quote = (await this.commandBus.execute(
      new RestoreQuoteCommand(QuoteId.create(id), lang ?? 'en'),
    )) as Quote;
    return QuotePresenter.toResponse(quote, lang ?? 'en');
  }
}
