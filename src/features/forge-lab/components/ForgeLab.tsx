"use client";

import React, { useState, useEffect } from "react";
import { LayoutDashboard, Layers, Book, Network, Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ForgeTab, Project, Foundation, ResearchTrail } from "../types";
import { forgeApi } from "../api";
import { useAuthStore } from "@/shared/store/authStore";

// Components
import { LabDashboard } from "./LabDashboard";
import { ProjectForge } from "./ProjectForge";
import { FoundationLibrary } from "./FoundationLibrary";
import { ResearchTrails } from "./ResearchTrails";
import { CreateProjectModal } from "./ProjectModals";

const MOCK_FOUNDATIONS: Foundation[] = [
  {
    id: "1",
    title: "Core Principles",
    type: "Doc",
    updatedAt: new Date(),
    description:
      "The fundamental axioms that govern the Forge OS ecosystem, ensuring consistency and purpose across all modules.",
    status: "stable",
    version: "2.4.0",
    author: { name: "Creator", avatar: "https://github.com/shadcn.png" },
    contributors: [
      { name: "Architect", avatar: "" },
      { name: "Designer", avatar: "" },
    ],
    metrics: {
      usageCount: 12,
      impactScore: 98,
      complexity: "high",
    },
    connectedNodes: [
      { id: "p1", title: "Forge OS System", type: "project" },
      { id: "p2", title: "Neural Core", type: "project" },
      { id: "c1", title: "System Theory", type: "concept" },
    ],
  },
  {
    id: "2",
    title: "Design Philosophy",
    type: "Guide",
    updatedAt: new Date(Date.now() - 86400000 * 5),
    description:
      "Visual language and interaction patterns for the interface. Defines glassmorphism, typography scale, and animation curves.",
    status: "beta",
    version: "1.0.0",
    author: { name: "UI Lead", avatar: "" },
    contributors: [{ name: "Frontend", avatar: "" }],
    metrics: {
      usageCount: 8,
      impactScore: 75,
      complexity: "medium",
    },
    connectedNodes: [{ id: "p1", title: "Forge OS System", type: "project" }],
  },
  {
    id: "3",
    title: "Agent Protocols",
    type: "Spec",
    updatedAt: new Date(Date.now() - 86400000 * 10),
    description:
      "Communication standards between Nexus, Socrates, and Muse. Includes JSON schema definitions for inter-agent messaging.",
    status: "stable",
    version: "3.1.2",
    author: { name: "AI Architect", avatar: "" },
    metrics: {
      usageCount: 24,
      impactScore: 99,
      complexity: "high",
    },
  },
];

const MOCK_TRAILS: ResearchTrail[] = [
  { id: "1", title: "AI Cognition", nodes: 12, updatedAt: new Date() },
];

export const ForgeLab: React.FC = () => {
  // --- Local State (Journal Pattern) ---
  const [activeTab, setActiveTab] = useState<ForgeTab>("dashboard");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeFoundation, setActiveFoundation] = useState<Foundation | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // --- Identity State ---
  const authUser = useAuthStore((state) => state.user);
  const [githubUsername, setGithubUsername] = useState<string | undefined>(undefined);

  const fetchProjects = async () => {
    try {
      const data = await forgeApi.getProjects();
      const parsedData = data.map((p) => ({
        ...p,
        updatedAt: new Date(p.updatedAt),
        dueDate: p.dueDate ? new Date(p.dueDate) : undefined,
        logs: p.logs?.map((l) => ({ ...l, date: new Date(l.date) })),
        taskBoard: p.taskBoard || { todo: [], inProgress: [], done: [] },
        links: p.links || [],
      }));
      setProjects(parsedData);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  useEffect(() => {
    if (activeTab === "projects" || activeTab === "dashboard") {
      fetchProjects();
    }
  }, [activeTab]);

  useEffect(() => {
    if (authUser?.id) {
      forgeApi
        .getUser(authUser.id)
        .then((profile) => {
          const gh = profile.connections?.find((c) => c.provider === "github");
          if (gh) setGithubUsername(gh.identifier);
        })
        .catch((err) => console.error("Failed to load user profile", err));
    } else {
      setGithubUsername(undefined);
    }
  }, [authUser?.id]);

  // --- CRUD Operations ---
  const handleCreateProject = async (data: { title: string; description: string }) => {
    setIsCreating(true);
    try {
      await forgeApi.createProject(data);
      await fetchProjects();
      setShowCreateModal(false);
    } catch (err) {
      console.error("Failed to create project", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateProject = async (id: string, data: Partial<Project>) => {
    try {
      const updated = await forgeApi.updateProject(id, data);
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      if (activeProject?.id === id) {
        setActiveProject((prev) => (prev ? { ...prev, ...updated } : null));
      }
    } catch (err) {
      console.error("Failed to update project", err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await forgeApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));

      // Force check matching ID or if we are deleting the currently viewed project
      if (activeProject?.id === id) {
        setActiveProject(null);
        setActiveTab("projects"); // Go back to list
      }
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  // Constants
  const NAV_ITEMS = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Layers },
    { id: "foundations", label: "Foundations", icon: Book },
    { id: "research", label: "Research", icon: Network },
  ];

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Scroll to top when changing views
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab, activeProject]);

  return (
    <div className="h-full flex flex-col bg-[#030304] text-white relative overflow-hidden animate-in fade-in duration-1000">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] opacity-30" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Main Content Area - Full Width & Height */}
      <div className="flex-1 h-full relative z-10 flex flex-col min-w-0 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scrollbar-hide relative z-10 pb-32"
        >
          {activeTab === "dashboard" && (
            <LabDashboard
              projects={projects}
              foundations={MOCK_FOUNDATIONS}
              trails={MOCK_TRAILS}
              setActiveTab={setActiveTab}
              setActiveProject={setActiveProject}
            />
          )}
          {activeTab === "projects" && (
            <ProjectForge
              projects={projects}
              activeProject={activeProject}
              setActiveProject={setActiveProject}
              githubUsername={githubUsername}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
              onRequestCreate={() => setShowCreateModal(true)}
            />
          )}
          {activeTab === "foundations" && (
            <FoundationLibrary
              foundations={MOCK_FOUNDATIONS}
              activeFoundation={activeFoundation}
              setActiveFoundation={setActiveFoundation}
            />
          )}
          {activeTab === "research" && <ResearchTrails />}
        </div>
      </div>

      {/* Floating Dock Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 bg-[#09090b]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-white/20">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ForgeTab)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-500 group overflow-hidden",
                activeTab === item.id
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "shrink-0 transition-colors z-10",
                  activeTab === item.id ? "text-forge-cyan" : "group-hover:text-white"
                )}
              />

              {/* Expanding Label */}
              <span
                className={cn(
                  "text-sm font-medium transition-all duration-500 ease-spring-out overflow-hidden whitespace-nowrap z-10",
                  activeTab === item.id
                    ? "max-w-[150px] opacity-100 ml-1"
                    : "max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:ml-1"
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
        isLoading={isCreating}
      />
    </div>
  );
};
