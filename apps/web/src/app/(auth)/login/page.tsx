'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { authService } from '@/features/auth/services/authService';
import { Button } from '@/shared/components/ui/Button';
import { GlassCard } from '@/shared/components/ui/GlassCard';
import { Input } from '@/shared/components/ui/Input';
import { useAuthStore } from '@/shared/store/authStore';

// Schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, user: authUser } = useAuthStore();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  // Reactive redirect: If already authenticated, go to dashboard
  useEffect(() => {
    if (isAuthenticated && authUser) {
      router.push('/forge/dashboard');
    }
  }, [isAuthenticated, authUser, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema as any),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { user, accessToken, refreshToken } = await authService.login(data.email, data.password);

      login(user, accessToken, refreshToken);
      toast.success('Welcome back, ' + (user.name || 'Traveller'));
      // Imperative redirect removed in favor of useEffect above

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.message || 'Login failed. Check your credentials.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
      <div className="hidden md:block space-y-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-forge-cyan/10 border border-forge-cyan/20 text-forge-cyan text-[10px] font-mono tracking-wider uppercase">
          Neural Interface Active
        </div>
        <h1 className="text-6xl font-display font-bold text-white leading-tight">
          Forge <span className="text-forge-cyan">OS</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-sm leading-relaxed">
          The ultimate workspace for digital architects and modern thinkers. Access your neural database.
        </p>
        <div className="flex gap-8 pt-4">
          <div>
            <div className="text-2xl font-bold text-white">0.1.0</div>
            <div className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Version</div>
          </div>
          <div className="w-px h-10 bg-white/5" />
          <div>
            <div className="text-2xl font-bold text-white">STABLE</div>
            <div className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Core Status</div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="md:hidden text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Forge OS</h1>
          <p className="text-gray-400 text-sm">Enter your credentials to decrypt session</p>
        </div>

        <div className="space-y-8">
          <div className="hidden md:block">
            <h2 className="text-2xl font-display font-bold text-white mb-1">System Access</h2>
            <p className="text-gray-500 text-sm">Identify yourself to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Identity / Email
                </label>
                <Input
                  {...register('email')}
                  placeholder="user@forge.os"
                  icon={<Mail size={16} />}
                  className="bg-white/[0.03] border-white/5 h-12"
                  error={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 font-mono mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Passkey
                </label>
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock size={16} />}
                  className="bg-white/[0.03] border-white/5 h-12"
                  error={!!errors.password}
                />
                {errors.password && (
                  <p className="text-xs text-red-400 font-mono mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-forge-cyan text-black hover:bg-white transition-all duration-300"
              isLoading={isLoading}
            >
              Decrypt Session <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <div className="pt-4 text-center md:text-left">
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter">
              Authorized access only. All sessions are audited by the system core.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


