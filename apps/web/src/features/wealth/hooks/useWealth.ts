import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useLanguage } from '@/contexts/LanguageContext';
import { forgeToast } from '@/shared/lib/toast';

import { wealthService } from '../services/wealthService';

export const useWealthAccounts = () => {
  return useQuery({
    queryKey: ['wealth-accounts'],
    queryFn: () => wealthService.getAccounts(),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useWealthTransactions = (filters?: {
  accountId?: string;
  type?: string;
  categoryType?: string;
}) => {
  return useQuery({
    queryKey: ['wealth-transactions', filters],
    queryFn: () => wealthService.getTransactions(filters),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useWealthBudgets = () => {
  return useQuery({
    queryKey: ['wealth-budgets'],
    queryFn: () => wealthService.getBudgets(),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useCreateWealthAccount = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: (data: {
      name: string;
      type: 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND';
      balance?: number;
      currency?: string;
    }) => wealthService.createAccount(data),
    onSuccess: () => {
      toast.success(t('wealth.toast_acc_success'));
      queryClient.invalidateQueries({ queryKey: ['wealth-accounts'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('wealth.toast_acc_error'));
    },
  });
};

export const useDeleteWealthAccount = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: (id: string) => wealthService.deleteAccount(id),
    onSuccess: () => {
      toast.success(t('wealth.toast_acc_delete_success') || 'Bể chứa đã được giải trừ');
      queryClient.invalidateQueries({ queryKey: ['wealth-accounts'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('wealth.toast_acc_delete_error') || 'Không thể giải trừ bể chứa');
    },
  });
};

export const useUpdateWealthAccount = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        type?: 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND';
        balance?: number;
      };
    }) => wealthService.updateAccount(id, data),
    onSuccess: () => {
      toast.success(t('wealth.toast_acc_update_success') || 'Bể chứa đã được hiệu chuẩn');
      queryClient.invalidateQueries({ queryKey: ['wealth-accounts'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('wealth.toast_acc_update_error') || 'Không thể hiệu chuẩn bể chứa');
    },
  });
};

export const useCreateWealthTransaction = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: (data: {
      accountId: string;
      type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
      amount: number;
      category: string;
      categoryType: 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE';
      description?: string;
      reflection?: string;
      isApprovedByWill?: boolean;
    }) => wealthService.createTransaction(data),
    onSuccess: (res, variables) => {
      toast.success(t('wealth.toast_tx_success'));
      queryClient.invalidateQueries({ queryKey: ['wealth-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wealth-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['wealth-budgets'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('wealth.toast_tx_error'));
    },
  });
};

export const useDeleteWealthTransaction = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: (id: string) => wealthService.deleteTransaction(id),
    onSuccess: () => {
      toast.success(t('wealth.toast_delete_success'));
      queryClient.invalidateQueries({ queryKey: ['wealth-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wealth-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['wealth-budgets'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('wealth.toast_delete_error'));
    },
  });
};

export const useUpdateWealthTransactionReflection = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: ({ id, reflection }: { id: string; reflection: string }) =>
      wealthService.updateTransactionReflection(id, reflection),
    onSuccess: () => {
      toast.success(t('wealth.toast_reflect_success'));
      queryClient.invalidateQueries({ queryKey: ['wealth-transactions'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('wealth.toast_tx_error'));
    },
  });
};

// Recurring Transactions Hooks
export const useWealthRecurring = () => {
  return useQuery({
    queryKey: ['wealth-recurring'],
    queryFn: () => wealthService.getRecurringTransactions(),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useCreateRecurringTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      accountId: string;
      type: 'INCOME' | 'EXPENSE';
      amount: number;
      category: string;
      categoryType: 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE';
      description?: string;
      dayOfMonth: number;
    }) => wealthService.createRecurringTransaction(data),
    onSuccess: () => {
      toast.success('Đã lưu thiết lập giao dịch định kỳ thành công.');
      queryClient.invalidateQueries({ queryKey: ['wealth-recurring'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Không thể tạo thiết lập giao dịch định kỳ.');
    },
  });
};

export const useDeleteRecurringTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => wealthService.deleteRecurringTransaction(id),
    onSuccess: () => {
      toast.success('Đã xóa thiết lập giao dịch định kỳ.');
      queryClient.invalidateQueries({ queryKey: ['wealth-recurring'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Lỗi khi xóa giao dịch định kỳ.');
    },
  });
};

export const useUpdateRecurringTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        accountId?: string;
        type?: 'INCOME' | 'EXPENSE';
        amount?: number;
        category?: string;
        categoryType?: 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE';
        description?: string;
        dayOfMonth?: number;
        isActive?: boolean;
      };
    }) => wealthService.updateRecurringTransaction(id, data),
    onSuccess: () => {
      toast.success('Đã cập nhật thiết lập giao dịch định kỳ thành công.');
      queryClient.invalidateQueries({ queryKey: ['wealth-recurring'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Không thể cập nhật thiết lập giao dịch định kỳ.');
    },
  });
};

// Auto-Allocation Rules Hooks
export const useWealthAllocationRules = () => {
  return useQuery({
    queryKey: ['wealth-allocation-rules'],
    queryFn: () => wealthService.getAllocationRules(),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useUpdateAllocationRules = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      sourceAccountId: string;
      rules: { targetAccountId: string; percentage: number }[];
    }) => wealthService.updateAllocationRules(data),
    onSuccess: () => {
      toast.success('Đã cập nhật quy tắc phân bổ dòng tiền tự động.');
      queryClient.invalidateQueries({ queryKey: ['wealth-allocation-rules'] });
      queryClient.invalidateQueries({ queryKey: ['wealth-accounts'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Lỗi khi lưu quy tắc phân bổ tự động.');
    },
  });
};

