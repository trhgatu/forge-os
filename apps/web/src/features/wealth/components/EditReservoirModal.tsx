'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button, Input, Dropdown, Modal, Label } from '@/shared/components/ui';
import { toast } from 'sonner';

interface EditReservoirModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: {
    id: string;
    name: string;
    type: 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND';
    balance: number;
    currency: string;
  } | null;
  onUpdate: (id: string, data: {
    name: string;
    type: 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND';
    balance: number;
  }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const EditReservoirModal: React.FC<EditReservoirModalProps> = ({
  isOpen,
  onClose,
  account,
  onUpdate,
  onDelete,
}) => {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    type: 'BANK_ACCOUNT' as 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND',
    balance: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      setForm({
        name: account.name,
        type: account.type,
        balance: String(account.balance),
      });
    }
  }, [account, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !form.name) return;

    try {
      setLoading(true);
      await onUpdate(account.id, {
        name: form.name,
        type: form.type,
        balance: Number(form.balance) || 0,
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!account) return;
    toast(t('wealth.delete_reservoir_confirm'), {
      action: {
        label: language === 'vi' ? 'Giải trừ' : 'Dissolve',
        onClick: async () => {
          try {
            setLoading(true);
            await onDelete(account.id);
            onClose();
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
      },
      cancel: {
        label: t('wealth.cancel_btn'),
        onClick: () => {},
      },
    });
  };

  const handleTypeChange = (val: string) => {
    setForm((p) => ({
      ...p,
      type: val as 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND',
    }));
  };

  const typeOptions = [
    { value: 'BANK_ACCOUNT', label: language === 'vi' ? 'Tài khoản ngân hàng' : 'Bank Account', sublabel: language === 'vi' ? 'Thẻ ATM, Debit, Credit...' : 'ATM, Debit, Credit cards...' },
    { value: 'CASH', label: language === 'vi' ? 'Tiền mặt lưu chuyển' : 'Physical Cash', sublabel: language === 'vi' ? 'Tiền mặt ví vật lý...' : 'Physical cash in wallet...' },
    { value: 'INVESTMENT', label: language === 'vi' ? 'Tài sản đầu tư tích lũy' : 'Investment Assets', sublabel: language === 'vi' ? 'Cổ phiếu, vàng, quỹ...' : 'Stocks, gold, mutual funds...' },
    { value: 'EMERGENCY_FUND', label: language === 'vi' ? 'Quỹ đệm an toàn' : 'Safety Buffer Fund', sublabel: language === 'vi' ? 'Emergency fund dự phòng...' : 'Emergency fund reserve...' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('wealth.edit_reservoir_title')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
            {t('wealth.reservoir_name')}
          </Label>
          <Input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
            required
          />
        </div>

        {/* Type */}
        <div className="space-y-1.5 relative">
          <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
            {t('wealth.reservoir_type')}
          </Label>
          <Dropdown
            value={form.type}
            onChange={handleTypeChange}
            options={typeOptions}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl"
          />
        </div>

        {/* Balance */}
        <div className="space-y-1.5">
          <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
            {t('wealth.initial_balance')}
          </Label>
          <Input
            type="number"
            value={form.balance}
            onChange={(e) => setForm((p) => ({ ...p, balance: e.target.value }))}
            className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
          />
        </div>

        <div className="pt-2 grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="danger"
            disabled={loading}
            onClick={handleDelete}
            className="w-full py-2.5 font-mono text-center transition-all text-xs"
          >
            {t('wealth.delete_reservoir_btn')}
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-forge-cyan hover:bg-forge-cyan/90 text-black rounded-xl font-mono text-center transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] font-bold text-xs"
          >
            {loading ? t('wealth.creating') : t('wealth.edit_btn')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
