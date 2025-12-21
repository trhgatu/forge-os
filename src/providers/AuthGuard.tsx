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
    // Small delay to prevent flash during rehydration
    const timer = setTimeout(() => {
      // Strict check: Must have both auth flag AND user data
      if (!isAuthenticated || !user) {
        router.push("/login");
      }
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]); // Removed pathname as it was unnecessary for this check

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

  // Ensure we don't render children until we're sure
  if (!isAuthenticated || !user) return null;

  return <>{children}</>;
}
