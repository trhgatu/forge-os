import { LucideIcon } from "lucide-react";

export type AgentId = 'nexus' | 'socrates' | 'muse' | 'cipher' | 'user';

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  status: 'idle' | 'thinking' | 'speaking' | 'offline';
  icon: LucideIcon;
  color: string; // Tailwind text class (e.g., 'text-amber-400')
  bg: string; // Tailwind bg class for bubbles
  border: string; // Tailwind border class
  gradient: string; // Tailwind gradient classes for avatar
  systemPrompt: string; // Personality instruction
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  agentId?: AgentId; // If undefined, assumes 'nexus' (default system)
  text: string;
  timestamp?: number;
}