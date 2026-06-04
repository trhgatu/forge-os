'use client';

import { LayoutDashboard, Layers, Book, Network, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/shared/store/authStore';
import { Skeleton, Label } from '@/shared/components/ui';
import { View } from '@/shared/types/os';

import { forgeApi } from '../api';
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useSyncProject,
} from '../hooks/useProjects';
import type { ForgeTab, Project, Foundation, ResearchTrail, GithubRepo } from '../types';

import { LabDashboard } from './dashboard/LabDashboard';
import { FoundationLibrary } from './FoundationLibrary';
import { CreateProjectModal } from './project-detail/ProjectModals';
import { ProjectForge } from './ProjectForge';
import { ResearchTrails } from './ResearchTrails';

const MOCK_FOUNDATIONS: Foundation[] = [
  {
    id: '1',
    title: 'Core Principles',
    type: 'Doc',
    updatedAt: new Date(),
    description:
      'The fundamental axioms that govern the Forge OS ecosystem, ensuring consistency and purpose across all modules.',
    status: 'stable',
    version: '2.4.0',
    author: { name: 'Creator', avatar: 'https://github.com/shadcn.png' },
    contributors: [
      { name: 'Architect', avatar: '' },
      { name: 'Designer', avatar: '' },
    ],
    metrics: {
      usageCount: 12,
      impactScore: 98,
      complexity: 'high',
    },
    connectedNodes: [
      { id: 'p1', title: 'Forge OS System', type: 'project' },
      { id: 'p2', title: 'Neural Core', type: 'project' },
      { id: 'c1', title: 'System Theory', type: 'concept' },
    ],
  },
  {
    id: '2',
    title: 'Design Philosophy',
    type: 'Guide',
    updatedAt: new Date(Date.now() - 86400000 * 5),
    description:
      'Visual language and interaction patterns for the interface. Defines glassmorphism, typography scale, and animation curves.',
    status: 'beta',
    version: '1.0.0',
    author: { name: 'UI Lead', avatar: '' },
    contributors: [{ name: 'Frontend', avatar: '' }],
    metrics: {
      usageCount: 8,
      impactScore: 75,
      complexity: 'medium',
    },
    connectedNodes: [{ id: 'p1', title: 'Forge OS System', type: 'project' }],
  },
  {
    id: '3',
    title: 'Agent Protocols',
    type: 'Spec',
    updatedAt: new Date(Date.now() - 86400000 * 10),
    description:
      'Communication standards between Nexus, Socrates, and Muse. Includes JSON schema definitions for inter-agent messaging.',
    status: 'stable',
    version: '3.1.2',
    author: { name: 'AI Architect', avatar: '' },
    metrics: {
      usageCount: 24,
      impactScore: 99,
      complexity: 'high',
    },
  },
];

const MOCK_TRAILS: ResearchTrail[] = [
  { id: '1', title: 'AI Cognition', nodes: 12, updatedAt: new Date() },
];

export const ForgeLab: React.FC<{ slug?: string[] }> = ({ slug }) => {
  const router = useRouter();
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.FORGE_LAB);
  }, [setCurrentView]);

  const activeTab = (slug?.[0] as ForgeTab) || 'dashboard';
  const activeProjectId = slug?.[0] === 'projects' && slug?.[1] ? slug[1] : null;

  const [activeFoundation, setActiveFoundation] = useState<Foundation | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const setActiveTab = (tab: ForgeTab) => {
    router.push(`/forge/lab/${tab}`);
  };

  const setActiveProjectId = (projectId: string | null) => {
    if (projectId) {
      router.push(`/forge/lab/projects/${projectId}?tab=overview`);
    } else {
      router.push(`/forge/lab/projects`);
    }
  };

  const authUser = useAuthStore((state) => state.user);
  const [githubUsername, setGithubUsername] = useState<string | undefined>(undefined);

  // --- React Query Integration ---
  const { data: projectsData, isLoading } = useProjects();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();
  const syncProjectMutation = useSyncProject();

  const projects = React.useMemo(() => {
    if (!projectsData) return [];
    if (Array.isArray(projectsData)) return projectsData;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (projectsData as any).data || [];
  }, [projectsData]);

  const parsedProjects = React.useMemo(() => {
    return projects.map((p: Project) => ({
      ...p,
      updatedAt: new Date(p.updatedAt),
      dueDate: p.dueDate ? new Date(p.dueDate) : undefined,
      logs: p.logs?.map((l) => ({ ...l, date: new Date(l.date) })),
      taskBoard: p.taskBoard || { todo: [], inProgress: [], done: [] },
      links: p.links || [],
    }));
  }, [projects]);

  useEffect(() => {
    let isMounted = true;

    if (authUser?.id) {
      forgeApi
        .getUser(authUser.id)
        .then((profile) => {
          if (!isMounted) return;
          const gh = profile.connections?.find((c) => c.provider === 'github');
          if (gh) setGithubUsername(gh.identifier);
        })
        .catch((err) => console.error('Failed to load user profile', err));
    } else {
      setTimeout(() => {
        if (isMounted) setGithubUsername(undefined);
      }, 0);
    }

    return () => {
      isMounted = false;
    };
  }, [authUser?.id]);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab, activeProjectId]);

  if (isLoading) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center p-6 md:p-10 bg-transparent text-white font-sans animate-pulse">
        <div className="relative flex flex-col items-center gap-6 w-full max-w-[1600px] mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-6 border-b border-white/5 pb-6">
            <div className="space-y-3">
              <Skeleton variant="glowing" className="h-3 w-28 rounded-md" />
              <Skeleton variant="glowing" className="h-14 w-64 rounded-md" />
              <Skeleton variant="default" className="h-5 w-80 rounded-md" />
            </div>
            <Skeleton variant="glowing" className="h-16 w-80 rounded-xl" />
          </div>

          {/* Banner Skeleton */}
          <Skeleton variant="glowing" className="w-full h-[100px] rounded-xl" />

          {/* Grid Layout Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
            {/* DirectivesWidget (lg:col-span-4) */}
            <Skeleton variant="glowing" className="h-[380px] lg:col-span-4 rounded-xl" />
            
            {/* MissionGraph & SystemLogs (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              <Skeleton variant="default" className="h-[180px] w-full rounded-xl" />
              <Skeleton variant="default" className="h-[180px] w-full rounded-xl" />
            </div>
          </div>

          {/* Status message */}
          <span className="text-xs uppercase tracking-[0.25em] text-forge-cyan/60 animate-pulse mt-6 font-mono">
            Calibrating Forge Lab Telemetry...
          </span>
        </div>
      </div>
    );
  }

  const handleCreateProject = async (data: {
    title: string;
    description: string;
    linkedRepo?: GithubRepo | null;
    liveUrl?: string;
  }) => {
    try {
      const newProject = await createProjectMutation.mutateAsync({
        title: data.title,
        description: data.description,
      });

      const updateData: Partial<Project> = {};
      if (data.liveUrl) {
        updateData.metadata = { liveUrl: data.liveUrl };
      }

      if (data.linkedRepo) {
        updateData.links = [
          {
            title: data.linkedRepo.name,
            url: data.linkedRepo.html_url,
            icon: 'github',
          },
        ];
      }

      if (Object.keys(updateData).length > 0) {
        await updateProjectMutation.mutateAsync({
          id: newProject.id,
          data: updateData,
        });
      }

      if (data.linkedRepo) {
        // Trigger background sync immediately
        syncProjectMutation.mutate(newProject.id);
      }

      setShowCreateModal(false);
    } catch (err) {
      console.error('Failed to create project and link repo', err);
    }
  };

  const handleUpdateProject = async (id: string, data: Partial<Project>) => {
    updateProjectMutation.mutate({ id, data });
  };

  const handleDeleteProject = async (id: string) => {
    deleteProjectMutation.mutate(id, {
      onSuccess: () => {
        // Force check matching ID or if we are deleting the currently viewed project
        if (activeProjectId === id) {
          setActiveProjectId(null);
          setActiveTab('projects'); // Go back to list
        }
      },
    });
  };

  // Constants
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'foundations', label: 'Foundations', icon: Book },
    { id: 'research', label: 'Research', icon: Network },
  ];

  return (
    <div className="h-full flex flex-col bg-[#030304] text-white relative overflow-hidden animate-in fade-in duration-1000">
      <div className="flex-1 h-full relative z-10 flex flex-col min-w-0 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scrollbar-hide relative z-10 pb-32"
        >
          <div className={cn(activeTab !== 'dashboard' && 'hidden')}>
            <LabDashboard
              projects={parsedProjects}
              foundations={MOCK_FOUNDATIONS}
              trails={MOCK_TRAILS}
              setActiveTab={setActiveTab}
              setActiveProjectId={setActiveProjectId}
            />
          </div>

          <div className={cn(activeTab !== 'projects' && 'hidden')}>
            <ProjectForge
              projects={parsedProjects}
              activeProjectId={activeProjectId}
              setActiveProjectId={setActiveProjectId}
              githubUsername={githubUsername}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
              onRequestCreate={() => setShowCreateModal(true)}
            />
          </div>

          <div className={cn(activeTab !== 'foundations' && 'hidden')}>
            <FoundationLibrary
              foundations={MOCK_FOUNDATIONS}
              activeFoundation={activeFoundation}
              setActiveFoundation={setActiveFoundation}
            />
          </div>

          <div className={cn(activeTab !== 'research' && 'hidden')}>
            <ResearchTrails />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 bg-[#09090b]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-white/20">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ForgeTab)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-500 group overflow-hidden',
                activeTab === item.id
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-gray-500 hover:text-white hover:bg-white/5',
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  'shrink-0 transition-colors z-10',
                  activeTab === item.id ? 'text-forge-cyan' : 'group-hover:text-white',
                )}
              />
              <span
                className={cn(
                  'text-sm font-medium transition-all duration-500 ease-spring-out overflow-hidden whitespace-nowrap z-10',
                  activeTab === item.id
                    ? 'max-w-[150px] opacity-100 ml-1'
                    : 'max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:ml-1',
                )}
              >
                {item.label}
              </span>

              {activeTab === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-forge-cyan to-transparent opacity-50" />
              )}
            </button>
          ))}

          <div className="w-px h-6 bg-white/10 mx-1" />

          <button
            onClick={() => setShowCreateModal(true)}
            className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/20 hover:border-white/20 text-gray-400 hover:text-white transition-all group relative"
          >
            <Plus size={20} />
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black border border-white/10 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Quick Create
            </span>
          </button>
        </div>
      </div>
      {/* Modals */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateProject}
        isLoading={createProjectMutation.isPending}
        githubUsername={githubUsername}
      />
    </div>
  );
};


