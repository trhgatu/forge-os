'use client';

import React, { useState } from 'react';
import { Calendar, LayoutDashboard, Sliders } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Label, Button, Skeleton, FloatingDock } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { toast } from 'sonner';

import {
  useWealthAccounts,
  useWealthTransactions,
  useWealthBudgets,
  useCreateWealthAccount,
  useCreateWealthTransaction,
  useDeleteWealthTransaction,
  useUpdateWealthTransactionReflection,
  useDeleteWealthAccount,
  useUpdateWealthAccount,
} from '../hooks/useWealth';

// Subcomponents
import { ForgeTransactionModal } from './ForgeTransactionModal';
import { OpenReservoirModal } from './OpenReservoirModal';
import { EditReservoirModal } from './EditReservoirModal';
import { ReflectionModal } from './ReflectionModal';
import { WealthRulesTab } from './WealthRulesTab';
import { WealthDashboardTab } from './WealthDashboardTab';
import type { FinancialTransactionDto } from '../services/wealthService';

export const WealthManagement: React.FC<{ slug?: string[] }> = ({ slug }) => {
  const { t, language } = useLanguage();
  const router = useRouter();

  const activeTab = (slug?.[0] as 'dashboard' | 'rules') || 'dashboard';

  const handleTabChange = (tab: 'dashboard' | 'rules') => {
    router.push(`/forge/wealth/${tab}`);
  };

  // Modal Open states
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isAccModalOpen, setIsAccModalOpen] = useState(false);
  const [isEditAccModalOpen, setIsEditAccModalOpen] = useState(false);
  const [selectedAccountForEdit, setSelectedAccountForEdit] = useState<any | null>(null);
  const [isReflectModalOpen, setIsReflectModalOpen] = useState(false);
  const [activeTxForReflection, setActiveTxForReflection] = useState<FinancialTransactionDto | null>(null);

  // React Query Hooks
  const { data: accounts = [], isLoading: isAccLoading } = useWealthAccounts();
  const { data: transactions = [], isLoading: isTxLoading } = useWealthTransactions();
  const { data: budgets = [], isLoading: isBdgLoading } = useWealthBudgets();

  const createAccountMutation = useCreateWealthAccount();
  const updateAccountMutation = useUpdateWealthAccount();
  const deleteAccountMutation = useDeleteWealthAccount();
  const createTransactionMutation = useCreateWealthTransaction();
  const deleteTransactionMutation = useDeleteWealthTransaction();
  const updateReflectionMutation = useUpdateWealthTransactionReflection();

  const loading = isAccLoading || isTxLoading || isBdgLoading;

  // Format currencies helper
  const formatCurrency = (amount: number, currency: string = 'VND') => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Calculations
  const totalBalance = accounts.reduce((acc, curr) => acc + Number(curr.balance), 0);
  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  // Stoic allocation percentages
  const expenseByCategory = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce(
      (acc, curr) => {
        const amt = Number(curr.amount);
        acc[curr.categoryType] = (acc[curr.categoryType] || 0) + amt;
        return acc;
      },
      { ESSENTIAL: 0, COMFORT: 0, INDULGENCE: 0 } as Record<string, number>,
    );

  const totalExpenseSum = Object.values(expenseByCategory).reduce((a, b) => a + b, 0) || 1;
  const percentages = {
    ESSENTIAL: Math.round((expenseByCategory.ESSENTIAL / totalExpenseSum) * 100),
    COMFORT: Math.round((expenseByCategory.COMFORT / totalExpenseSum) * 100),
    INDULGENCE: Math.round((expenseByCategory.INDULGENCE / totalExpenseSum) * 100),
  };

  // Chart data
  const chartData = transactions
    .slice()
    .reverse()
    .reduce((acc: any[], curr) => {
      const date = new Date(curr.loggedAt).toLocaleDateString('vi-VN', {
        month: 'short',
        day: 'numeric',
      });
      const amt = Number(curr.amount);
      const existing = acc.find((item) => item.date === date);

      if (existing) {
        if (curr.type === 'INCOME') existing.income += amt;
        if (curr.type === 'EXPENSE') existing.expense += amt;
      } else {
        acc.push({
          date,
          income: curr.type === 'INCOME' ? amt : 0,
          expense: curr.type === 'EXPENSE' ? amt : 0,
        });
      }
      return acc;
    }, [])
    .slice(-7);

  // Modals Submit Handlers
  const handleCreateTransaction = async (data: any) => {
    try {
      await createTransactionMutation.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAccount = async (data: any) => {
    try {
      await createAccountMutation.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAccount = async (id: string, data: any) => {
    try {
      await updateAccountMutation.mutateAsync({ id, data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    try {
      await deleteAccountMutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveReflection = async (reflectionText: string) => {
    if (!activeTxForReflection) return;
    try {
      await updateReflectionMutation.mutateAsync({
        id: activeTxForReflection.id,
        reflection: reflectionText,
      });
      setIsReflectModalOpen(false);
      setActiveTxForReflection(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTransaction = (id: string) => {
    toast(t('wealth.delete_confirm'), {
      action: {
        label: language === 'vi' ? 'Xóa' : 'Delete',
        onClick: async () => {
          try {
            await deleteTransactionMutation.mutateAsync(id);
          } catch (error) {
            console.error('Error deleting transaction:', error);
          }
        },
      },
      cancel: {
        label: t('wealth.cancel_btn'),
        onClick: () => {},
      },
    });
  };

  const getTranslatedCategory = (cat: string) => {
    if (language === 'vi') return cat;
    const translationMap: Record<string, string> = {
      'Ăn uống': 'Dining',
      'Thuê nhà': 'Rent / Home Mortgage',
      'Di chuyển': 'Transportation',
      'Y tế': 'Medical / Health',
      'Học tập': 'Education',
      'Du lịch': 'Travel / Vacation',
      'Mua sắm': 'Shopping',
      'Thể thao': 'Sports / Gym',
      'Dịch vụ mạng': 'Subscriptions',
      'Nhậu nhẹt': 'Socializing / Beer',
      'Ăn uống xa hoa': 'Fine Dining',
      'Mua sắm bốc đồng': 'Impulsive Spending',
      'Lương': 'Salary',
      'Đầu tư': 'Investments',
    };
    return translationMap[cat] || cat;
  };

  return (
    <div className="h-full flex bg-[#030304] text-white relative overflow-hidden w-full">
      {/* MAIN CONTAINER */}
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden scrollbar-hide p-8 pb-32">
        {/* HEADER */}
        <header className="mb-10 relative group">
          <div className="mb-3 flex items-center gap-2 opacity-80">
            <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
            <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
              {t('wealth.crucible')}
            </Label>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <Label
                variant="default"
                className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3 block capitalize"
              >
                {language === 'vi' ? (
                  <>Luyện Kim <span className="text-forge-cyan">Tài Chính.</span></>
                ) : (
                  <>Wealth <span className="text-forge-cyan">Alchemy.</span></>
                )}
              </Label>
            </div>

            <div className="flex gap-3">
              <Button
                variant='outline'
                onClick={() => setIsAccModalOpen(true)}
              >
                {t('wealth.open_reservoir')}
              </Button>
              <Button
                onClick={() => setIsTxModalOpen(true)}
              >
                {t('wealth.forge_tx')}
              </Button>
            </div>
          </div>
        </header>

        {/* CONDITION TABS */}
        <div className={cn(activeTab !== 'rules' && 'hidden')}>
          <WealthRulesTab />
        </div>
        <div className={cn(activeTab !== 'dashboard' && 'hidden')}>
          <WealthDashboardTab
            isLoading={loading}
            accounts={accounts}
            transactions={transactions}
            budgets={budgets}
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            percentages={percentages}
            chartData={chartData}
            formatCurrency={formatCurrency}
            getTranslatedCategory={getTranslatedCategory}
            handleDeleteTransaction={handleDeleteTransaction}
            setActiveTxForReflection={setActiveTxForReflection}
            setIsReflectModalOpen={setIsReflectModalOpen}
            onEditAccount={(acc) => {
              setSelectedAccountForEdit(acc);
              setIsEditAccModalOpen(true);
            }}
            t={t}
            language={language}
          />
        </div>
      </div>

      <FloatingDock
        items={[
          { id: 'dashboard', label: language === 'vi' ? 'Bảng điều khiển' : 'Dashboard', icon: LayoutDashboard },
          { id: 'rules', label: language === 'vi' ? 'Cấu hình dòng tiền' : 'Flow Rules', icon: Sliders },
        ]}
        activeTab={activeTab}
        onChange={(tab) => handleTabChange(tab as 'dashboard' | 'rules')}
      />


      {/* SUBCOMPONENTS MODALS REGISTER */}
      <OpenReservoirModal
        isOpen={isAccModalOpen}
        onClose={() => setIsAccModalOpen(false)}
        onSubmit={handleCreateAccount}
      />

      <EditReservoirModal
        isOpen={isEditAccModalOpen}
        onClose={() => {
          setIsEditAccModalOpen(false);
          setSelectedAccountForEdit(null);
        }}
        account={selectedAccountForEdit}
        onUpdate={handleUpdateAccount}
        onDelete={handleDeleteAccount}
      />

      <ForgeTransactionModal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
        accounts={accounts}
        onSubmit={handleCreateTransaction}
      />

      <ReflectionModal
        isOpen={isReflectModalOpen}
        onClose={() => {
          setIsReflectModalOpen(false);
          setActiveTxForReflection(null);
        }}
        activeTx={activeTxForReflection}
        onSubmit={handleSaveReflection}
      />
    </div>
  );
};
export default WealthManagement;
