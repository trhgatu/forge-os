"use client";

import { motion } from "framer-motion";

export const Background = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-slate-950" />

    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2], x: [0, 50, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/30 rounded-full blur-[120px]"
    />

    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1], x: [0, -30, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 rounded-full blur-[100px]"
    />

    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
  </div>
);
