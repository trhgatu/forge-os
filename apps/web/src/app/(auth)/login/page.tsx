'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Fingerprint, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useSound, useTheme } from '@/contexts';
import { authService } from '@/features/auth/services/authService';
import { useAuthStore } from '@/shared/store/authStore';

// Schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { playSound } = useSound();
  const { theme } = useTheme();
  const { isAuthenticated, user: authUser } = useAuthStore();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

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
      playSound('success');
      toast.success('Welcome back, ' + (user.name || 'Traveller'));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      playSound('error');
      const message = error.response?.data?.message || 'Login failed. Check your credentials.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const quote = "the quiet mind is a creative mind.";
  let charGlobalIndex = 0;

  return (
    <div className="w-full max-w-[1400px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 font-sans">
      
      {/* Left Column (lg:col-span-5): Pure Empty Space for Unobstructed Sumi-e Art */}
      <div className="lg:col-span-5 hidden lg:block" />

      {/* Right Column (lg:col-span-7): Unified Vertical Pillar of Branding, Quote & Login Form */}
      <div className="lg:col-span-7 flex flex-col items-end text-right relative w-full select-none z-20">
        
        <div className="space-y-6 relative z-10 w-full flex flex-col items-end">
          
          {/* Chapter / Phase label */}
          <div className="flex items-center gap-4 mb-2 w-full justify-end">
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-zinc-500/80 dark:text-white/40 font-bold uppercase">
              [ CHAPTER 0 : THE GATEWAY ]
            </span>
            <div className="h-[1px] w-12 bg-black/10 dark:bg-white/10" />
          </div>

          {/* Satori Outline Typography - Large Size matching Philosophy */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light uppercase tracking-tighter leading-[0.85] lg:leading-[0.8] text-zinc-900 dark:text-white text-right">
            <span className="block">THE WAY OF</span>
            <span
              className="block text-transparent mr-[5%] md:mr-[10%] transition-all duration-700"
              style={{
                WebkitTextStroke: isDark
                  ? '1.5px rgba(255, 255, 255, 0.7)'
                  : '1.5px rgba(0, 0, 0, 0.7)',
              }}
            >
              SATORI.
            </span>
          </h2>

          {/* Character-by-character Ink Reveal Quote */}
          <div className="max-w-xl pt-2 text-right">
            <blockquote className="font-caveat text-3xl sm:text-4xl text-zinc-500/80 dark:text-white/60 tracking-normal lowercase pt-2 leading-normal">
              {quote.split(' ').map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                  {word.split('').map((char, charIndex) => {
                    const currentIndex = charGlobalIndex++;
                    return (
                      <span
                        key={charIndex}
                        className="inline-block transition-all duration-700 ease-out"
                        style={{
                          opacity: mounted ? 1 : 0,
                          filter: mounted ? 'blur(0px)' : 'blur(8px)',
                          transitionDelay: `${currentIndex * 15}ms`,
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              ))}
            </blockquote>
          </div>

          {/* Meditative Borderless Calligraphic Login Form directly below the title block */}
          <div className="w-full max-w-md mt-10 text-left select-text relative border-t border-black/10 dark:border-white/10 pt-8">
            
            {/* Minimalist Sub-Header */}
            <div className="mb-8 select-none flex items-center justify-between">
              <h3 className="text-[10px] font-bold dark:text-white text-zinc-900 tracking-[0.2em] uppercase font-sans">IDENTITY SECURE</h3>
              <span className="text-[9px] dark:text-zinc-500 text-zinc-400 font-mono tracking-widest uppercase">SYS.PRCL.0</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                
                {/* Email Input - Underline Calligraphic Style */}
                <div className="space-y-1 relative group">
                  <label className="text-[9px] font-sans font-black dark:text-zinc-500 text-zinc-400 uppercase tracking-[0.15em] block">
                    TRAVELLER IDENTITY
                  </label>
                  <div className="relative flex items-center bg-transparent border-b border-black/10 dark:border-white/10 focus-within:border-red-700/50 dark:focus-within:border-red-500/50 transition-all duration-300 py-2.5">
                    <div className="text-zinc-400 dark:text-zinc-600 group-focus-within:text-red-700 dark:group-focus-within:text-red-500 transition-colors mr-3">
                      <Fingerprint size={16} />
                    </div>
                    <input
                      {...register('email')}
                      placeholder="user@example.com"
                      className="w-full bg-transparent border-none text-sm font-sans p-0 focus:outline-none focus:ring-0 dark:text-white text-zinc-900 dark:placeholder-zinc-800 placeholder-zinc-300"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[10px] text-red-700 dark:text-red-500 font-sans italic mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Input - Underline Calligraphic Style */}
                <div className="space-y-1 relative group">
                  <label className="text-[9px] font-sans font-black dark:text-zinc-500 text-zinc-400 uppercase tracking-[0.15em] block">
                    SCROLL PASSKEY
                  </label>
                  <div className="relative flex items-center bg-transparent border-b border-black/10 dark:border-white/10 focus-within:border-red-700/50 dark:focus-within:border-red-500/50 transition-all duration-300 py-2.5">
                    <div className="text-zinc-400 dark:text-zinc-600 group-focus-within:text-red-700 dark:group-focus-within:text-red-500 transition-colors mr-3">
                      <Key size={16} />
                    </div>
                    <input
                      {...register('password')}
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent border-none text-sm font-sans p-0 focus:outline-none focus:ring-0 dark:text-white text-zinc-900 dark:placeholder-zinc-800 placeholder-zinc-300"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-red-700 dark:text-red-500 font-sans italic mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button - Sharp Calligraphic Thin Border */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    w-full cursor-pointer py-3.5
                    border border-red-700 dark:border-red-500/50
                    bg-transparent hover:bg-red-700/5 dark:hover:bg-red-500/5
                    active:scale-[0.98] transition-all duration-300
                    text-red-700 dark:text-red-500 font-sans text-[10px] font-black tracking-[0.3em] uppercase
                  "
                  onClick={() => playSound('click')}
                >
                  {isLoading ? 'OPENING...' : 'ENTER DOJO'}
                </button>
              </div>
            </form>

          </div>

        </div>
      </div>
      
    </div>
  );
}
