"use client";

import { useState, useEffect } from "react";
import { VisitorEcho, EchoTypeVisitor, ConnectionRole } from "../types";
import { useNotification } from "@/contexts";

// --- SIMULATION LOGIC Helper ---
const generateMockEcho = (): VisitorEcho => {
  const r = Math.random();
  let type: EchoTypeVisitor = "anonymous";
  let role: ConnectionRole | undefined = undefined;
  let connectionName = undefined;

  if (r > 0.9) {
    type = "connection";
    const roles: ConnectionRole[] = ["Catalyst", "Mirror", "Ghost", "Healer"];
    role = roles[Math.floor(Math.random() * roles.length)];
    connectionName = "Linked Soul";
  } else if (r > 0.7) {
    type = "known";
    connectionName = "Returning Visitor";
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    type,
    connectionName,
    connectionRole: role,
    distance: Math.floor(Math.random() * 80) + 10, // 10% to 90% radius
    angle: Math.random() * 360,
    seasonContext: "Winter",
    duration: Math.floor(Math.random() * 120),
    pageVisited: "/memory/123",
  };
};

export const usePresenceSimulation = () => {
  const [echoes, setEchoes] = useState<VisitorEcho[]>([]);
  const { notify } = useNotification();

  // Use state initializer for stable random values (avoiding impure usage in render/useMemo)
  const [stars] = useState(() => {
    return Array.from({ length: 50 }, () => ({
      width: Math.random() * 2 + "px",
      height: Math.random() * 2 + "px",
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      opacity: Math.random() * 0.5 + 0.1,
      animationDuration: `${Math.random() * 5 + 2}s`,
    }));
  });

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance to detect visitor
      if (Math.random() > 0.6) {
        const newEcho = generateMockEcho();
        setEchoes((prev) => [...prev, newEcho]);

        // Trigger Whisper OS
        if (newEcho.type === "connection") {
          notify({
            type: "event",
            source: "network",
            message: `Connection Node '${newEcho.connectionRole}' detected nearby.`,
          });
        } else if (newEcho.type === "known") {
          notify({
            type: "signal",
            source: "network",
            message: "A familiar frequency has returned.",
          });
        } else {
          notify({
            type: "whisper",
            source: "network",
            message: "A faint echo brushed against the perimeter.",
          });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [notify]);

  // Clean up old echoes
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setEchoes((prev) => prev.filter((e) => now - e.timestamp.getTime() < 6000)); // Remove after 6s (faded out)
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  return { echoes, stars };
};
