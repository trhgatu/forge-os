import { apiClient } from '@/services/apiClient';

export interface BackendResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface FinancialAccountDto {
  id: string;
  name: string;
  type: 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND';
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialTransactionDto {
  id: string;
  accountId: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  amount: number;
  category: string;
  categoryType: 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE';
  description?: string;
  reflection?: string;
  isApprovedByWill: boolean;
  loggedAt: string;
  createdAt: string;
  account?: {
    name: string;
    type: string;
  };
}

export interface FinancialBudgetDto {
  id: string;
  categoryType: 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE';
  limitAmount: number;
  spentAmount: number;
  period: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export const wealthService = {
  // Accounts
  getAccounts: async (): Promise<FinancialAccountDto[]> => {
    const res = await apiClient.get<BackendResponse<FinancialAccountDto[]>>('/wealth/accounts');
    return res.data.data;
  },

  createAccount: async (data: {
    name: string;
    type: 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND';
    balance?: number;
    currency?: string;
  }): Promise<FinancialAccountDto> => {
    const res = await apiClient.post<BackendResponse<FinancialAccountDto>>('/wealth/accounts', data);
    return res.data.data;
  },

  deleteAccount: async (id: string): Promise<void> => {
    await apiClient.delete(`/wealth/accounts/${id}`);
  },

  // Transactions
  getTransactions: async (filters?: {
    accountId?: string;
    type?: string;
    categoryType?: string;
  }): Promise<FinancialTransactionDto[]> => {
    const params = filters ? new URLSearchParams(filters as any).toString() : '';
    const res = await apiClient.get<BackendResponse<FinancialTransactionDto[]>>(
      `/wealth/transactions${params ? `?${params}` : ''}`,
    );
    return res.data.data;
  },

  createTransaction: async (data: {
    accountId: string;
    type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    amount: number;
    category: string;
    categoryType: 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE';
    description?: string;
    reflection?: string;
    isApprovedByWill?: boolean;
  }): Promise<FinancialTransactionDto> => {
    const res = await apiClient.post<BackendResponse<FinancialTransactionDto>>('/wealth/transactions', data);
    return res.data.data;
  },

  deleteTransaction: async (id: string): Promise<void> => {
    await apiClient.delete(`/wealth/transactions/${id}`);
  },

  updateTransactionReflection: async (id: string, reflection: string): Promise<FinancialTransactionDto> => {
    const res = await apiClient.patch<BackendResponse<FinancialTransactionDto>>(
      `/wealth/transactions/${id}/reflection`,
      { reflection },
    );
    return res.data.data;
  },

  // Budgets
  getBudgets: async (): Promise<FinancialBudgetDto[]> => {
    const res = await apiClient.get<BackendResponse<FinancialBudgetDto[]>>('/wealth/budgets');
    return res.data.data;
  },

  createOrUpdateBudget: async (data: {
    categoryType: 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE';
    limitAmount: number;
    period?: string;
    startDate: string;
    endDate: string;
  }): Promise<FinancialBudgetDto> => {
    const res = await apiClient.post<BackendResponse<FinancialBudgetDto>>('/wealth/budgets', data);
    return res.data.data;
  },

  deleteBudget: async (id: string): Promise<void> => {
    await apiClient.delete(`/wealth/budgets/${id}`);
  },
};
