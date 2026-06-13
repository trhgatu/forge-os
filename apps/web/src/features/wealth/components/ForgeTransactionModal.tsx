'use client';

import React, { useState, useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button, Input, Dropdown, Modal, Label } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import type { FinancialAccountDto } from '../services/wealthService';

interface ForgeTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: FinancialAccountDto[];
  onSubmit: (data: {
    accountId: string;
    type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    amount: number;
    category: string;
    categoryType: 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE';
    description?: string;
    reflection?: string;
    isApprovedByWill?: boolean;
  }) => Promise<void>;
}

const PRESET_CATEGORIES = [
  { value: 'Ăn uống', label: 'Ăn uống (Cơm nước thiết yếu)', categoryType: 'ESSENTIAL' as const, type: 'EXPENSE' as const },
  { value: 'Thuê nhà', label: 'Thuê nhà / Trả góp nhà', categoryType: 'ESSENTIAL' as const, type: 'EXPENSE' as const },
  { value: 'Di chuyển', label: 'Di chuyển / Xăng xe', categoryType: 'ESSENTIAL' as const, type: 'EXPENSE' as const },
  { value: 'Y tế', label: 'Y tế / Sức khỏe', categoryType: 'ESSENTIAL' as const, type: 'EXPENSE' as const },
  { value: 'Học tập', label: 'Học tập / Phát triển bản thân', categoryType: 'ESSENTIAL' as const, type: 'EXPENSE' as const },

  { value: 'Du lịch', label: 'Du lịch / Nghỉ dưỡng', categoryType: 'COMFORT' as const, type: 'EXPENSE' as const },
  { value: 'Mua sắm', label: 'Mua sắm tiện nghi', categoryType: 'COMFORT' as const, type: 'EXPENSE' as const },
  { value: 'Thể thao', label: 'Thể thao / Gym / Yoga', categoryType: 'COMFORT' as const, type: 'EXPENSE' as const },
  { value: 'Dịch vụ mạng', label: 'Netflix / Spotify / Cloud', categoryType: 'COMFORT' as const, type: 'EXPENSE' as const },

  { value: 'Nhậu nhẹt', label: 'Nhậu nhẹt / Tiệc tùng / Beer', categoryType: 'INDULGENCE' as const, type: 'EXPENSE' as const },
  { value: 'Ăn uống xa hoa', label: 'Ăn uống xa xỉ / Nhà hàng đắt đỏ', categoryType: 'INDULGENCE' as const, type: 'EXPENSE' as const },
  { value: 'Mua sắm bốc đồng', label: 'Mua sắm bốc đồng vô lý', categoryType: 'INDULGENCE' as const, type: 'EXPENSE' as const },

  { value: 'Lương', label: 'Thu nhập lương tháng', categoryType: 'ESSENTIAL' as const, type: 'INCOME' as const },
  { value: 'Đầu tư', label: 'Thu nhập đầu tư / Lãi suất', categoryType: 'ESSENTIAL' as const, type: 'INCOME' as const },
  { value: 'Khác', label: 'Tùy chỉnh hạng mục khác...', categoryType: 'ESSENTIAL' as const, type: 'CUSTOM' as const },
];

export const ForgeTransactionModal: React.FC<ForgeTransactionModalProps> = ({
  isOpen,
  onClose,
  accounts,
  onSubmit,
}) => {
  const { t, language } = useLanguage();
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('Ăn uống');
  const [form, setForm] = useState({
    accountId: '',
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE' | 'TRANSFER',
    amount: '',
    category: 'Ăn uống',
    categoryType: 'ESSENTIAL' as 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE',
    description: '',
    reflection: '',
    isApprovedByWill: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accounts.length > 0 && !form.accountId) {
      setForm((p) => ({ ...p, accountId: accounts[0].id }));
    }
  }, [accounts, form.accountId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.accountId || !form.amount || !form.category) return;

    try {
      setLoading(true);
      await onSubmit({
        accountId: form.accountId,
        type: form.type,
        amount: Number(form.amount),
        category: form.category,
        categoryType: form.categoryType,
        description: form.description || undefined,
        reflection: form.reflection || undefined,
        isApprovedByWill: form.isApprovedByWill,
      });
      setForm((p) => ({
        ...p,
        amount: '',
        category: 'Ăn uống',
        categoryType: 'ESSENTIAL',
        type: 'EXPENSE',
        description: '',
        reflection: '',
        isApprovedByWill: true,
      }));
      setSelectedCategoryKey('Ăn uống');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetCategoryChange = (key: string) => {
    setSelectedCategoryKey(key);
    const preset = PRESET_CATEGORIES.find((c) => c.value === key);
    if (preset) {
      if (preset.type === 'CUSTOM') {
        setForm((p) => ({
          ...p,
          category: '',
        }));
      } else {
        setForm((p) => ({
          ...p,
          category: preset.value,
          categoryType: preset.categoryType,
          type: preset.type,
        }));
      }
    }
  };

  const formatCurrencySimple = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const accountOptions = accounts.map((acc) => ({
    value: acc.id,
    label: acc.name,
    sublabel: `${language === 'vi' ? 'Số dư' : 'Balance'}: ${formatCurrencySimple(Number(acc.balance))}`,
  }));

  const categoryTypeOptions = [
    { value: 'ESSENTIAL', label: t('wealth.essential_label'), sublabel: t('wealth.essential_sub') },
    { value: 'COMFORT', label: t('wealth.comfort_label'), sublabel: t('wealth.comfort_sub') },
    { value: 'INDULGENCE', label: t('wealth.indulgence_label'), sublabel: t('wealth.indulgence_sub') },
  ];

  const presetCategoryOptions = PRESET_CATEGORIES.map((c) => {
    const enLabelMap: Record<string, string> = {
      'Ăn uống': 'Dining (Core Food)',
      'Thuê nhà': 'Rent / Home Mortgage',
      'Di chuyển': 'Transportation / Gas',
      'Y tế': 'Medical / Health',
      'Học tập': 'Education / Self-growth',
      'Du lịch': 'Travel / Vacation',
      'Mua sắm': 'Convenience Shopping',
      'Thể thao': 'Sports / Gym / Yoga',
      'Dịch vụ mạng': 'Subscriptions (Netflix/Spotify)',
      'Nhậu nhẹt': 'Social Drinking / Party',
      'Ăn uống xa hoa': 'Fine Dining / High-End Restaurant',
      'Mua sắm bốc đồng': 'Impulsive / Regretful spending',
      'Lương': 'Salary Monthly Income',
      'Đầu tư': 'Investment Income / Interest',
      'Khác': 'Custom other category...',
    };

    const label = language === 'vi' ? c.label : (enLabelMap[c.value] || c.value);
    return {
      value: c.value,
      label,
      sublabel: c.type !== 'CUSTOM' ? `${language === 'vi' ? 'Phân loại' : 'Category'}: ${c.categoryType}` : undefined,
    };
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('wealth.forge_tx_title')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account Picker */}
        <div className="space-y-1.5 relative">
          <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{t('wealth.account')}</Label>
          <Dropdown
            value={form.accountId}
            onChange={(val) => setForm((p) => ({ ...p, accountId: val }))}
            options={accountOptions}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl"
          />
        </div>

        {/* Preset Category Picker */}
        <div className="space-y-1.5 relative">
          <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{t('wealth.category')}</Label>
          <Dropdown
            value={selectedCategoryKey}
            onChange={handlePresetCategoryChange}
            options={presetCategoryOptions}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl"
          />
        </div>

        {/* Custom Category Input if selected 'Khác' */}
        {selectedCategoryKey === 'Khác' && (
          <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{t('wealth.custom_category')}</Label>
            <Input
              type="text"
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              placeholder={t('wealth.custom_category_placeholder')}
              className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
              required
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            onClick={() => setForm((p) => ({ ...p, type: 'EXPENSE' }))}
            className={cn(
              'w-full py-2 border rounded-xl font-mono text-center text-xs transition-all cursor-pointer h-10',
              form.type === 'EXPENSE'
                ? 'border-orange-500/40 bg-orange-500/5 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.1)] hover:bg-orange-500/10'
                : 'border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white',
            )}
          >
            EXPENSE ({language === 'vi' ? 'Chi' : 'Outflow'})
          </Button>
          <Button
            type="button"
            onClick={() => setForm((p) => ({ ...p, type: 'INCOME' }))}
            className={cn(
              'w-full py-2 border rounded-xl font-mono text-center text-xs transition-all cursor-pointer h-10',
              form.type === 'INCOME'
                ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:bg-emerald-500/10'
                : 'border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white',
            )}
          >
            INCOME ({language === 'vi' ? 'Thu' : 'Inflow'})
          </Button>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{t('wealth.amount')}</Label>
          <Input
            type="number"
            value={form.amount}
            onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
            placeholder="0 VND"
            className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
            required
          />
        </div>

        {/* Category Type */}
        {form.type === 'EXPENSE' && (
          <div className="space-y-1.5 relative">
            <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{t('wealth.stoic_class')}</Label>
            <Dropdown
              value={form.categoryType}
              onChange={(val: any) => setForm((p) => ({ ...p, categoryType: val }))}
              options={categoryTypeOptions}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl"
            />
          </div>
        )}

        {/* Reflection */}
        {form.type === 'EXPENSE' && form.categoryType === 'INDULGENCE' && (
          <div className="space-y-1.5">
            <Label className="text-[10px] text-forge-cyan font-mono uppercase tracking-widest block font-bold">
              {t('wealth.reflection_label')}
            </Label>
            <textarea
              value={form.reflection}
              onChange={(e) => setForm((p) => ({ ...p, reflection: e.target.value }))}
              placeholder={t('wealth.reflection_placeholder')}
              className="w-full h-16 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-white/20 transition-all placeholder-gray-600"
            />
          </div>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-forge-cyan hover:bg-forge-cyan/90 text-black rounded-xl font-mono text-center shadow-[0_0_15px_rgba(34,211,238,0.2)] font-bold"
          >
            {loading ? t('wealth.forging') : t('wealth.forge_btn')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
