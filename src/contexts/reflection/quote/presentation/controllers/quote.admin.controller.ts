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
import {
  GetAllQuotesQuery,
  GetQuoteByIdQuery,
} from '../../application/queries';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/quotes')
export class QuoteAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_QUOTE)
  create(@Body() dto: CreateQuoteDto) {
    return this.commandBus.execute(new CreateQuoteCommand(dto));
  }

  @Get()
  @Permissions(PermissionEnum.READ_QUOTE)
  findAll(@Query() query: QueryQuoteDto, @Query('lang') lang?: string) {
    return this.queryBus.execute(new GetAllQuotesQuery(query, lang));
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_QUOTE)
  findById(@Param('id') id: string, @Query('lang') lang?: string) {
    return this.queryBus.execute(
      new GetQuoteByIdQuery(QuoteId.create(id), lang ?? 'en'),
    );
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_MEMORY)
  update(@Param('id') id: string, @Body() dto: UpdateQuoteDto) {
    return this.commandBus.execute(
      new UpdateQuoteCommand(QuoteId.create(id), dto),
    );
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_MEMORY)
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    const quoteId = QuoteId.create(id);
    return hard === 'true'
      ? this.commandBus.execute(new DeleteQuoteCommand(quoteId))
      : this.commandBus.execute(new SoftDeleteQuoteCommand(quoteId));
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_QUOTE)
  restore(@Param('id') id: string) {
    return this.commandBus.execute(new RestoreQuoteCommand(QuoteId.create(id)));
  }
}
