"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Small delay to allow Zustand persist to rehydrate (if async) and avoid flash
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user) {
        // Redirect to login if not authenticated
        router.push("/login");
      }
      setIsChecking(false);
    }, 100); // 100ms buffer

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router, pathname]);

  if (isChecking) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#050508] text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-forge-cyan" />
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest animate-pulse">
            Verifying Identity...
          </div>
        </div>
      </div>
    );
  }

  // If not checking and not authenticated, we already triggered redirect.
  // But to be safe, render null if not authenticated to prevent flash of content.
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
