import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/contexts/iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { WealthPresenter } from '../presenters/wealth.presenter';
import {
  CreateAccountDto,
  UpdateAccountDto,
  CreateTransactionDto,
  CreateOrUpdateBudgetDto,
  CreateRecurringTransactionDto,
  UpdateRecurringTransactionDto,
  UpdateAllocationRulesDto,
} from '../dto';
import {
  CreateAccountCommand,
  UpdateAccountCommand,
  DeleteAccountCommand,
  CreateTransactionCommand,
  DeleteTransactionCommand,
  UpdateReflectionCommand,
  CreateRecurringCommand,
  DeleteRecurringCommand,
  UpdateRecurringCommand,
  CreateBudgetCommand,
  DeleteBudgetCommand,
  UpdateAllocationRulesCommand,
} from '../../application/commands';
import {
  GetAccountsQuery,
  GetTransactionsQuery,
  GetBudgetsQuery,
  GetRecurringTransactionsQuery,
  GetAllocationRulesQuery,
} from '../../application/queries';
import { ExpenseCategoryType } from '@prisma/client';

import { RecurringTransactionScheduler } from '../../infrastructure/schedulers/recurring-transaction.scheduler';

@ApiTags('Wealth')
@ApiBearerAuth()
@Controller('wealth')
@UseGuards(JwtAuthGuard)
export class WealthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly presenter: WealthPresenter,
    private readonly recurringScheduler: RecurringTransactionScheduler,
  ) {}

  @ApiOperation({ summary: 'Tạo tài khoản/ví tài chính mới' })
  @Post('accounts')
  async createAccount(@User('id') userId: string, @Body() dto: CreateAccountDto) {
    const account = await this.commandBus.execute(new CreateAccountCommand({ ...dto, userId }));
    return { success: true, data: this.presenter.toAccountResponse(account) };
  }

  @ApiOperation({ summary: 'Lấy tất cả tài khoản tài chính của người dùng hiện tại' })
  @Get('accounts')
  async getAccounts(@User('id') userId: string) {
    const accounts = await this.queryBus.execute(new GetAccountsQuery(userId));
    return { success: true, data: this.presenter.toAccountResponseArray(accounts) };
  }

  @ApiOperation({ summary: 'Xóa tài khoản tài chính' })
  @Delete('accounts/:id')
  async deleteAccount(@User('id') userId: string, @Param('id') id: string) {
    return this.commandBus.execute(new DeleteAccountCommand(id, userId));
  }

  @ApiOperation({ summary: 'Cập nhật tài khoản tài chính' })
  @Patch('accounts/:id')
  async updateAccount(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateAccountDto,
  ) {
    const account = await this.commandBus.execute(new UpdateAccountCommand({ ...dto, id, userId }));
    return { success: true, data: this.presenter.toAccountResponse(account) };
  }

  @ApiOperation({ summary: 'Ghi nhận giao dịch thu/chi/chuyển khoản mới' })
  @Post('transactions')
  async createTransaction(@User('id') userId: string, @Body() dto: CreateTransactionDto) {
    const transaction = await this.commandBus.execute(
      new CreateTransactionCommand({ ...dto, userId }),
    );
    return { success: true, data: this.presenter.toTransactionResponse(transaction) };
  }

  @ApiOperation({ summary: 'Lấy lịch sử giao dịch tài chính của người dùng' })
  @Get('transactions')
  async getTransactions(
    @User('id') userId: string,
    @Query('accountId') accountId?: string,
    @Query('type') type?: string,
    @Query('categoryType') categoryType?: ExpenseCategoryType,
  ) {
    const transactions = await this.queryBus.execute(
      new GetTransactionsQuery(userId, { accountId, type, categoryType }),
    );
    return { success: true, data: this.presenter.toTransactionResponseArray(transactions) };
  }

  @ApiOperation({ summary: 'Xóa một giao dịch tài chính (hoàn tác số dư)' })
  @Delete('transactions/:id')
  async deleteTransaction(@User('id') userId: string, @Param('id') id: string) {
    return this.commandBus.execute(new DeleteTransactionCommand(id, userId));
  }

  @ApiOperation({ summary: 'Cập nhật phản tỉnh cho giao dịch tài chính' })
  @Patch('transactions/:id/reflection')
  async updateTransactionReflection(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body('reflection') reflection: string,
  ) {
    const transaction = await this.commandBus.execute(
      new UpdateReflectionCommand(id, userId, reflection),
    );
    return { success: true, data: this.presenter.toTransactionResponse(transaction) };
  }

  @ApiOperation({ summary: 'Thiết lập hoặc cập nhật hạn mức ngân sách' })
  @Post('budgets')
  async createOrUpdateBudget(@User('id') userId: string, @Body() dto: CreateOrUpdateBudgetDto) {
    const budget = await this.commandBus.execute(
      new CreateBudgetCommand({
        ...dto,
        userId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      }),
    );
    return { success: true, data: this.presenter.toBudgetResponse(budget) };
  }

  @ApiOperation({ summary: 'Lấy các thiết lập ngân sách của người dùng' })
  @Get('budgets')
  async getBudgets(@User('id') userId: string) {
    const budgets = await this.queryBus.execute(new GetBudgetsQuery(userId));
    return { success: true, data: this.presenter.toBudgetResponseArray(budgets) };
  }

  @ApiOperation({ summary: 'Xóa thiết lập ngân sách' })
  @Delete('budgets/:id')
  async deleteBudget(@User('id') userId: string, @Param('id') id: string) {
    return this.commandBus.execute(new DeleteBudgetCommand(id, userId));
  }

  @ApiOperation({ summary: 'Tạo cấu hình giao dịch định kỳ' })
  @Post('recurring')
  async createRecurringTransaction(
    @User('id') userId: string,
    @Body() dto: CreateRecurringTransactionDto,
  ) {
    const rec = await this.commandBus.execute(new CreateRecurringCommand({ ...dto, userId }));
    return { success: true, data: this.presenter.toRecurringResponse(rec) };
  }

  @ApiOperation({ summary: 'Lấy các giao dịch định kỳ của người dùng' })
  @Get('recurring')
  async getRecurringTransactions(@User('id') userId: string) {
    const recs = await this.queryBus.execute(new GetRecurringTransactionsQuery(userId));
    return { success: true, data: this.presenter.toRecurringResponseArray(recs) };
  }

  @ApiOperation({ summary: 'Xóa giao dịch định kỳ' })
  @Delete('recurring/:id')
  async deleteRecurringTransaction(@User('id') userId: string, @Param('id') id: string) {
    return this.commandBus.execute(new DeleteRecurringCommand(id, userId));
  }

  @ApiOperation({ summary: 'Cập nhật cấu hình giao dịch định kỳ' })
  @Patch('recurring/:id')
  async updateRecurringTransaction(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateRecurringTransactionDto,
  ) {
    const rec = await this.commandBus.execute(new UpdateRecurringCommand({ ...dto, id, userId }));
    return { success: true, data: this.presenter.toRecurringResponse(rec) };
  }

  @ApiOperation({ summary: 'Cấu hình ma trận phân bổ tự động' })
  @Put('allocation-rules')
  async updateAllocationRules(@User('id') userId: string, @Body() dto: UpdateAllocationRulesDto) {
    const rules = await this.commandBus.execute(
      new UpdateAllocationRulesCommand({ ...dto, userId }),
    );
    return { success: true, data: this.presenter.toAllocationResponseArray(rules) };
  }

  @ApiOperation({ summary: 'Lấy danh sách các quy tắc phân bổ tự động' })
  @Get('allocation-rules')
  async getAllocationRules(@User('id') userId: string) {
    const rules = await this.queryBus.execute(new GetAllocationRulesQuery(userId));
    return { success: true, data: this.presenter.toAllocationResponseArray(rules) };
  }

  @ApiOperation({ summary: 'Kích hoạt quét và xử lý thu nhập định kỳ ngay lập tức' })
  @Post('recurring/process-today')
  async triggerRecurringTransactionsManually() {
    await this.recurringScheduler.handleRecurringInflows();
    return { success: true, message: 'Đã kích hoạt quét và xử lý thu nhập định kỳ thành công.' };
  }
}
