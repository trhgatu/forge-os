import React from "react";

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
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Projects</div>
        <div className="text-2xl font-bold text-white group-hover:text-forge-cyan transition-colors">
          {projectCount}
        </div>
      </div>
      <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-white/10 flex flex-col items-center min-w-[100px] group hover:border-fuchsia-400/50 transition-colors">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Modules</div>
        <div className="text-2xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">
          {foundationCount}
        </div>
      </div>
      <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-white/10 flex flex-col items-center min-w-[100px] group hover:border-emerald-400/50 transition-colors">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Research</div>
        <div className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
          {trailCount}
        </div>
      </div>
    </div>
  );
};
