"use client";

import React from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/constants/nav";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const normalize = (path: string) =>
    path.replace(/^\/+|\/+$/g, "").split("/").pop() || "";

  const current = normalize(pathname);

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: isOpen ? 260 : 88 }}
      className="h-full relative z-50 flex flex-col py-6 px-3 border-r border-white/5 bg-slate-950/80 backdrop-blur-2xl shadow-2xl"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-8 p-1.5 rounded-full bg-slate-800 border border-white/10 text-slate-400 hover:text-white hover:scale-110 transition-all z-50 shadow-lg"
      >
        {isOpen ? <X size={12} /> : <Menu size={12} />}
      </button>

      <div className="flex items-center gap-4 mb-10 px-3 overflow-hidden whitespace-nowrap min-h-12">
        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/10">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <motion.div
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
          className="font-mythic text-xl font-semibold tracking-wider text-white"
        >
          FORGE
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto overflow-x-hidden no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = current === normalize(item.path);

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative w-full
                ${
                  isActive
                    ? "bg-white/10 text-white shadow-inner shadow-white/5"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }
              `}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                />
              )}

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center w-6 h-6 shrink-0">
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={`transition-colors duration-300 ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-400 group-hover:text-slate-300"
                  }`}
                />
              </div>

              {/* Label */}
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`text-sm tracking-wide whitespace-nowrap ${
                    isActive ? "font-medium" : "font-normal"
                  }`}
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3 overflow-hidden whitespace-nowrap px-1">
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-slate-700 to-slate-800 border border-white/10 shrink-0 shadow-lg flex items-center justify-center">
          <span className="font-mythic text-xs text-white">T</span>
        </div>

        {isOpen && (
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-300">Traveler</span>
            <span className="text-[10px] text-slate-500 font-mono">
              Level 7 • Awakened
            </span>
          </div>
        )}
      </div>
    </motion.aside>
  );
};
