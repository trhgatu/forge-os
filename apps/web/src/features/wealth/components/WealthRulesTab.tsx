'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Sliders, RefreshCw, ArrowRight, Pencil } from 'lucide-react';
import { Button, Input, Dropdown, Label } from '@/shared/components/ui';
import {
  useWealthAccounts,
  useWealthRecurring,
  useCreateRecurringTransaction,
  useDeleteRecurringTransaction,
  useUpdateRecurringTransaction,
  useWealthAllocationRules,
  useUpdateAllocationRules,
} from '../hooks/useWealth';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export const WealthRulesTab: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: accounts = [] } = useWealthAccounts();
  const { data: recurringList = [], isLoading: isRecLoading } = useWealthRecurring();
  const { data: allocationRules = [] } = useWealthAllocationRules();

  const createRecurringMutation = useCreateRecurringTransaction();
  const deleteRecurringMutation = useDeleteRecurringTransaction();
  const updateRecurringMutation = useUpdateRecurringTransaction();
  const updateAllocationsMutation = useUpdateAllocationRules();

  // State quản lý nguồn định kỳ
  const [showAddInflow, setShowAddInflow] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inflowForm, setInflowForm] = useState({
    accountId: '',
    amount: '',
    category: 'Lương',
    categoryType: 'ESSENTIAL' as 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE',
    description: '',
    dayOfMonth: 5,
  });

  // State quản lý luật phân bổ
  const [selectedSourceId, setSelectedSourceId] = useState('');
  const [allocationMatrix, setAllocationMatrix] = useState<Record<string, number>>({});

  // Cập nhật giá trị ban đầu khi chuyển tài khoản nguồn phân bổ
  useEffect(() => {
    if (accounts.length > 0 && !selectedSourceId) {
      // Mặc định chọn tài khoản Bank Account đầu tiên làm nguồn nếu có
      const bank = accounts.find(a => a.type === 'BANK_ACCOUNT') || accounts[0];
      setSelectedSourceId(bank.id);
    }
  }, [accounts, selectedSourceId]);

  useEffect(() => {
    if (selectedSourceId) {
      const activeRules = allocationRules.filter(r => r.sourceAccountId === selectedSourceId);
      const matrix: Record<string, number> = {};

      // Load hũ đích
      accounts.forEach(acc => {
        if (acc.id !== selectedSourceId) {
          const rule = activeRules.find(r => r.targetAccountId === acc.id);
          matrix[acc.id] = rule ? Number(rule.percentage) : 0;
        }
      });
      setAllocationMatrix(matrix);
    }
  }, [selectedSourceId, allocationRules, accounts]);

  // Cấu hình tài khoản cho dropdown
  const accountOptions = accounts.map(a => ({
    value: a.id,
    label: `${a.name} (${a.type.replace('_', ' ')})`,
  }));

  const handleSliderChange = (targetId: string, value: number) => {
    const otherSum = Object.entries(allocationMatrix)
      .filter(([id, _]) => id !== targetId)
      .reduce((a, [_, b]) => a + b, 0);

    const maxAllowed = Math.max(0, 100 - otherSum);
    const cappedValue = Math.min(value, maxAllowed);

    setAllocationMatrix(prev => ({
      ...prev,
      [targetId]: Number(cappedValue),
    }));
  };

  const totalPercentage = Object.values(allocationMatrix).reduce((a, b) => a + Number(b), 0);

  const handleSaveAllocations = async () => {
    if (totalPercentage > 100) {
      toast.error(language === 'vi' ? 'Tổng tỷ lệ phân bổ không được vượt quá 100%.' : 'Total allocation percentage cannot exceed 100%.');
      return;
    }
    if (totalPercentage < 0) {
      toast.error(language === 'vi' ? 'Tổng tỷ lệ phân bổ không được nhỏ hơn 0%.' : 'Total allocation percentage cannot be less than 0%.');
      return;
    }

    const rules = Object.entries(allocationMatrix)
      .filter(([_, pct]) => pct > 0)
      .map(([targetId, pct]) => ({
        targetAccountId: targetId,
        percentage: pct,
      }));

    try {
      await updateAllocationsMutation.mutateAsync({
        sourceAccountId: selectedSourceId,
        rules,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditInflow = (rec: any) => {
    setEditingId(rec.id);
    setInflowForm({
      accountId: rec.accountId,
      amount: String(rec.amount),
      category: rec.category,
      categoryType: rec.categoryType || 'ESSENTIAL',
      description: rec.description || '',
      dayOfMonth: rec.dayOfMonth,
    });
    setShowAddInflow(true);
  };

  const handleCancelInflow = () => {
    setShowAddInflow(false);
    setEditingId(null);
    setInflowForm({
      accountId: '',
      amount: '',
      category: 'Lương',
      categoryType: 'ESSENTIAL',
      description: '',
      dayOfMonth: 5,
    });
  };

  const handleCreateInflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inflowForm.accountId || !inflowForm.amount) {
      toast.error('Vui lòng nhập đầy đủ thông tin thu nhập.');
      return;
    }

    try {
      if (editingId) {
        await updateRecurringMutation.mutateAsync({
          id: editingId,
          data: {
            accountId: inflowForm.accountId,
            type: 'INCOME',
            amount: Number(inflowForm.amount),
            category: inflowForm.category,
            categoryType: inflowForm.categoryType,
            description: inflowForm.description,
            dayOfMonth: Number(inflowForm.dayOfMonth),
          },
        });
        setEditingId(null);
      } else {
        await createRecurringMutation.mutateAsync({
          accountId: inflowForm.accountId,
          type: 'INCOME',
          amount: Number(inflowForm.amount),
          category: inflowForm.category,
          categoryType: inflowForm.categoryType,
          description: inflowForm.description,
          dayOfMonth: Number(inflowForm.dayOfMonth),
        });
      }
      setShowAddInflow(false);
      setInflowForm({
        accountId: '',
        amount: '',
        category: 'Lương',
        categoryType: 'ESSENTIAL',
        description: '',
        dayOfMonth: 5,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInflow = (id: string) => {
    toast(t('wealth.delete_recurring_confirm'), {
      action: {
        label: language === 'vi' ? 'Xóa' : 'Delete',
        onClick: async () => {
          try {
            await deleteRecurringMutation.mutateAsync(id);
          } catch (err) {
            console.error(err);
          }
        },
      },
      cancel: {
        label: t('wealth.cancel_btn'),
        onClick: () => {},
      },
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Tính thử số tiền phân bổ mô phỏng dựa vào nguồn lương mẫu (Ví dụ lấy nguồn lương đầu tiên của tài khoản nguồn được chọn)
  const matchingSalary = recurringList.find(r => r.accountId === selectedSourceId);
  const sampleSalaryAmount = matchingSalary ? Number(matchingSalary.amount) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* 1. NGUỒN TIỀN ĐỊNH KỲ */}
      <section className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
              1. {t('wealth.recurring_title')}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-1 font-mono">
              {t('wealth.recurring_desc')}
            </p>
          </div>
          <Button
            onClick={() => {
              if (showAddInflow) {
                handleCancelInflow();
              } else {
                setShowAddInflow(true);
              }
            }}
            variant="outline"
            size="sm"
            className="font-mono flex items-center gap-1.5"
          >
            <Plus size={13} /> {showAddInflow ? t('wealth.cancel_btn') : t('wealth.add_source')}
          </Button>
        </div>

        {showAddInflow && (
          <form onSubmit={handleCreateInflow} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">{t('wealth.source_account')}</Label>
                <Dropdown
                  value={inflowForm.accountId}
                  onChange={(v) => setInflowForm(p => ({ ...p, accountId: v }))}
                  options={accountOptions}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl text-xs"
                />
              </div>

              <div>
                <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">{t('wealth.amount_label')}</Label>
                <Input
                  type="number"
                  value={inflowForm.amount}
                  onChange={(e) => setInflowForm(p => ({ ...p, amount: e.target.value }))}
                  placeholder="Ví dụ: 20000000"
                  className="bg-white/5 border-white/10 text-white rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">{t('wealth.day_of_month')}</Label>
                <Input
                  type="number"
                  min={1}
                  max={31}
                  value={inflowForm.dayOfMonth}
                  onChange={(e) => setInflowForm(p => ({ ...p, dayOfMonth: Number(e.target.value) }))}
                  className="bg-white/5 border-white/10 text-white rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">{t('wealth.category_label')}</Label>
                <Input
                  type="text"
                  value={inflowForm.category}
                  onChange={(e) => setInflowForm(p => ({ ...p, category: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white rounded-xl text-xs"
                />
              </div>

              <div>
                <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">{t('wealth.desc_label')}</Label>
                <Input
                  type="text"
                  value={inflowForm.description}
                  onChange={(e) => setInflowForm(p => ({ ...p, description: e.target.value }))}
                  placeholder={language === 'vi' ? 'Lương cứng công ty...' : 'Standard company salary...'}
                  className="bg-white/5 border-white/10 text-white rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="default" className="flex-1 font-mono text-xs">
                {editingId ? (language === 'vi' ? 'Cập nhật cấu hình' : 'Update configuration') : t('wealth.save_recurring')}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancelInflow} className="font-mono text-xs">
                  {t('wealth.cancel_btn')}
                </Button>
              )}
            </div>
          </form>
        )}

        {isRecLoading ? (
          <div className="text-center py-6 text-xs text-zinc-500 animate-pulse font-mono">{t('wealth.scanning_flow')}</div>
        ) : recurringList.length === 0 ? (
          <div className="text-center py-6 text-xs text-zinc-500 font-mono">{t('wealth.no_recurring')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recurringList.map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase">{rec.category}</h4>
                  <div className="text-lg font-semibold text-forge-cyan font-mono mt-1">{formatCurrency(Number(rec.amount))}</div>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1">
                    Nhận tại: {rec.account?.name} | Ngày {rec.dayOfMonth} hàng tháng
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditInflow(rec)}
                    className="text-zinc-600 hover:text-forge-cyan p-2 transition-colors cursor-pointer"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteInflow(rec.id)}
                    className="text-zinc-600 hover:text-red-400 p-2 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. MA TRẬN PHÂN BỔ */}
      <section className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
            2. {t('wealth.allocation_matrix_title')}
          </h3>
          <p className="text-[11px] text-zinc-500 mt-1 font-mono">
            {t('wealth.allocation_matrix_desc')}
          </p>
        </div>

        {accounts.length <= 1 ? (
          <div className="text-center py-6 text-xs text-zinc-500 font-mono">{t('wealth.no_accounts_for_allocation')}</div>
        ) : (
          <div className="space-y-6">
            <div className="max-w-xs">
              <Label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">{t('wealth.source_trigger')}</Label>
              <Dropdown
                value={selectedSourceId}
                onChange={setSelectedSourceId}
                options={accountOptions}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl text-xs"
              />
            </div>

            {/* Matrix sliders */}
            <div className="space-y-4 max-w-xl">
              {accounts
                .filter(a => a.id !== selectedSourceId)
                .map(acc => {
                  const val = allocationMatrix[acc.id] || 0;
                  const targetAmount = (sampleSalaryAmount * val) / 100;

                  return (
                    <div key={acc.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono text-gray-300">
                        <span className="font-bold">{acc.name} ({acc.type.replace('_', ' ')})</span>
                        <div className="flex items-center gap-4">
                          {/* Ô nhập phần trăm */}
                          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded px-2 py-0.5">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={val === 0 ? '' : val}
                              onChange={(e) => {
                                let v = Number(e.target.value);
                                if (v < 0) v = 0;
                                if (v > 100) v = 100;
                                handleSliderChange(acc.id, v);
                              }}
                              className="w-12 bg-transparent text-forge-cyan font-bold text-xs text-right focus:outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-forge-cyan font-bold text-xs">%</span>
                          </div>

                          {/* Ô nhập số tiền trực tiếp (chỉ cho phép khi đã có lương mẫu) */}
                          {sampleSalaryAmount > 0 ? (
                            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded px-2 py-0.5">
                              <input
                                type="number"
                                min="0"
                                max={sampleSalaryAmount}
                                step="1000"
                                value={targetAmount === 0 ? '' : Math.round(targetAmount)}
                                onChange={(e) => {
                                  let amt = Number(e.target.value);
                                  if (amt < 0) amt = 0;
                                  if (amt > sampleSalaryAmount) amt = sampleSalaryAmount;
                                  
                                  // Quy đổi ngược từ số tiền sang phần trăm
                                  const pct = (amt / sampleSalaryAmount) * 100;
                                  handleSliderChange(acc.id, pct);
                                }}
                                className="w-24 bg-transparent text-zinc-300 text-xs text-right focus:outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <span className="text-zinc-500 text-[10px]">đ</span>
                            </div>
                          ) : (
                            <span className="text-zinc-500 text-[10px] italic">(Chưa có hũ lương)</span>
                          )}
                        </div>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.5"
                        value={val}
                        onChange={(e) => handleSliderChange(acc.id, Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-forge-cyan"
                      />
                    </div>
                  );
                })}
            </div>

            {/* Tình trạng tổng */}
            <div className="max-w-xl p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400 block">
                  {language === 'vi' ? 'Đã chia / Giữ lại' : 'Allocated / Retained'}
                </span>
                <span className={`text-xl font-bold font-mono ${totalPercentage <= 100 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalPercentage}% / {Math.max(0, 100 - totalPercentage)}%
                </span>
              </div>
              <Button
                onClick={handleSaveAllocations}
                disabled={totalPercentage > 100 || totalPercentage < 0}
                className="bg-forge-cyan text-black hover:bg-forge-cyan/90 rounded-xl font-mono text-center transition-all"
              >
                {t('wealth.save_matrix')}
              </Button>
            </div>

            {/* FLOW SIMULATION GRAPHICS */}
            {sampleSalaryAmount > 0 && (
              <div className="border-t border-white/5 pt-6 max-w-xl space-y-4">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                  {t('wealth.flow_simulation')} ({language === 'vi' ? 'Lương mẫu' : 'Sample Salary'}: {formatCurrency(sampleSalaryAmount)})
                </h4>

                <div className="flex flex-col gap-4 items-center justify-center p-6 rounded-xl bg-white/[0.01] border border-white/5">
                  <div className="p-3 rounded-xl border border-forge-cyan/20 bg-forge-cyan/5 text-center font-mono text-xs font-bold text-white w-48 shadow-[0_0_15px_rgba(34,211,238,0.05)]">
                    {t('wealth.source_node')}: {accounts.find(a => a.id === selectedSourceId)?.name || (language === 'vi' ? 'Chưa chọn' : 'Not Selected')}
                    <div className="text-[10px] font-normal text-zinc-400 mt-1">{formatCurrency(sampleSalaryAmount)}</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <Sliders size={14} className="text-zinc-500" />
                    <div className="h-4 w-px bg-dashed border-l border-zinc-700" />
                  </div>

                  <div className="w-full space-y-2">
                    {Object.entries(allocationMatrix)
                      .filter(([_, pct]) => pct > 0)
                      .map(([targetId, pct]) => {
                        const targetName = accounts.find(a => a.id === targetId)?.name || 'Target';
                        const amt = (sampleSalaryAmount * pct) / 100;
                        return (
                          <div key={targetId} className="flex items-center justify-between text-xs font-mono p-2.5 rounded-lg bg-white/[0.02]">
                            <div className="flex items-center gap-2">
                              <ArrowRight size={12} className="text-forge-cyan animate-pulse" />
                              <span className="text-zinc-300">{targetName}</span>
                            </div>
                            <span className="font-bold text-forge-cyan">{pct}% ({formatCurrency(amt)})</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </section>

    </div>
  );
};
export default WealthRulesTab;
