"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowRight, Lock, Mail } from "lucide-react";

import { GlassCard } from "@/shared/components/ui/GlassCard";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAuthStore } from "@/store/auth.store";
import { apiClient } from "@/shared/lib/api-client";

// Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Types
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/login", data);

      const { accessToken, refreshToken } = response.data;

      // Fetch User Profile immediately
      const profileResponse = await apiClient.get("/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userData = profileResponse.data.data; // Wrapper: { status, message, data: { ... } }

      login(accessToken, refreshToken, userData);
      toast.success("Welcome back to Forge OS");
      router.push("/forge/dashboard");
    } catch (error: unknown) {
      console.error(error);
      const apiError = error as ApiError;
      // If error came from login (401), use specific message. Otherwise standard fallback.
      const msg =
        apiError.response?.data?.message ||
        "Authentication failed. Please check your network or credentials.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">
          System Access
        </h1>
        <p className="text-gray-400 text-sm">Enter your credentials to decrypt session</p>
      </div>

      <GlassCard className="p-8" gradient>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Identity / Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  {...register("email")}
                  placeholder="user@forge.os"
                  className="pl-9 bg-black/40 border-white/5"
                  error={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 font-mono mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Passkey
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 bg-black/40 border-white/5"
                  error={!!errors.password}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 font-mono mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-linear-to-r from-forge-cyan to-blue-500 hover:opacity-90 transition-opacity"
            isLoading={isLoading}
          >
            Authenticate <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
