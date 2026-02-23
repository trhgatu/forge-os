"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

import type { ForgeLabContextType, ForgeTab, Project, Foundation, ResearchTrail } from "../types";

const ForgeLabContext = createContext<ForgeLabContextType | undefined>(undefined);

// MOCK DATA
const MOCK_PROJECTS: Project[] = [
  { id: "1", title: "Forge OS System", status: "active", updatedAt: new Date() },
  {
    id: "2",
    title: "Neural Core Alpha",
    status: "active",
    updatedAt: new Date(Date.now() - 86400000),
  },
];

const MOCK_FOUNDATIONS: Foundation[] = [
  { id: "1", title: "Core Principles", type: "doc", updatedAt: new Date() },
];

const MOCK_TRAILS: ResearchTrail[] = [
  { id: "1", title: "AI Cognition", nodes: 12, updatedAt: new Date() },
];

export const ForgeLabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ForgeTab>("dashboard");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const value: ForgeLabContextType = {
    activeTab,
    setActiveTab,
    projects: MOCK_PROJECTS,
    foundations: MOCK_FOUNDATIONS,
    trails: MOCK_TRAILS,
    activeProject,
    setActiveProject,
  };

  return <ForgeLabContext.Provider value={value}>{children}</ForgeLabContext.Provider>;
};

export const useForgeLab = () => {
  const context = useContext(ForgeLabContext);
  if (context === undefined) {
    throw new Error("useForgeLab must be used within a ForgeLabProvider");
  }
  return context;
};
