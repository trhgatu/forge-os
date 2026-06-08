import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/contexts/iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { WealthService } from '../../application/services/wealth.service';
import { AssetType, ExpenseCategoryType } from '@prisma/client';

@ApiTags('Wealth')
@ApiBearerAuth()
@Controller('wealth')
@UseGuards(JwtAuthGuard)
export class WealthController {
  constructor(private readonly wealthService: WealthService) {}

  @ApiOperation({ summary: 'Tạo tài khoản/ví tài chính mới' })
  @Post('accounts')
  async createAccount(
    @User('id') userId: string,
    @Body()
    data: {
      name: string;
      type: AssetType;
      balance?: number;
      currency?: string;
    },
  ) {
    return this.wealthService.createAccount(userId, data);
  }

  @ApiOperation({ summary: 'Lấy tất cả tài khoản tài chính của người dùng hiện tại' })
  @Get('accounts')
  async getAccounts(@User('id') userId: string) {
    return this.wealthService.getAccounts(userId);
  }

  @ApiOperation({ summary: 'Xóa tài khoản tài chính' })
  @Delete('accounts/:id')
  async deleteAccount(@User('id') userId: string, @Param('id') id: string) {
    return this.wealthService.deleteAccount(userId, id);
  }

  @ApiOperation({ summary: 'Ghi nhận giao dịch thu/chi/chuyển khoản mới' })
  @Post('transactions')
  async createTransaction(
    @User('id') userId: string,
    @Body()
    data: {
      accountId: string;
      type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
      amount: number;
      category: string;
      categoryType: ExpenseCategoryType;
      description?: string;
      reflection?: string;
      isApprovedByWill?: boolean;
    },
  ) {
    return this.wealthService.createTransaction(userId, data);
  }

  @ApiOperation({ summary: 'Lấy lịch sử giao dịch tài chính của người dùng' })
  @Get('transactions')
  async getTransactions(
    @User('id') userId: string,
    @Query('accountId') accountId?: string,
    @Query('type') type?: string,
    @Query('categoryType') categoryType?: ExpenseCategoryType,
  ) {
    return this.wealthService.getTransactions(userId, { accountId, type, categoryType });
  }

  @ApiOperation({ summary: 'Xóa một giao dịch tài chính (hoàn tác số dư)' })
  @Delete('transactions/:id')
  async deleteTransaction(@User('id') userId: string, @Param('id') id: string) {
    return this.wealthService.deleteTransaction(userId, id);
  }

  @ApiOperation({ summary: 'Cập nhật phản tỉnh cho giao dịch tài chính' })
  @Patch('transactions/:id/reflection')
  async updateTransactionReflection(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body('reflection') reflection: string,
  ) {
    return this.wealthService.updateTransactionReflection(userId, id, reflection);
  }

  @ApiOperation({ summary: 'Thiết lập hoặc cập nhật hạn mức ngân sách' })
  @Post('budgets')
  async createOrUpdateBudget(
    @User('id') userId: string,
    @Body()
    data: {
      categoryType: ExpenseCategoryType;
      limitAmount: number;
      period?: string;
      startDate: string;
      endDate: string;
    },
  ) {
    return this.wealthService.createOrUpdateBudget(userId, {
      categoryType: data.categoryType,
      limitAmount: data.limitAmount,
      period: data.period,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  }

  @ApiOperation({ summary: 'Lấy các thiết lập ngân sách của người dùng' })
  @Get('budgets')
  async getBudgets(@User('id') userId: string) {
    return this.wealthService.getBudgets(userId);
  }

  @ApiOperation({ summary: 'Xóa thiết lập ngân sách' })
  @Delete('budgets/:id')
  async deleteBudget(@User('id') userId: string, @Param('id') id: string) {
    return this.wealthService.deleteBudget(userId, id);
  }
}
