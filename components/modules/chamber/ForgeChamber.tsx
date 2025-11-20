"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCcw,
  Loader2,
  Command,
} from "lucide-react";
import { AGENTS, COUNCIL_AGENT } from "@/constants/nav";
import type { Agent, ChatMessage } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Content } from "@google/genai";

const bglinear: Record<string, string> = {
  architect:
    "radial-linear(circle at 50% 0%, rgba(6,182,212,0.15) 0%, rgba(2,6,23,0) 70%)",
  muse: "radial-linear(circle at 50% 0%, rgba(217,70,239,0.15) 0%, rgba(2,6,23,0) 70%)",
  sage: "radial-linear(circle at 50% 0%, rgba(245,158,11,0.15) 0%, rgba(2,6,23,0) 70%)",
  council:
    "radial-linear(circle at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(2,6,23,0) 80%)",
};

export const ForgeChamber = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(COUNCIL_AGENT);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const selectableAgents = [COUNCIL_AGENT, ...AGENTS];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "init",
          role: "system",
          content:
            "Hội Đồng đã được kích hoạt. Hãy chọn một Thực Thể hoặc triệu tập toàn bộ Hội Đồng.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function generateResponse(
    agent: Agent,
    history: Content[],
    responseId: string
  ) {
    try {
      const res = await fetch("/api/forge/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: history, agent }),
      });

      if (!res.ok || !res.body) {
        console.error("Forge API error", res.status);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === responseId
              ? { ...m, content: "[Hội Đồng bị gián đoạn kết nối]" }
              : m
          )
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        if (!chunkText) continue;

        full += chunkText;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === responseId ? { ...m, content: full } : m
          )
        );
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === responseId
            ? { ...m, content: "[Đã xảy ra lỗi khi triệu hồi thực thể]" }
            : m
        )
      );
    }
  }

  async function handleSend() {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    const history = [...messages, userMsg];

    setMessages(history);
    setInputValue("");
    setIsLoading(true);

    // Chuẩn hóa history sang Content[] cho Gemini
    const historyForApi: Content[] = [];

    for (const msg of history) {
      if (!msg.content.trim()) continue;
      if (msg.role === "system") continue;

      if (msg.role === "user") {
        historyForApi.push({
          role: "user",
          parts: [{ text: msg.content }],
        });
      }

      if (msg.role === "model") {
        historyForApi.push({
          role: "model",
          parts: [{ text: msg.content }],
        });
      }
    }

    try {
      if (selectedAgent.id === "council") {
        const promises = AGENTS.map(async (agent, idx) => {
          const respId = (Date.now() + idx + 1).toString();

          setMessages((prev) => [
            ...prev,
            {
              id: respId,
              role: "model",
              content: "",
              timestamp: new Date(),
              agentId: agent.id,
            },
          ]);

          await generateResponse(agent, historyForApi, respId);
        });

        await Promise.all(promises);
      } else {
        const respId = (Date.now() + 1).toString();

        setMessages((prev) => [
          ...prev,
          {
            id: respId,
            role: "model",
            content: "",
            timestamp: new Date(),
            agentId: selectedAgent.id,
          },
        ]);

        await generateResponse(selectedAgent, historyForApi, respId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const currentBackground =
    bglinear[selectedAgent.id] || bglinear["architect"];

  return (
    <div className="flex flex-col h-full relative overflow-hidden -m-6">
      {/* BG */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ background: currentBackground }}
        transition={{ duration: 1.2 }}
      />

      {/* Agent Selector */}
      <div className="relative z-10 px-6 pt-6 pb-4 border-b border-white/5 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center justify-center gap-8 overflow-x-auto no-scrollbar pb-2">
          {selectableAgents.map((agent) => {
            const active = agent.id === selectedAgent.id;

            return (
              <motion.button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                animate={{
                  scale: active ? 1 : 0.88,
                  opacity: active ? 1 : 0.5,
                  y: active ? 0 : 5,
                }}
                className="group flex flex-col items-center gap-3 transition-all shrink-0"
              >
                <div className="relative">
                  {active && (
                    <motion.div
                      layoutId="glow"
                      className="absolute inset-0 rounded-full blur-xl"
                      style={{
                        background:
                          agent.id === "council"
                            ? "rgba(255,255,255,0.6)"
                            : undefined,
                      }}
                      animate={{ opacity: 0.5 }}
                    />
                  )}

                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center bg-slate-900 border border-white/10 shadow-lg ${
                      active ? "ring-2 ring-white/40" : "grayscale"
                    }`}
                  >
                    <agent.icon
                      size={22}
                      className={
                        agent.id === "council" ? "text-white" : agent.color
                      }
                    />
                  </div>
                </div>

                <p
                  className={`text-[10px] uppercase tracking-widest ${
                    active ? "text-white" : "text-slate-500"
                  }`}
                >
                  {agent.name}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Chat Stream */}
      <div className="flex-1 overflow-hidden relative z-10">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              const isSystem = msg.role === "system";
              const agent = AGENTS.find((a) => a.id === msg.agentId);

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-4">
                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm flex items-center gap-2">
                      <Sparkles size={12} className="text-slate-500" />
                      <span className="text-[10px] text-slate-400 uppercase">
                        {msg.content}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${
                    isUser ? "flex-row-reverse text-right" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className="shrink-0 mt-1">
                    {isUser ? (
                      <div className="w-8 h-8 bg-slate-800 border border-white/10 rounded-lg flex items-center justify-center">
                        <User size={14} className="text-slate-400" />
                      </div>
                    ) : agent ? (
                      <div
                        className={`w-8 h-8 rounded-lg bg-linear-to-br ${agent.gradient} flex items-center justify-center shadow-md`}
                      >
                        <agent.icon size={14} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                        <Bot size={14} className="text-slate-500" />
                      </div>
                    )}
                  </div>

                  {/* Bubble */}
                  <div className="max-w-[80%] flex flex-col">
                    {!isUser && agent && (
                      <span
                        className={`text-[10px] mb-1 tracking-widest uppercase ${agent.color}`}
                      >
                        {agent.name}
                      </span>
                    )}

                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xl ${
                        isUser
                          ? "bg-slate-800 border border-slate-700"
                          : "bg-slate-900/70 border border-white/5 backdrop-blur-lg"
                      }`}
                    >
                      {msg.role === "model" && msg.content === "" ? (
                        <div className="flex items-center gap-2 text-slate-500">
                          <Loader2 size={14} className="animate-spin" />
                          <span className="text-xs font-mono">
                            ĐANG SUY NGẪM...
                          </span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap font-light">
                          {msg.content}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-600 mt-1 opacity-60">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-slate-950/80 border-t border-white/5 backdrop-blur-xl">
            <div className="max-w-5xl mx-auto flex items-end gap-3">
              <GlassCard className="flex-1 flex items-start gap-3 px-5 py-4 bg-slate-900/60 hover:bg-slate-900/80 shadow-inner transition-all">
                <div className="w-6 h-6 bg-slate-800 rounded-md flex items-center justify-center">
                  <selectedAgent.icon
                    size={14}
                    className={
                      selectedAgent.id === "council"
                        ? "text-white"
                        : selectedAgent.color
                    }
                  />
                </div>

                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    selectedAgent.id === "council"
                      ? "Hỏi ý kiến toàn bộ Hội Đồng..."
                      : `Hỏi ${selectedAgent.name}...`
                  }
                  className="flex-1 bg-transparent outline-none resize-none text-slate-200 placeholder-slate-600 text-base"
                  style={{ minHeight: "24px", maxHeight: "150px" }}
                />
              </GlassCard>

              <motion.button
                whileHover={{
                  scale: inputValue.trim() && !isLoading ? 1.05 : 1,
                }}
                whileTap={{
                  scale: inputValue.trim() && !isLoading ? 0.95 : 1,
                }}
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all shrink-0 ${
                  !inputValue.trim() || isLoading
                    ? "bg-slate-800 text-slate-600"
                    : selectedAgent.id === "council"
                    ? "bg-white text-slate-900 shadow-white/20"
                    : `bg-linear-to-br ${selectedAgent.gradient} text-white`
                }`}
              >
                {isLoading ? (
                  <Loader2 size={22} className="animate-spin" />
                ) : (
                  <Send size={22} />
                )}
              </motion.button>
            </div>

            <div className="flex justify-between mt-2 px-1">
              <span className="text-[10px] text-slate-600 flex items-center gap-1">
                <Command size={10} /> + Enter để gửi
              </span>

              <button
                onClick={() => setMessages([])}
                className="text-[10px] text-slate-600 hover:text-slate-400 flex items-center gap-1"
              >
                <RefreshCcw size={10} /> Làm mới phiên
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
