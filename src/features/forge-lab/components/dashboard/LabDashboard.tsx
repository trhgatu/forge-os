import React from "react";
import {
  Project,
  Foundation,
  ResearchTrail,
  ForgeTab,
  ContributionStats,
  UserConnection,
} from "../../types";
import { forgeApi } from "../../api";
import { useAuthStore } from "@/shared/store/authStore";

// Widgets
import { QuickStatsWidget } from "./QuickStatsWidget";
import { NovaBannerWidget } from "./NovaBannerWidget";
import { DirectivesWidget } from "./DirectivesWidget";
import { MissionGraphWidget } from "./MissionGraphWidget";
import { SystemLogsWidget } from "./SystemLogsWidget";

interface LabDashboardProps {
  projects: Project[];
  foundations: Foundation[];
  trails: ResearchTrail[];
  setActiveTab: (tab: ForgeTab) => void;
  setActiveProjectId: (projectId: string | null) => void;
}

export const LabDashboard: React.FC<LabDashboardProps> = ({
  projects,
  foundations,
  trails,
  setActiveTab,
  setActiveProjectId,
}) => {
  const [contributionStats, setContributionStats] = React.useState<ContributionStats | null>(null);
  const [loadingStats, setLoadingStats] = React.useState(true);
  const authUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  React.useEffect(() => {
    const initIdentity = async () => {
      // Wait for hydration to finish before deciding auth state
      if (!isHydrated) return;

      // Avoid flickering: If we have a token but no user yet (hydration), wait.
      // Only stop loading if we truly have no token (logged out).
      if (!authUser?.id) {
        if (!token) {
          setLoadingStats(false);
        }
        return;
      }

      try {
        // 1. Fetch full profile to check connections
        const profile = await forgeApi.getUser(authUser.id);
        const githubConnection = profile.connections?.find(
          (c: UserConnection) => c.provider === "github"
        );

        if (githubConnection) {
          const username = githubConnection.identifier;
          const stats = await forgeApi.getGithubStats(username);
          setContributionStats(stats);
        } else {
          // Force widget view
          setContributionStats(null);
        }
      } catch (e) {
        console.error("LabDashboard: Error loading identity", e);
        // On error (e.g. 401), stop loading so we might see something (or empty state)
      } finally {
        setLoadingStats(false);
      }
    };

    initIdentity();
  }, [authUser?.id, isHydrated, token]);

  return (
    <div className="max-w-[1600px] mx-auto p-6 md:p-10 pb-32 space-y-10 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-2">
            Forge Lab
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-xl">
            Central Command for{" "}
            <span className="text-forge-cyan font-medium">System Evolution</span> &{" "}
            <span className="text-fuchsia-400 font-medium">Neural Research</span>.
          </p>
        </div>

        {/* Quick Stats Widget */}
        <QuickStatsWidget
          projectCount={projects.length}
          foundationCount={foundations.length}
          trailCount={trails.length}
        />
      </div>

      {/* Nova Reflection Banner (Dynamic Quote) */}
      <NovaBannerWidget />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* COLUMN 1: Pinned "Directives" & Navigation */}
        <div className="lg:col-span-4">
          <DirectivesWidget
            projects={projects}
            foundations={foundations}
            setActiveTab={setActiveTab}
            setActiveProjectId={setActiveProjectId}
          />
        </div>

        {/* COLUMN 2: Heatmap & Activity Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mission Graph (Heatmap) */}
          <MissionGraphWidget
            contributionStats={contributionStats}
            loadingStats={loadingStats}
            onStatsUpdate={setContributionStats}
            setLoading={setLoadingStats}
          />

          {/* Activity Stream */}
          <SystemLogsWidget projects={projects} />
        </div>
      </div>
    </div>
  );
};
