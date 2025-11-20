"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Sun, Clock, Quote, Brain } from "lucide-react";

export const Dashboard = () => {
  const router = useRouter();
  const date = new Date();
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateString = date.toLocaleDateString("vi-VN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="h-full pr-2 pb-20">

      {/* Greeting */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-light text-white mb-2"
        >
          Chào mừng trở lại,{" "}
          <span className="font-mythic text-cyan-400">Traveler</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg font-light"
        >
          Độ minh mẫn của bạn đang ở mức 84%. Forge đã sẵn sàng.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[180px]">

        {/* TIME WIDGET */}
        <GlassCard className="md:col-span-2 row-span-1 flex flex-col justify-between p-6 bg-linear-to-br from-cyan-900/20 to-blue-900/20">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-5xl font-light tracking-tight text-white font-mono">
                {timeString}
              </span>
              <span className="text-cyan-200/60 text-sm mt-1 capitalize">
                {dateString}
              </span>
            </div>
            <Sun className="text-amber-400" size={32} />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-auto">
            <Clock size={12} />
            <span>THỜI GIAN HOẠT ĐỘNG: 42h 12m</span>
          </div>
        </GlassCard>

        {/* Quick Action: Journal */}
        <GlassCard
          onClick={() => router.push("/forge/journal")}
          hoverEffect={true}
          className="group flex flex-col justify-between p-6 relative overflow-hidden"
        >
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <Brain size={120} />
          </div>

          <div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <ArrowRight
                size={20}
                className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
              />
            </div>

            <h3 className="text-lg font-medium text-white">Nhật Ký Mới</h3>
          </div>

          <p className="text-sm text-slate-400">
            Phản chiếu lại ngày hôm nay.
          </p>
        </GlassCard>

        {/* Quick Action: Forge Chamber */}
        <GlassCard
          onClick={() => router.push("/forge/chamber")}
          hoverEffect={true}
          className="group flex flex-col justify-between p-6 bg-linear-to-br from-fuchsia-900/10 to-purple-900/10"
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-fuchsia-400 group-hover:bg-fuchsia-500 group-hover:text-white transition-colors">
              <Brain size={20} />
            </div>

            <h3 className="text-lg font-medium text-white">Hỏi Hội Đồng AI</h3>
          </div>

          <p className="text-sm text-slate-400">Trò chuyện với Kiến Trúc Sư.</p>
        </GlassCard>

        {/* Daily Quote */}
        <GlassCard className="md:col-span-2 row-span-1 p-8 flex items-center justify-center text-center relative">
          <Quote className="absolute top-6 left-6 text-white/5" size={48} />

          <div>
            <p className="text-xl font-mythic italic text-slate-200 leading-relaxed">
              &quot;Tâm trí không phải là chiếc bình cần được lấp đầy, mà là ngọn lửa
              cần được thắp sáng.&quot;
            </p>

            <p className="mt-4 text-sm text-slate-500 font-mono uppercase tracking-widest">
              — Plutarch
            </p>
          </div>
        </GlassCard>

        {/* STAT GRAPH */}
        <GlassCard className="md:col-span-2 row-span-1 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wide">
              Tải Nhận Thức
            </h3>

            <div className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-mono">
              TỐI ƯU
            </div>
          </div>

          <div className="flex-1 flex items-end gap-1 h-full">
            {[30, 45, 35, 60, 50, 75, 65, 80, 55, 45, 60, 50].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="flex-1 bg-slate-700/50 hover:bg-cyan-500/50 rounded-t-sm transition-colors cursor-crosshair"
              />
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
};
