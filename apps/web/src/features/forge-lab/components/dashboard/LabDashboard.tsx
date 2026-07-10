import React from 'react';

import { Label } from '@/shared/components/ui';
import { useAuthStore } from '@/shared/store/authStore';

import { forgeApi } from '../../api';
import type {
  Project,
  Foundation,
  ResearchTrail,
  ForgeTab,
  ContributionStats,
  UserConnection,
} from '../../types';

import { DirectivesWidget } from './DirectivesWidget';
import { MissionGraphWidget } from './MissionGraphWidget';
import { NovaBannerWidget } from './NovaBannerWidget';
import { QuickStatsWidget } from './QuickStatsWidget';
import { SystemLogsWidget } from './SystemLogsWidget';

interface LabDashboardProps {
  projects: Project[];
  foundations: Foundation[];
  trails: ResearchTrail[];
  setActiveTab: (tab: ForgeTab) => void;
  setActiveProjectId: (projectId: string | null) => void;
  isLoading?: boolean;
}

export const LabDashboard: React.FC<LabDashboardProps> = ({
  projects,
  foundations,
  trails,
  setActiveTab,
  setActiveProjectId,
  isLoading,
}) => {
  const [contributionStats, setContributionStats] = React.useState<ContributionStats | null>(null);
  const [loadingStats, setLoadingStats] = React.useState(true);
  const authUser = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  React.useEffect(() => {
    const initIdentity = async () => {
      if (!isHydrated) return;
      if (!authUser?.id) {
        if (!accessToken) {
          setLoadingStats(false);
        }
        return;
      }

      try {
        const profile = await forgeApi.getUser(authUser.id);
        const githubConnection = profile.connections?.find(
          (c: UserConnection) => c.provider === 'github',
        );

        if (githubConnection) {
          const username = githubConnection.identifier;
          const stats = await forgeApi.getGithubStats(username);
          setContributionStats(stats);
        } else {
          setContributionStats(null);
        }
      } catch (e) {
        console.error('LabDashboard: Error loading identity', e);
      } finally {
        setLoadingStats(false);
      }
    };

    initIdentity();
  }, [authUser?.id, isHydrated, accessToken]);

  return (
    <div className="max-w-[1600px] mx-auto p-6 md:p-10 pb-32 space-y-10 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="mb-3 flex items-center gap-2 opacity-85">
            <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
            <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
              System Operations
            </Label>
          </div>

          <Label variant="default" className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-3 block capitalize">
            Forge Lab
          </Label>

          <p className="text-lg text-gray-400 font-light max-w-xl leading-relaxed">
            Central Command for{' '}
            <span className="text-forge-cyan font-medium">System Evolution</span> &{' '}
            <span className="text-fuchsia-400 font-medium">Neural Research</span>.
          </p>
        </div>

        <QuickStatsWidget
          projectCount={projects.length}
          foundationCount={foundations.length}
          trailCount={trails.length}
        />
      </div>

      <NovaBannerWidget />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <DirectivesWidget
            projects={projects}
            foundations={foundations}
            setActiveTab={setActiveTab}
            setActiveProjectId={setActiveProjectId}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-8 space-y-6">
          <MissionGraphWidget
            contributionStats={contributionStats}
            loadingStats={loadingStats}
            onStatsUpdate={setContributionStats}
            setLoading={setLoadingStats}
          />
          <SystemLogsWidget projects={projects} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};


