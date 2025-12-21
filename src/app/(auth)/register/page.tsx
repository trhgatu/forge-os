"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

import { GlassCard } from "@/shared/components/ui/GlassCard";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAuthStore } from "@/store/auth.store";
import { apiClient } from "@/shared/lib/api-client";

// Schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

// Types
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        roleId: "676170d2cd1ce673905c879d", // Example User Role ID (Need to be real)
      };

      const response = await apiClient.post("/auth/register", payload);
      const { accessToken, refreshToken, user } = response.data;

      login(accessToken, refreshToken, user);
      toast.success("Identity initialized successfully");
      router.push("/forge/dashboard");
    } catch (error: unknown) {
      console.error(error);
      const msg = (error as ApiError).response?.data?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">
          Initialize Identity
        </h1>
        <p className="text-gray-400 text-sm">Create a new entity in the Forge system</p>
      </div>

      <GlassCard className="p-8" gradient>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Designation / Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  {...register("name")}
                  placeholder="Navigator"
                  className="pl-9 bg-black/40 border-white/5"
                  error={!!errors.name}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-400 font-mono mt-1">{errors.name.message}</p>
              )}
            </div>

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
            Create Entity <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          Already verified?{" "}
          <Link href="/login" className="text-forge-cyan hover:underline underline-offset-4">
            Access System
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
