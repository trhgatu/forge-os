import {
  FinancialAccount as PrismaFinancialAccount,
  FinancialTransaction as PrismaFinancialTransaction,
  RecurringTransaction as PrismaRecurringTransaction,
  AutoAllocationRule as PrismaAutoAllocationRule,
  FinancialBudget as PrismaFinancialBudget,
} from '@prisma/client';
import { FinancialAccount } from '../../domain/entities/financial-account.entity';
import { FinancialTransaction } from '../../domain/entities/financial-transaction.entity';
import { RecurringTransaction } from '../../domain/entities/recurring-transaction.entity';
import { AutoAllocationRule } from '../../domain/entities/auto-allocation-rule.entity';
import { Budget } from '../../domain/entities/budget.entity';

export class WealthMapper {
  static toAccountDomain(doc: PrismaFinancialAccount): FinancialAccount | null {
    if (!doc) return null;
    return FinancialAccount.createFromPersistence(
      {
        userId: doc.userId,
        name: doc.name,
        type: doc.type,
        balance: Number(doc.balance),
        currency: doc.currency,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
    );
  }

  static toAccountPersistence(entity: FinancialAccount): any {
    const props = entity.toPrimitives();
    return {
      id: props.id,
      userId: props.userId,
      name: props.name,
      type: props.type,
      balance: props.balance,
      currency: props.currency,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  // Transactions
  static toTransactionDomain(doc: PrismaFinancialTransaction): FinancialTransaction | null {
    if (!doc) return null;
    return FinancialTransaction.createFromPersistence(
      {
        userId: doc.userId,
        accountId: doc.accountId,
        type: doc.type as any,
        amount: Number(doc.amount),
        category: doc.category,
        categoryType: doc.categoryType,
        description: doc.description ?? undefined,
        reflection: doc.reflection ?? undefined,
        isApprovedByWill: doc.isApprovedByWill,
        loggedAt: doc.loggedAt,
        createdAt: doc.createdAt,
      },
      doc.id,
    );
  }

  static toTransactionPersistence(entity: FinancialTransaction): any {
    const props = entity.toPrimitives();
    return {
      id: props.id,
      userId: props.userId,
      accountId: props.accountId,
      type: props.type,
      amount: props.amount,
      category: props.category,
      categoryType: props.categoryType,
      description: props.description ?? null,
      reflection: props.reflection ?? null,
      isApprovedByWill: props.isApprovedByWill,
      loggedAt: props.loggedAt,
      createdAt: props.createdAt,
    };
  }

  // Recurring Transactions
  static toRecurringDomain(doc: PrismaRecurringTransaction): RecurringTransaction | null {
    if (!doc) return null;
    return RecurringTransaction.createFromPersistence(
      {
        userId: doc.userId,
        accountId: doc.accountId,
        type: doc.type as any,
        amount: Number(doc.amount),
        category: doc.category,
        categoryType: doc.categoryType,
        description: doc.description ?? undefined,
        dayOfMonth: doc.dayOfMonth,
        isActive: doc.isActive,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
    );
  }

  static toRecurringPersistence(entity: RecurringTransaction): any {
    const props = entity.toPrimitives();
    return {
      id: props.id,
      userId: props.userId,
      accountId: props.accountId,
      type: props.type,
      amount: props.amount,
      category: props.category,
      categoryType: props.categoryType,
      description: props.description ?? null,
      dayOfMonth: props.dayOfMonth,
      isActive: props.isActive,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  static toAllocationDomain(doc: PrismaAutoAllocationRule): AutoAllocationRule | null {
    if (!doc) return null;
    return AutoAllocationRule.createFromPersistence(
      {
        userId: doc.userId,
        sourceAccountId: doc.sourceAccountId,
        targetAccountId: doc.targetAccountId,
        percentage: Number(doc.percentage),
        isActive: doc.isActive,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
    );
  }

  static toAllocationPersistence(entity: AutoAllocationRule): any {
    const props = entity.toPrimitives();
    return {
      id: props.id,
      userId: props.userId,
      sourceAccountId: props.sourceAccountId,
      targetAccountId: props.targetAccountId,
      percentage: props.percentage,
      isActive: props.isActive,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  // Budgets
  static toBudgetDomain(doc: PrismaFinancialBudget): Budget | null {
    if (!doc) return null;
    return Budget.createFromPersistence(
      {
        userId: doc.userId,
        categoryType: doc.categoryType,
        limitAmount: Number(doc.limitAmount),
        spentAmount: Number(doc.spentAmount),
        period: doc.period,
        startDate: doc.startDate,
        endDate: doc.endDate,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
    );
  }

  static toBudgetPersistence(entity: Budget): any {
    const props = entity.toPrimitives();
    return {
      id: props.id,
      userId: props.userId,
      categoryType: props.categoryType,
      limitAmount: props.limitAmount,
      spentAmount: props.spentAmount,
      period: props.period,
      startDate: props.startDate,
      endDate: props.endDate,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
