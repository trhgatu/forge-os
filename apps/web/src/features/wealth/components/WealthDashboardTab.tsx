'use client';

import React from 'react';
import { Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { WidgetShell, Label, Tag, Button, Skeleton } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { FinancialTransactionDto } from '../services/wealthService';

interface WealthDashboardTabProps {
  isLoading?: boolean;
  accounts: any[];
  transactions: FinancialTransactionDto[];
  budgets: any[];
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  percentages: { ESSENTIAL: number; COMFORT: number; INDULGENCE: number };
  chartData: any[];
  formatCurrency: (amount: number, currency?: string) => string;
  getTranslatedCategory: (cat: string) => string;
  handleDeleteTransaction: (id: string) => void;
  setActiveTxForReflection: (tx: FinancialTransactionDto) => void;
  setIsReflectModalOpen: (open: boolean) => void;
  onEditAccount: (acc: any) => void;
  t: (key: string) => string;
  language: string;
}

export const WealthDashboardTab: React.FC<WealthDashboardTabProps> = ({
  isLoading = false,
  accounts,
  transactions,
  budgets,
  totalBalance,
  totalIncome,
  totalExpense,
  percentages,
  chartData,
  formatCurrency,
  getTranslatedCategory,
  handleDeleteTransaction,
  setActiveTxForReflection,
  setIsReflectModalOpen,
  onEditAccount,
  t,
  language,
}) => {
  return (
    <div className="space-y-6">
      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-min mb-6">
        {/* TOTAL BALANCES */}
        <WidgetShell className="col-span-1 md:col-span-2 row-span-1 min-h-[160px] relative overflow-hidden" delay={0}>
          <div className="flex flex-col justify-between h-full relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <Label variant="dim" className="text-[10px] uppercase tracking-wider block">
                  {t('wealth.asset_pool')}
                </Label>
                <Tag variant="cyan" className="text-[8px] font-mono py-0.5 px-2 bg-forge-cyan/10 border-forge-cyan/20 text-forge-cyan mt-1">
                  {t('wealth.balanced')}
                </Tag>
              </div>
            </div>

            <div className="mt-4">
              {isLoading ? (
                <Skeleton variant="glowing" className="h-10 w-48 mt-1 rounded-lg" />
              ) : (
                <div className="text-5xl font-display font-bold tracking-tighter text-white leading-none">
                  {formatCurrency(totalBalance)}
                </div>
              )}
              <p className="text-gray-400 mt-2 text-xs font-light">
                {t('wealth.pool_desc')}
              </p>
            </div>
          </div>
        </WidgetShell>

        {/* NET INFLOWS */}
        <WidgetShell
          className="col-span-1"
          delay={100}
          title={t('wealth.absorption')}
        >
          <div className="flex flex-col justify-between h-full py-1">
            <div>
              {isLoading ? (
                <Skeleton variant="glowing" className="h-8 w-32 rounded-lg" />
              ) : (
                <div className="text-3xl font-bold text-white tracking-tight">
                  {formatCurrency(totalIncome)}
                </div>
              )}
              <p className="text-gray-500 text-[10px] font-light mt-1">{t('wealth.absorption_desc')}</p>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
            </div>
          </div>
        </WidgetShell>

        {/* NET OUTFLOWS */}
        <WidgetShell
          className="col-span-1"
          delay={200}
          title={t('wealth.dissipation')}
        >
          <div className="flex flex-col justify-between h-full py-1">
            <div>
              {isLoading ? (
                <Skeleton variant="glowing" className="h-8 w-32 rounded-lg" />
              ) : (
                <div className="text-3xl font-bold text-white tracking-tight">
                  {formatCurrency(totalExpense)}
                </div>
              )}
              <p className="text-gray-500 text-[10px] font-light mt-1">{t('wealth.dissipation_desc')}</p>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-orange-500 rounded-full w-[45%]" />
            </div>
          </div>
        </WidgetShell>

        {/* ASSETS SLOTS */}
        <div className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <Skeleton key={i} variant="glowing" className="h-[90px] rounded-2xl" />
            ))
          ) : accounts.length === 0 ? (
            <div className="col-span-4 text-center py-6 text-xs text-zinc-500 font-mono">{t('wealth.no_accounts') || 'Chưa có tài khoản nào'}</div>
          ) : (
            accounts.map((acc) => (
              <div
                key={acc.id}
                onClick={() => onEditAccount(acc)}
                className={cn(
                  'relative rounded-2xl p-4 border transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white/[0.02]',
                  acc.type === 'CASH' && 'border-amber-500/10 hover:border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.03)]',
                  acc.type === 'BANK_ACCOUNT' && 'border-cyan-500/10 hover:border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.03)]',
                  acc.type === 'INVESTMENT' && 'border-violet-500/10 hover:border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.03)]',
                  acc.type === 'EMERGENCY_FUND' && 'border-emerald-500/10 hover:border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.03)]',
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <Label variant="default" className="text-xs font-mono tracking-wider font-bold text-gray-300 uppercase">
                    {acc.name}
                  </Label>
                  <Tag
                    variant="default"
                    className={cn(
                      'text-[8px] py-0 px-1 border-white/5 bg-white/5',
                      acc.type === 'CASH' && 'text-amber-400 bg-amber-500/5',
                      acc.type === 'BANK_ACCOUNT' && 'text-cyan-400 bg-cyan-500/5',
                      acc.type === 'INVESTMENT' && 'text-violet-400 bg-violet-500/5',
                      acc.type === 'EMERGENCY_FUND' && 'text-emerald-400 bg-emerald-500/5',
                    )}
                  >
                    {acc.type.replace('_', ' ')}
                  </Tag>
                </div>
                <div className="text-xl font-bold text-white font-mono tracking-tight">
                  {formatCurrency(Number(acc.balance), acc.currency)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* AREA CHART FLOW */}
        <WidgetShell
          className="col-span-1 md:col-span-3 row-span-1 min-h-[300px]"
          delay={300}
          title={t('wealth.flux_kinetics')}
          noPadding
        >
          <div className="h-full w-full pt-6 pr-4 pl-2 pb-2">
            {isLoading ? (
              <Skeleton variant="glowing" className="w-full h-full rounded-xl" />
            ) : chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-gray-500 font-mono">
                {t('wealth.no_tx_data')}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(7,7,12,0.95)',
                      border: '1px solid rgba(34,211,238,0.2)',
                      borderRadius: '12px',
                      fontSize: '11px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                      backdropFilter: 'blur(8px)',
                    }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    name={language === 'vi' ? 'Thu nhập' : 'Inflow'}
                    stroke="#10B981"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#colorInc)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    name={language === 'vi' ? 'Chi tiêu' : 'Outflow'}
                    stroke="#F97316"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#colorExp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </WidgetShell>

        {/* STOIC ALLOCATION GRAPH */}
        <WidgetShell
          className="col-span-1 row-span-1 min-h-[300px]"
          delay={400}
          title={t('wealth.stoic_spectrum')}
        >
          <div className="flex flex-col justify-around h-full py-1">
            {isLoading ? (
              <div className="space-y-5 py-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton variant="glowing" className="h-3 w-28 rounded" />
                    <Skeleton variant="glowing" className="h-1.5 w-full rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Essential */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-2">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t('wealth.essential').split(' ')[0]} ({language === 'vi' ? 'Thiết yếu' : 'Core Need'})
                    </span>
                    <span className="text-emerald-400 font-bold">{percentages.ESSENTIAL}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentages.ESSENTIAL}%` }}
                    />
                  </div>
                </div>

                {/* Comfort */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-2">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> {t('wealth.comfort').split(' ')[0]} ({language === 'vi' ? 'Tiện nghi' : 'Comfort'})
                    </span>
                    <span className="text-cyan-400 font-bold">{percentages.COMFORT}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentages.COMFORT}%` }}
                    />
                  </div>
                </div>

                {/* Indulgence */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-2">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> {t('wealth.indulgence').split(' ')[0]} ({language === 'vi' ? 'Xa xỉ' : 'Luxury'})
                    </span>
                    <span className="text-orange-400 font-bold">{percentages.INDULGENCE}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        percentages.INDULGENCE > 30 ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]' : 'bg-orange-500',
                      )}
                      style={{ width: `${percentages.INDULGENCE}%` }}
                    />
                  </div>
                </div>

                {percentages.INDULGENCE > 30 && (
                  <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl text-[10px] text-orange-300 leading-relaxed font-light">
                    {t('wealth.indulgence_warning')}
                  </div>
                )}
              </>
            )}
          </div>
        </WidgetShell>
      </div>

      {/* LEDGER & TRANSACTION LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEDGER LIST */}
        <div className="lg:col-span-2 bg-white/[0.01] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <Label variant="default" className="text-sm font-display font-bold text-white uppercase tracking-wider block">
              {t('wealth.recent_tx')}
            </Label>
            <Tag variant="default" className="text-[10px] font-mono bg-white/5 text-zinc-400">
              {transactions.length} {t('wealth.ledger_records')}
            </Tag>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} variant="glowing" className="h-14 rounded-xl" />
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-500 font-mono">{t('wealth.no_tx_records')}</div>
          ) : (
            <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-2 scrollbar-hide">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Button
                      className={cn(
                        'p-2 rounded-full border',
                        tx.type === 'INCOME' && 'bg-emerald-500/10 text-emerald-400',
                        tx.type === 'EXPENSE' && 'bg-orange-500/10 text-orange-400',
                      )}
                    >
                      {tx.type === 'INCOME' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    </Button>

                    <div>
                      <div className="text-xs font-semibold text-white tracking-wide">{getTranslatedCategory(tx.category)}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-mono text-zinc-500">
                          {new Date(tx.loggedAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                        </span>
                        <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                          {tx.account?.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* reflection block */}
                    {tx.type === 'EXPENSE' && tx.categoryType === 'INDULGENCE' && !tx.reflection && (
                      <Button
                        onClick={() => {
                          setActiveTxForReflection(tx);
                          setIsReflectModalOpen(true);
                        }}
                        className="bg-forge-cyan/10 hover:bg-forge-cyan/20 border border-forge-cyan/20 text-forge-cyan font-mono text-[9px] px-2 py-1 rounded-lg transition-all"
                      >
                        {t('wealth.reflect_btn')}
                      </Button>
                    )}

                    {tx.reflection && (
                      <div
                        title={tx.reflection}
                        className="hidden md:block text-[10px] text-zinc-500 font-light italic max-w-[150px] truncate"
                      >
                        Reflection logged
                      </div>
                    )}

                    <div className="text-right font-mono text-xs">
                      <div
                        className={cn(
                          'font-bold',
                          tx.type === 'INCOME' ? 'text-emerald-400' : 'text-orange-400',
                        )}
                      >
                        {tx.type === 'INCOME' ? '+' : '-'} {formatCurrency(Number(tx.amount))}
                      </div>
                      <div className="text-[8px] text-zinc-500 uppercase tracking-widest mt-0.5">
                        {tx.categoryType}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTransaction(tx.id)}
                      className="text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1 cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 h-fit">
          <Label variant="default" className="text-sm font-display font-bold text-white uppercase tracking-wider mb-6 block">
            {t('wealth.budget_limit_grid')}
          </Label>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton variant="glowing" className="h-3 w-20 rounded" />
                  <Skeleton variant="glowing" className="h-2 w-full rounded-full" />
                  <Skeleton variant="glowing" className="h-3 w-32 rounded" />
                </div>
              ))}
            </div>
          ) : budgets.length === 0 ? (
            <div className="text-center py-6 text-xs text-zinc-500 font-mono">{t('wealth.no_budget')}</div>
          ) : (
            <div className="space-y-6">
              {budgets.map((b) => {
                const limit = Number(b.limitAmount);
                const spent = Number(b.spentAmount);
                const percent = Math.min(Math.round((spent / limit) * 100), 100);

                return (
                  <div key={b.id} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300 font-bold uppercase tracking-wider">{b.categoryType}</span>
                      <span className={cn('font-bold', percent >= 100 ? 'text-red-400' : percent >= 80 ? 'text-amber-400' : 'text-cyan-400')}>
                        {percent}%
                      </span>
                    </div>

                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          percent >= 100 ? 'bg-red-500' : percent >= 80 ? 'bg-amber-500' : 'bg-cyan-500',
                        )}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span>{t('wealth.spent')}: {formatCurrency(spent)}</span>
                      <span>{t('wealth.limit')}: {formatCurrency(limit)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WealthDashboardTab;
