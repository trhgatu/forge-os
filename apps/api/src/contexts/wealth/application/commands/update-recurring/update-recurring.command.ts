import { ExpenseCategoryType } from '@prisma/client';

export interface UpdateRecurringPayload {
  userId: string;
  id: string;
  accountId?: string;
  type?: 'INCOME' | 'EXPENSE';
  amount?: number;
  category?: string;
  categoryType?: ExpenseCategoryType;
  description?: string;
  dayOfMonth?: number;
  isActive?: boolean;
}

export class UpdateRecurringCommand {
  constructor(public readonly payload: UpdateRecurringPayload) {}
}
