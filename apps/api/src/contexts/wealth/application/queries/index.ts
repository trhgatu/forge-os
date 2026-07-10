export * from './get-accounts/get-accounts.query';
export * from './get-accounts/get-accounts.handler';
export * from './get-transactions/get-transactions.query';
export * from './get-transactions/get-transactions.handler';
export * from './get-budgets/get-budgets.query';
export * from './get-budgets/get-budgets.handler';
export * from './get-recurring/get-recurring.query';
export * from './get-recurring/get-recurring.handler';
export * from './get-allocation-rules/get-allocation-rules.query';
export * from './get-allocation-rules/get-allocation-rules.handler';

import { GetAccountsHandler } from './get-accounts/get-accounts.handler';
import { GetTransactionsHandler } from './get-transactions/get-transactions.handler';
import { GetBudgetsHandler } from './get-budgets/get-budgets.handler';
import { GetRecurringTransactionsHandler } from './get-recurring/get-recurring.handler';
import { GetAllocationRulesHandler } from './get-allocation-rules/get-allocation-rules.handler';

export const WealthQueryHandlers = [
  GetAccountsHandler,
  GetTransactionsHandler,
  GetBudgetsHandler,
  GetRecurringTransactionsHandler,
  GetAllocationRulesHandler,
];
