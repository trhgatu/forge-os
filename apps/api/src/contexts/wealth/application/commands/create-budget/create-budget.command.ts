import { ExpenseCategoryType } from '@prisma/client';

export interface CreateBudgetPayload {
  userId: string;
  categoryType: ExpenseCategoryType;
  limitAmount: number;
  period?: string;
  startDate: Date;
  endDate: Date;
}

export class CreateBudgetCommand {
  constructor(public readonly payload: CreateBudgetPayload) {}
}
