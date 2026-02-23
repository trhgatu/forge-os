"use client";

import { useState, useRef, useEffect } from "react";
import { GlassCard } from "@/shared/ui/GlassCard";
/* import { streamChatResponse } from "@/lib/geminiService"; */
import { cn } from "@/shared/lib/utils";
import {
  Send,
  User,
  PanelRightOpen,
  PanelRightClose,
  ToggleLeft,
  ToggleRight,
  Sparkles,
} from "lucide-react";
/* import type { GenerateContentResponse } from "@google/genai"; */
import { AgentDock, AGENTS } from "@/features/chamber/components/AgentDock";
import type { Message, AgentId, Agent } from "@/shared/types";

export const ForgeChamber = () => {
  const [input, setInput] = useState("");
  const [messages /* setMessages */] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      agentId: "nexus",
      text: "Forge Systems Online. I am ready to assist with your cognitive processes.",
    },
  ]);
  const [isStreaming /* setIsStreaming */] = useState(false);
  const [isDockOpen, setIsDockOpen] = useState(true);
  const [isRoundtableMode, setIsRoundtableMode] = useState(false);
  const [activeAgentIds /* setActiveAgentIds */] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAgent = (id?: AgentId): Agent => AGENTS.find((a) => a.id === id) || AGENTS[0];

  /* const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);

    const history = messages.map((m) => ({ role: m.role, text: m.text }));

    try {
      if (isRoundtableMode) {
        // --- Multi-agent roundtable mode ---
        const roundtableAgents = AGENTS.filter((a) =>
          ["muse", "socrates", "cipher"].includes(a.id)
        );

        const newIds: Record<string, string> = {};
        const newMessages: Message[] = [];

        roundtableAgents.forEach((agent) => {
          const msgId = `msg-${agent.id}-${Date.now()}`;
          newIds[agent.id] = msgId;
          newMessages.push({
            id: msgId,
            role: "model",
            agentId: agent.id as AgentId,
            text: "",
          });
        });

        setMessages((prev) => [...prev, ...newMessages]);
        setActiveAgentIds(roundtableAgents.map((a) => a.id));

        const promises = roundtableAgents.map(async (agent, index) => {
          // Stagger để cảm giác như từng agent lần lượt nói
          await new Promise((r) => setTimeout(r, index * 400));

          const personaPrompt = `${agent.systemPrompt}
User Query: "${userMsg.text}"
Respond to the user in your specific persona. Keep it under 100 words.`;

          const result = await streamChatResponse([], personaPrompt);
          let fullText = "";

          for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
              fullText += c.text;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === newIds[agent.id]
                    ? { ...msg, text: fullText }
                    : msg
                )
              );
            }
          }
        });

        await Promise.all(promises);
      } else {
        // --- Single agent (Nexus core) mode ---
        const modelMsgId = (Date.now() + 1).toString();
        setMessages((prev) => [
          ...prev,
          { id: modelMsgId, role: "model", agentId: "nexus", text: "" },
        ]);
        setActiveAgentIds(["nexus"]);

        const result = await streamChatResponse(history, userMsg.text);
        let fullText = "";

        for await (const chunk of result) {
          const c = chunk as GenerateContentResponse;
          if (c.text) {
            fullText += c.text;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === modelMsgId ? { ...msg, text: fullText } : msg
              )
            );
          }
        }
      }
    } catch (error) {
      console.error("Chat error", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "model",
          text: "Error: Neural Core Interrupted.",
        },
      ]);
    } finally {
      setIsStreaming(false);
      setActiveAgentIds([]);
    }
  }; */

  return (
    <div className="h-full flex relative overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 bg-linear-to-b from-transparent to-black/20">
        <div className="shrink-0 p-4 border-b border-white/5 flex items-center justify-between bg-white/2 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] animate-pulse bg-current",
                  isRoundtableMode ? "text-fuchsia-500" : "text-forge-cyan"
                )}
              />
              <span className="font-mono text-sm text-gray-300 tracking-wider uppercase">
                {isRoundtableMode ? "Roundtable Protocol" : "Nexus Core"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsRoundtableMode((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/20 hover:bg-white/5 transition-all group"
            >
              {isRoundtableMode ? (
                <ToggleRight className="text-fuchsia-500" />
              ) : (
                <ToggleLeft className="text-gray-500" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  isRoundtableMode ? "text-white" : "text-gray-500"
                )}
              >
                Multi-Agent
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600 font-mono hidden md:block">
              Gemini 2.5 Flash // Latency: 12ms
            </span>
            <button
              type="button"
              onClick={() => setIsDockOpen((prev) => !prev)}
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                isDockOpen
                  ? "text-forge-cyan bg-forge-cyan/10"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              {isDockOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
            </button>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 relative">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            const agent = isUser ? null : getAgent(msg.agentId);
            const Icon = agent?.icon || User;

            return (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-4 animate-in slide-in-from-bottom-2 duration-500",
                  isUser ? "flex-row-reverse" : ""
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg relative group",
                    isUser
                      ? "bg-linear-to-br from-gray-700 to-black border border-white/10"
                      : `bg-linear-to-br ${agent?.gradient} shadow-[0_0_15px_rgba(0,0,0,0.3)]`
                  )}
                >
                  <Icon size={16} className={isUser ? "text-gray-300" : "text-white"} />
                  {!isUser && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur border border-white/10 rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {agent?.name}
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "max-w-[85%] md:max-w-[70%] p-5 rounded-2xl text-sm leading-relaxed shadow-sm relative backdrop-blur-md transition-all duration-300",
                    isUser
                      ? "bg-white/10 text-white rounded-tr-none border border-white/5 hover:bg-white/15"
                      : `${agent?.bg} ${agent?.color.replace(
                          "text-",
                          "text-gray-100 "
                        )} border ${agent?.border} rounded-tl-none hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]`
                  )}
                >
                  {!isUser && isRoundtableMode && (
                    <div
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider mb-2 opacity-70",
                        agent?.color
                      )}
                    >
                      {agent?.name}
                    </div>
                  )}

                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {isStreaming &&
                    !isUser &&
                    activeAgentIds.includes(agent?.id || "") &&
                    msg.text.length > 0 && (
                      <span className="inline-block w-1.5 h-3 ml-1 bg-current animate-pulse align-middle" />
                    )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0 p-6 z-20">
          <GlassCard className="bg-black/60 backdrop-blur-2xl border-white/10 shadow-2xl" noPadding>
            <form
              /* onSubmit={handleSubmit} */
              className="relative flex items-center"
            >
              <button
                type="button"
                className="p-4 text-gray-500 hover:text-forge-cyan transition-colors group"
              >
                <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                  <Sparkles size={12} />
                </div>
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isRoundtableMode ? "Broadcast query to agent cluster..." : "Input neural query..."
                }
                className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 py-4 text-sm font-medium"
                disabled={isStreaming}
              />

              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className={cn(
                  "m-2 p-2.5 rounded-xl transition-all duration-300",
                  input.trim() && !isStreaming
                    ? "bg-forge-accent text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:scale-105"
                    : "bg-white/5 text-gray-600 cursor-not-allowed"
                )}
              >
                <Send size={16} />
              </button>
            </form>
          </GlassCard>

          <div className="text-center mt-2 flex justify-center gap-4">
            <p className="text-[10px] text-gray-600 font-mono">
              {isRoundtableMode
                ? "Cluster Processing Active • High Token Usage"
                : "Nexus Core Active"}
            </p>
          </div>
        </div>
      </div>

      {/* Right Agent Dock */}
      <AgentDock isOpen={isDockOpen} activeAgentIds={activeAgentIds} />
    </div>
  );
};
