import { LucideIcon } from "lucide-react";

export interface Agent {
  id: string;
  name: string;
  role: string;
  color: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
  icon: LucideIcon;
  description: string;
  systemPrompt: string;
}
