import {
  LayoutGrid,
  Book,
  BrainCircuit,
  Sparkles,
  Activity,
  Database,
  Settings,
  PenTool,
  Zap,
  Layers,
  Compass,
  Aperture
} from "lucide-react";

import { NavItem, Agent } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { path: "/forge/dashboard", id: "dashboard", icon: LayoutGrid, label: "Tổng Quan" },
  { path: "/forge/forge-chamber", id: "forge-chamber", icon: BrainCircuit, label: "Hội Đồng AI" },
  { path: "/forge/journal", id: "journal", icon: Book, label: "Nhật Ký" },
  { path: "/forge/creative-hub", id: "creative-hub", icon: PenTool, label: "Sáng Tạo" },
  { path: "/forge/timeline", id: "timeline", icon: Activity, label: "Dòng Thời Gian" },
  { path: "/forge/memory", id: "memory", icon: Database, label: "Ký Ức" },
  { path: "/forge/mood", id: "mood", icon: Sparkles, label: "Cảm Xúc" },
  { path: "/forge/settings", id: "settings", icon: Settings, label: "Cài Đặt" },
];


export const AGENTS: Agent[] = [
  {
    id: "architect",
    name: "Kiến Trúc Sư",
    role: "Cấu trúc & Logic",
    color: "text-cyan-400",
    accentColor: "cyan",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/50",
    gradient: "from-cyan-500 via-blue-600 to-indigo-900",
    icon: Layers,
    description: "Xây dựng trật tự từ hỗn loạn.",
    systemPrompt:
      "Bạn là Kiến Trúc Sư (The Architect)... (giữ nguyên nội dung của bạn)",
  },
  {
    id: "muse",
    name: "Nàng Thơ",
    role: "Cảm Hứng & Sáng Tạo",
    color: "text-fuchsia-400",
    accentColor: "fuchsia",
    bgColor: "bg-fuchsia-500/10",
    borderColor: "border-fuchsia-500/50",
    gradient: "from-fuchsia-500 via-pink-600 to-purple-900",
    icon: Zap,
    description: "Thắp lên ngọn lửa của những khả năng.",
    systemPrompt:
      "Bạn là Nàng Thơ (The Muse)... (giữ nguyên nội dung của bạn)",
  },
  {
    id: "sage",
    name: "Hiền Triết",
    role: "Minh Triết & Kết Nối",
    color: "text-amber-400",
    accentColor: "amber",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/50",
    gradient: "from-amber-500 via-orange-600 to-red-900",
    icon: Compass,
    description: "Kết nối những điểm ý nghĩa.",
    systemPrompt:
      "Bạn là Hiền Triết (The Sage)... (giữ nguyên nội dung của bạn)",
  },
];

export const COUNCIL_AGENT: Agent = {
  id: "council",
  name: "Hội Đồng",
  role: "Đa Chiều",
  color: "text-white",
  accentColor: "slate",
  bgColor: "bg-slate-500/10",
  borderColor: "border-white/50",
  gradient: "from-slate-200 via-slate-400 to-slate-800",
  icon: Aperture,
  description: "Triệu tập toàn bộ thực thể.",
  systemPrompt: "",
};

export const SAMPLE_PROJECTS = [
  { id: "1", title: "Dự án Tinh Vân", status: "In Progress", progress: 65, lastModified: "2h trước", tags: ["Thiết kế", "Hệ thống"] },
  { id: "2", title: "Thơ Lượng Tử", status: "Draft", progress: 30, lastModified: "1 ngày trước", tags: ["Viết lách", "Trừu tượng"] },
  { id: "3", title: "Giao Diện Thần Kinh", status: "Completed", progress: 100, lastModified: "3 ngày trước", tags: ["Dev", "AI"] },
];
