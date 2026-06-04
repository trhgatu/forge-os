'use client';

import React, { useState } from 'react';
import { Button, Input, Dropdown, Modal, Label } from '@/shared/components/ui';
import { useLanguage } from '@/contexts/LanguageContext';

interface OpenReservoirModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    type: 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND';
    balance: number;
    currency: string;
  }) => Promise<void>;
}

export const OpenReservoirModal: React.FC<OpenReservoirModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    type: 'BANK_ACCOUNT' as 'CASH' | 'BANK_ACCOUNT' | 'INVESTMENT' | 'EMERGENCY_FUND',
    balance: '',
    currency: 'VND',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    try {
      setLoading(true);
      await onSubmit({
        name: form.name,
        type: form.type,
        balance: form.balance ? Number(form.balance) : 0,
        currency: form.currency,
      });
      setForm({
        name: '',
        type: 'BANK_ACCOUNT',
        balance: '',
        currency: 'VND',
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
      title={t('wealth.open_reservoir_title')}
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
            placeholder={language === 'vi' ? "Ví dụ: Ví MoMo, Techcombank, Quỹ Stoic..." : "e.g., Techcombank, Cash, Stoic Fund..."}
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
            placeholder="0 VND"
            className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-forge-cyan hover:bg-forge-cyan/90 text-black rounded-xl font-mono text-center transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] font-bold"
          >
            {loading ? t('wealth.creating') : t('wealth.create_btn')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
