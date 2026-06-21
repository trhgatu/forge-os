import { FinancialAccount } from './entities/financial-account.entity';
import { FinancialTransaction } from './entities/financial-transaction.entity';
import { RecurringTransaction } from './entities/recurring-transaction.entity';
import { AutoAllocationRule } from './entities/auto-allocation-rule.entity';
import { Budget } from './entities/budget.entity';
import { AccountId } from './value-objects/account-id.vo';
import { TransactionId } from './value-objects/transaction-id.vo';
import { RecurringTransactionId } from './value-objects/recurring-transaction-id.vo';
import { BudgetId } from './value-objects/budget-id.vo';
import { ExpenseCategoryType } from '@prisma/client';

export abstract class WealthRepository {
  // Accounts
  abstract saveAccount(account: FinancialAccount): Promise<void>;
  abstract findAccountById(id: AccountId, userId: string): Promise<FinancialAccount | null>;
  abstract findAccountsByUserId(userId: string): Promise<FinancialAccount[]>;
  abstract deleteAccount(id: AccountId, userId: string): Promise<void>;

  // Transactions
  abstract saveTransaction(transaction: FinancialTransaction): Promise<void>;
  abstract findTransactionById(
    id: TransactionId,
    userId: string,
  ): Promise<FinancialTransaction | null>;
  abstract findTransactions(
    userId: string,
    filters?: { accountId?: string; type?: string; categoryType?: string },
  ): Promise<FinancialTransaction[]>;
  abstract deleteTransaction(id: TransactionId, userId: string): Promise<void>;

  // Budgets
  abstract saveBudget(budget: Budget): Promise<void>;
  abstract findBudgetById(id: BudgetId, userId: string): Promise<Budget | null>;
  abstract findBudgetByCategoryType(
    userId: string,
    categoryType: ExpenseCategoryType,
  ): Promise<Budget | null>;
  abstract findBudgetsByUserId(userId: string): Promise<Budget[]>;
  abstract deleteBudget(id: BudgetId, userId: string): Promise<void>;

  // Recurring Transactions
  abstract saveRecurringTransaction(rec: RecurringTransaction): Promise<void>;
  abstract findRecurringTransactionById(
    id: RecurringTransactionId,
    userId: string,
  ): Promise<RecurringTransaction | null>;
  abstract findRecurringTransactionsByUserId(userId: string): Promise<RecurringTransaction[]>;
  abstract deleteRecurringTransaction(id: RecurringTransactionId, userId: string): Promise<void>;

  // Allocation Rules
  abstract saveAllocationRule(rule: AutoAllocationRule): Promise<void>;
  abstract findAllocationRulesByUserId(userId: string): Promise<AutoAllocationRule[]>;
  abstract findAllocationRulesBySource(
    userId: string,
    sourceAccountId: string,
  ): Promise<AutoAllocationRule[]>;
  abstract clearAllocationRulesBySource(userId: string, sourceAccountId: string): Promise<void>;
}
