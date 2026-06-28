import { Injectable } from '@nestjs/common';
import { FinancialAccount } from '../../domain/entities/financial-account.entity';
import { FinancialTransaction } from '../../domain/entities/financial-transaction.entity';
import { RecurringTransaction } from '../../domain/entities/recurring-transaction.entity';
import { AutoAllocationRule } from '../../domain/entities/auto-allocation-rule.entity';
import { Budget } from '../../domain/entities/budget.entity';

@Injectable()
export class WealthPresenter {
  toAccountResponse(account: any): any {
    const data = typeof account.toPrimitives === 'function' ? account.toPrimitives() : account;
    return {
      id: data.id,
      userId: data.userId,
      name: data.name,
      type: data.type,
      balance: data.balance,
      currency: data.currency,
      createdAt: data.createdAt instanceof Date ? data.createdAt.toISOString() : data.createdAt,
      updatedAt: data.updatedAt instanceof Date ? data.updatedAt.toISOString() : data.updatedAt,
    };
  }

  toAccountResponseArray(accounts: FinancialAccount[]): any[] {
    return accounts.map((a) => this.toAccountResponse(a));
  }

  toTransactionResponse(tx: any): any {
    const data = typeof tx.toPrimitives === 'function' ? tx.toPrimitives() : tx;
    return {
      id: data.id,
      userId: data.userId,
      accountId: data.accountId,
      type: data.type,
      amount: data.amount,
      category: data.category,
      categoryType: data.categoryType,
      description: data.description,
      reflection: data.reflection,
      isApprovedByWill: data.isApprovedByWill,
      loggedAt: data.loggedAt instanceof Date ? data.loggedAt.toISOString() : data.loggedAt,
      createdAt: data.createdAt instanceof Date ? data.createdAt.toISOString() : data.createdAt,
    };
  }

  toTransactionResponseArray(transactions: FinancialTransaction[]): any[] {
    return transactions.map((t) => this.toTransactionResponse(t));
  }

  toRecurringResponse(rec: any): any {
    const data = typeof rec.toPrimitives === 'function' ? rec.toPrimitives() : rec;
    return {
      id: data.id,
      userId: data.userId,
      accountId: data.accountId,
      type: data.type,
      amount: data.amount,
      category: data.category,
      categoryType: data.categoryType,
      description: data.description,
      dayOfMonth: data.dayOfMonth,
      isActive: data.isActive,
      createdAt: data.createdAt instanceof Date ? data.createdAt.toISOString() : data.createdAt,
      updatedAt: data.updatedAt instanceof Date ? data.updatedAt.toISOString() : data.updatedAt,
      account: data.account,
    };
  }

  toRecurringResponseArray(recs: RecurringTransaction[]): any[] {
    return recs.map((r) => this.toRecurringResponse(r));
  }

  toAllocationResponse(rule: any): any {
    const data = typeof rule.toPrimitives === 'function' ? rule.toPrimitives() : rule;
    return {
      id: data.id,
      userId: data.userId,
      sourceAccountId: data.sourceAccountId,
      targetAccountId: data.targetAccountId,
      percentage: data.percentage,
      isActive: data.isActive,
      createdAt: data.createdAt instanceof Date ? data.createdAt.toISOString() : data.createdAt,
      updatedAt: data.updatedAt instanceof Date ? data.updatedAt.toISOString() : data.updatedAt,
    };
  }

  toAllocationResponseArray(rules: AutoAllocationRule[]): any[] {
    return rules.map((r) => this.toAllocationResponse(r));
  }

  toBudgetResponse(budget: any): any {
    const data = typeof budget.toPrimitives === 'function' ? budget.toPrimitives() : budget;
    return {
      id: data.id,
      userId: data.userId,
      categoryType: data.categoryType,
      limitAmount: data.limitAmount,
      spentAmount: data.spentAmount,
      period: data.period,
      startDate: data.startDate instanceof Date ? data.startDate.toISOString() : data.startDate,
      endDate: data.endDate instanceof Date ? data.endDate.toISOString() : data.endDate,
      createdAt: data.createdAt instanceof Date ? data.createdAt.toISOString() : data.createdAt,
      updatedAt: data.updatedAt instanceof Date ? data.updatedAt.toISOString() : data.updatedAt,
    };
  }

  toBudgetResponseArray(budgets: Budget[]): any[] {
    return budgets.map((b) => this.toBudgetResponse(b));
  }
}
