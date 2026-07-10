export * from './create-account/create-account.command';
export * from './create-account/create-account.handler';
export * from './update-account/update-account.command';
export * from './update-account/update-account.handler';
export * from './delete-account/delete-account.command';
export * from './delete-account/delete-account.handler';
export * from './create-transaction/create-transaction.command';
export * from './create-transaction/create-transaction.handler';
export * from './delete-transaction/delete-transaction.command';
export * from './delete-transaction/delete-transaction.handler';
export * from './update-reflection/update-reflection.command';
export * from './update-reflection/update-reflection.handler';
export * from './create-recurring/create-recurring.command';
export * from './create-recurring/create-recurring.handler';
export * from './delete-recurring/delete-recurring.command';
export * from './delete-recurring/delete-recurring.handler';
export * from './update-recurring/update-recurring.command';
export * from './update-recurring/update-recurring.handler';
export * from './create-budget/create-budget.command';
export * from './create-budget/create-budget.handler';
export * from './delete-budget/delete-budget.command';
export * from './delete-budget/delete-budget.handler';
export * from './update-allocation-rules/update-allocation-rules.command';
export * from './update-allocation-rules/update-allocation-rules.handler';

import { CreateAccountHandler } from './create-account/create-account.handler';
import { UpdateAccountHandler } from './update-account/update-account.handler';
import { DeleteAccountHandler } from './delete-account/delete-account.handler';
import { CreateTransactionHandler } from './create-transaction/create-transaction.handler';
import { DeleteTransactionHandler } from './delete-transaction/delete-transaction.handler';
import { UpdateReflectionHandler } from './update-reflection/update-reflection.handler';
import { CreateRecurringHandler } from './create-recurring/create-recurring.handler';
import { DeleteRecurringHandler } from './delete-recurring/delete-recurring.handler';
import { UpdateRecurringHandler } from './update-recurring/update-recurring.handler';
import { CreateBudgetHandler } from './create-budget/create-budget.handler';
import { DeleteBudgetHandler } from './delete-budget/delete-budget.handler';
import { UpdateAllocationRulesHandler } from './update-allocation-rules/update-allocation-rules.handler';

export const WealthCommandHandlers = [
  CreateAccountHandler,
  UpdateAccountHandler,
  DeleteAccountHandler,
  CreateTransactionHandler,
  DeleteTransactionHandler,
  UpdateReflectionHandler,
  CreateRecurringHandler,
  DeleteRecurringHandler,
  UpdateRecurringHandler,
  CreateBudgetHandler,
  DeleteBudgetHandler,
  UpdateAllocationRulesHandler,
];
