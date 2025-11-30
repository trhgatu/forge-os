// shared/types/os.ts

export enum View {
  DASHBOARD = "DASHBOARD",

  // Reflection Layer
  JOURNAL = "JOURNAL",
  META_JOURNAL = "META_JOURNAL",
  MEMORY = "MEMORY",
  MOOD = "MOOD",
  INSIGHTS = "INSIGHTS",

  // Timeline & Milestones
  TIMELINE = "TIMELINE",
  MILESTONES = "MILESTONES",
  YEARLY_REVIEW = "YEARLY_REVIEW",

  // Personal Systems
  GOALS = "GOALS",
  HABITS = "HABITS",
  ROUTINES = "ROUTINES",
  COMPASS = "COMPASS",
  SETTINGS = "SETTINGS",

  // Deep Work / Inner Mechanics
  FORGE_CHAMBER = "FORGE_CHAMBER",
  SHADOW_WORK = "SHADOW_WORK",

  // Social & Energy Graph
  CONNECTION = "CONNECTION",
  PRESENCE = "PRESENCE",

  // OS Internal
  DEFAULT = "DEFAULT",
}

export type ViewType = `${View}`;
