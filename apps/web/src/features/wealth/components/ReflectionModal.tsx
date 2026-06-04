'use client';

import React, { useState } from 'react';
import { Button, Modal, Label } from '@/shared/components/ui';
import { useLanguage } from '@/contexts/LanguageContext';
import { FinancialTransactionDto } from '../services/wealthService';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTx: FinancialTransactionDto | null;
  onSubmit: (reflectionText: string) => Promise<void>;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  isOpen,
  onClose,
  activeTx,
  onSubmit,
}) => {
  const { t, language } = useLanguage();
  const [reflectionText, setReflectionText] = useState('');
  const [loading, setLoading] = useState(false);

  if (!activeTx) return null;

  const handleSaveReflection = async () => {
    if (!reflectionText.trim()) return;

    try {
      setLoading(true);
      await onSubmit(reflectionText);
      setReflectionText('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrencySimple = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('wealth.reflection_modal_title')}
    >
      <div className="bg-white/5 rounded-xl p-3.5 mb-4 text-xs border border-white/5 text-zinc-300">
        <div className="flex justify-between font-mono mb-1">
          <span>{language === 'vi' ? 'Hạng mục' : 'Category'}: {activeTx.category}</span>
          <span className="text-orange-400 font-bold">-{formatCurrencySimple(Number(activeTx.amount))}</span>
        </div>
        <p className="text-[10px] text-zinc-500 font-mono">
          {language === 'vi' ? 'Thực hiện vào' : 'Logged at'}: {new Date(activeTx.loggedAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-[10px] text-forge-cyan font-mono uppercase tracking-widest block font-bold">
            {t('wealth.reflection_label')}
          </Label>
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder={t('wealth.reflection_placeholder')}
            className="w-full h-24 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-white/20 transition-all placeholder-gray-600"
          />
        </div>

        <p className="text-[10px] text-zinc-500 font-light leading-relaxed mb-1">
          {t('wealth.reflect_desc')}
        </p>

        <div className="flex gap-3 text-xs">
          <Button
            onClick={onClose}
            className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-center transition-all border border-white/5"
          >
            {t('knowledge.cancel')}
          </Button>
          <Button
            onClick={handleSaveReflection}
            disabled={loading}
            className="flex-1 py-2 bg-forge-cyan hover:bg-forge-cyan/90 text-black rounded-xl font-mono text-center shadow-[0_0_15px_rgba(34,211,238,0.2)] font-bold"
          >
            {loading ? t('wealth.creating') : t('wealth.reflect_save')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
