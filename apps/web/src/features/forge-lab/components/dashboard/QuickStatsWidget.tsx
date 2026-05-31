import React from 'react';

import { Label } from '@/shared/components/ui';

interface QuickStatsWidgetProps {
  projectCount: number;
  foundationCount: number;
  trailCount: number;
}

export const QuickStatsWidget: React.FC<QuickStatsWidgetProps> = ({
  projectCount,
  foundationCount,
  trailCount,
}) => {
  return (
    <div className="flex gap-4">
      <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-white/10 flex flex-col items-center min-w-[100px] group hover:border-forge-cyan/50 transition-colors">
        <Label variant="dim" className="text-xs uppercase tracking-wider mb-1 block">Projects</Label>
        <div className="text-2xl font-bold text-white group-hover:text-forge-cyan transition-colors">
          {projectCount}
        </div>
      </div>
      <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-white/10 flex flex-col items-center min-w-[100px] group hover:border-fuchsia-400/50 transition-colors">
        <Label variant="dim" className="text-xs uppercase tracking-wider mb-1 block">Modules</Label>
        <div className="text-2xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">
          {foundationCount}
        </div>
      </div>
      <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-white/10 flex flex-col items-center min-w-[100px] group hover:border-emerald-400/50 transition-colors">
        <Label variant="dim" className="text-xs uppercase tracking-wider mb-1 block">Research</Label>
        <div className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
          {trailCount}
        </div>
      </div>
    </div>
  );
};


