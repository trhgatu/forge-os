"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Background } from "@/components/system/Background";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeModule = pathname.split("/")[2] || "dashboard";

  return (
    <div className="flex h-screen w-screen text-slate-200 selection:bg-cyan-500/30 overflow-hidden gap-4">

      <Background />

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 relative h-full transition-all duration-500 ease-out p-6">
        <div className="h-full w-full max-w-[1800px] mx-auto flex flex-col">

          {/* Topbar */}
          <header className="flex justify-between items-center mb-6 px-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                Forge OS <span className="text-cyan-500">v1.0</span>
              </span>
              <div className="h-px w-8 bg-slate-800" />

              <motion.span
                key={activeModule}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-slate-300 tracking-wide capitalize"
              >
                {activeModule.replace("-", " ")}
              </motion.span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span>SYSTEM ONLINE</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
            </div>
          </header>

          {/* Content Frame */}
          <div className="flex-1 overflow-hidden relative rounded-3xl border border-white/5 bg-slate-900/20 backdrop-blur-sm shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.99 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full p-6"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
}
