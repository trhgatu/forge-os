import { ExpenseCategoryType } from '@prisma/client';

export interface CreateTransactionPayload {
  userId: string;
  accountId: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  amount: number;
  category: string;
  categoryType: ExpenseCategoryType;
  description?: string;
  reflection?: string;
  isApprovedByWill?: boolean;
}

export class CreateTransactionCommand {
  constructor(public readonly payload: CreateTransactionPayload) {}
}
