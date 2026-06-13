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
