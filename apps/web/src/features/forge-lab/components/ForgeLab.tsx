'use client';

import { LayoutDashboard, Layers, Book, Network, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { Skeleton, Label, FloatingDock } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/shared/store/authStore';
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
              isLoading={isLoading}
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
              isLoading={isLoading}
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

      <FloatingDock
        items={NAV_ITEMS}
        activeTab={activeTab}
        onChange={(tab) => setActiveTab(tab as ForgeTab)}
      />

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


