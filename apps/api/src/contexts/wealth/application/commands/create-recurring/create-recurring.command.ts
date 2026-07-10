import { ExpenseCategoryType } from '@prisma/client';

export interface CreateRecurringPayload {
  userId: string;
  accountId: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: string;
  categoryType: ExpenseCategoryType;
  description?: string;
  dayOfMonth: number;
}

export class CreateRecurringCommand {
  constructor(public readonly payload: CreateRecurringPayload) {}
}
