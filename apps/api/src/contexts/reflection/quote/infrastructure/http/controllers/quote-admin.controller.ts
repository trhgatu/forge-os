import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { QuoteId } from '../../../domain/value-objects/quote-id.vo';
import { CreateQuoteCommand } from '../../../application/commands/create-quote/create-quote.command';
import { UpdateQuoteCommand } from '../../../application/commands/update-quote/update-quote.command';
import { SoftDeleteQuoteCommand } from '../../../application/commands/delete-quote/soft-delete-quote.command';
import { DeleteQuoteCommand } from '../../../application/commands/delete-quote/delete-quote.command';
import { RestoreQuoteCommand } from '../../../application/commands/restore-quote/restore-quote.command';
import { GetAllQuotesQuery } from '../../../application/queries/get-all/get-all-quotes.query';
import { GetQuoteByIdQuery } from '../../../application/queries/get-by-id/get-quote-by-id.query';

import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards/jwt-auth.guard';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { ZodValidationPipe } from '@shared/insfrastructure/pipes/zod-validation.pipe';

import {
  CreateQuoteSchema,
  CreateQuoteRequest,
  UpdateQuoteRequest,
  QuoteQueryRequest,
} from '../requests';

import { QuoteResponse } from '../responses/quote.response';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/quotes')
export class QuoteAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_QUOTE)
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateQuoteSchema))
  async create(
    @Body() req: CreateQuoteRequest,
    @Query('lang') lang: string = 'en',
  ): Promise<QuoteResponse> {
    return this.commandBus.execute(new CreateQuoteCommand(req, lang));
  }

  @Get()
  @Permissions(PermissionEnum.READ_QUOTE)
  async findAll(
    @Query() query: QuoteQueryRequest,
    @Query('lang') lang: string = 'en',
  ): Promise<QuoteResponse[]> {
    return this.queryBus.execute(new GetAllQuotesQuery(query, lang));
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_QUOTE)
  async findById(
    @Param('id') id: string,
    @Query('lang') lang: string = 'en',
  ): Promise<QuoteResponse> {
    return this.queryBus.execute(new GetQuoteByIdQuery(QuoteId.create(id), lang));
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_QUOTE)
  async update(@Param('id') id: string, @Body() req: UpdateQuoteRequest): Promise<QuoteResponse> {
    return this.commandBus.execute(new UpdateQuoteCommand(QuoteId.create(id), req));
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_QUOTE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string, @Query('hard') hard?: string): Promise<void> {
    const quoteId = QuoteId.create(id);
    const command =
      hard === 'true' ? new DeleteQuoteCommand(quoteId) : new SoftDeleteQuoteCommand(quoteId);

    await this.commandBus.execute(command);
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_QUOTE)
  async restore(@Param('id') id: string): Promise<QuoteResponse> {
    return this.commandBus.execute(new RestoreQuoteCommand(QuoteId.create(id)));
  }
}
