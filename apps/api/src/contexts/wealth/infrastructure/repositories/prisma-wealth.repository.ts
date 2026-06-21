import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { WealthRepository } from '../../domain/wealth.repository';
import { FinancialAccount } from '../../domain/entities/financial-account.entity';
import { FinancialTransaction } from '../../domain/entities/financial-transaction.entity';
import { RecurringTransaction } from '../../domain/entities/recurring-transaction.entity';
import { AutoAllocationRule } from '../../domain/entities/auto-allocation-rule.entity';
import { Budget } from '../../domain/entities/budget.entity';
import { AccountId } from '../../domain/value-objects/account-id.vo';
import { TransactionId } from '../../domain/value-objects/transaction-id.vo';
import { RecurringTransactionId } from '../../domain/value-objects/recurring-transaction-id.vo';
import { BudgetId } from '../../domain/value-objects/budget-id.vo';
import { WealthMapper } from './wealth.mapper';
import { ExpenseCategoryType } from '@prisma/client';

@Injectable()
export class PrismaWealthRepository implements WealthRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Accounts
  async saveAccount(account: FinancialAccount): Promise<void> {
    const data = WealthMapper.toAccountPersistence(account);
    await this.prisma.financialAccount.upsert({
      where: { id: data.id },
      update: {
        name: data.name,
        type: data.type,
        balance: data.balance,
        currency: data.currency,
        updatedAt: data.updatedAt,
      },
      create: data,
    });
  }

  async findAccountById(id: AccountId, userId: string): Promise<FinancialAccount | null> {
    const record = await this.prisma.financialAccount.findFirst({
      where: { id: id.value, userId },
    });
    return record ? WealthMapper.toAccountDomain(record) : null;
  }

  async findAccountsByUserId(userId: string): Promise<FinancialAccount[]> {
    const records = await this.prisma.financialAccount.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return records.map((r) => WealthMapper.toAccountDomain(r)!).filter(Boolean);
  }

  async deleteAccount(id: AccountId): Promise<void> {
    await this.prisma.financialAccount.delete({
      where: { id: id.value },
    });
  }

  // Transactions
  async saveTransaction(transaction: FinancialTransaction): Promise<void> {
    const data = WealthMapper.toTransactionPersistence(transaction);
    await this.prisma.financialTransaction.upsert({
      where: { id: data.id },
      update: {
        reflection: data.reflection,
        isApprovedByWill: data.isApprovedByWill,
      },
      create: data,
    });
  }

  async findTransactionById(
    id: TransactionId,
    userId: string,
  ): Promise<FinancialTransaction | null> {
    const record = await this.prisma.financialTransaction.findFirst({
      where: { id: id.value, userId },
    });
    return record ? WealthMapper.toTransactionDomain(record) : null;
  }

  async findTransactions(
    userId: string,
    filters?: { accountId?: string; type?: string; categoryType?: string },
  ): Promise<FinancialTransaction[]> {
    const records = await this.prisma.financialTransaction.findMany({
      where: {
        userId,
        ...(filters?.accountId && { accountId: filters.accountId }),
        ...(filters?.type && { type: filters.type as any }),
        ...(filters?.categoryType && { categoryType: filters.categoryType as any }),
      },
      orderBy: { loggedAt: 'desc' },
      include: {
        account: {
          select: { name: true, type: true },
        },
      },
    });
    return records.map((r) => WealthMapper.toTransactionDomain(r)!).filter(Boolean);
  }

  async deleteTransaction(id: TransactionId): Promise<void> {
    await this.prisma.financialTransaction.delete({
      where: { id: id.value },
    });
  }

  // Budgets
  async saveBudget(budget: Budget): Promise<void> {
    const data = WealthMapper.toBudgetPersistence(budget);
    await this.prisma.financialBudget.upsert({
      where: { id: data.id },
      update: {
        limitAmount: data.limitAmount,
        spentAmount: data.spentAmount,
        startDate: data.startDate,
        endDate: data.endDate,
        updatedAt: data.updatedAt,
      },
      create: data,
    });
  }

  async findBudgetById(id: BudgetId, userId: string): Promise<Budget | null> {
    const record = await this.prisma.financialBudget.findFirst({
      where: { id: id.value, userId },
    });
    return record ? WealthMapper.toBudgetDomain(record) : null;
  }

  async findBudgetByCategoryType(
    userId: string,
    categoryType: ExpenseCategoryType,
  ): Promise<Budget | null> {
    const record = await this.prisma.financialBudget.findFirst({
      where: { userId, categoryType },
    });
    return record ? WealthMapper.toBudgetDomain(record) : null;
  }

  async findBudgetsByUserId(userId: string): Promise<Budget[]> {
    const records = await this.prisma.financialBudget.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
    });
    return records.map((r) => WealthMapper.toBudgetDomain(r)!).filter(Boolean);
  }

  async deleteBudget(id: BudgetId): Promise<void> {
    await this.prisma.financialBudget.delete({
      where: { id: id.value },
    });
  }

  // Recurring Transactions
  async saveRecurringTransaction(rec: RecurringTransaction): Promise<void> {
    const data = WealthMapper.toRecurringPersistence(rec);
    await this.prisma.recurringTransaction.upsert({
      where: { id: data.id },
      update: {
        isActive: data.isActive,
        updatedAt: data.updatedAt,
      },
      create: data,
    });
  }

  async findRecurringTransactionById(
    id: RecurringTransactionId,
    userId: string,
  ): Promise<RecurringTransaction | null> {
    const record = await this.prisma.recurringTransaction.findFirst({
      where: { id: id.value, userId },
    });
    return record ? WealthMapper.toRecurringDomain(record) : null;
  }

  async findRecurringTransactionsByUserId(userId: string): Promise<RecurringTransaction[]> {
    const records = await this.prisma.recurringTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return records.map((r) => WealthMapper.toRecurringDomain(r)!).filter(Boolean);
  }

  async deleteRecurringTransaction(id: RecurringTransactionId): Promise<void> {
    await this.prisma.recurringTransaction.delete({
      where: { id: id.value },
    });
  }

  // Allocation Rules
  async saveAllocationRule(rule: AutoAllocationRule): Promise<void> {
    const data = WealthMapper.toAllocationPersistence(rule);
    await this.prisma.autoAllocationRule.upsert({
      where: { id: data.id },
      update: {
        percentage: data.percentage,
        isActive: data.isActive,
        updatedAt: data.updatedAt,
      },
      create: data,
    });
  }

  async findAllocationRulesByUserId(userId: string): Promise<AutoAllocationRule[]> {
    const records = await this.prisma.autoAllocationRule.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return records.map((r) => WealthMapper.toAllocationDomain(r)!).filter(Boolean);
  }

  async findAllocationRulesBySource(
    userId: string,
    sourceAccountId: string,
  ): Promise<AutoAllocationRule[]> {
    const records = await this.prisma.autoAllocationRule.findMany({
      where: { userId, sourceAccountId },
      orderBy: { createdAt: 'desc' },
    });
    return records.map((r) => WealthMapper.toAllocationDomain(r)!).filter(Boolean);
  }

  async clearAllocationRulesBySource(userId: string, sourceAccountId: string): Promise<void> {
    await this.prisma.autoAllocationRule.deleteMany({
      where: { userId, sourceAccountId },
    });
  }
}
