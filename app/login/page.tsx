"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 900);
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block text-2xl font-black text-[#0F0F0F] tracking-tight">2026</Link>
          <p className="text-sm text-[#0F0F0F]/50 mt-1">Revenue intelligence, live.</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-8 shadow-[0_4px_16px_0_rgb(0_0_0/0.06)]">
          <h1 className="text-xl font-black text-[#0F0F0F] mb-1">Welcome back</h1>
          <p className="text-sm text-[#0F0F0F]/50 mb-7">Sign in to your workspace</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-[#0F0F0F]/50 uppercase tracking-widest block mb-1.5">Work email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E4] bg-[#F8F7F4] text-sm text-[#0F0F0F] placeholder-[#0F0F0F]/30 outline-none focus:border-[#0F0F0F]/40 transition-colors" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#0F0F0F]/50 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs text-[#B8A060] hover:text-[#0F0F0F] transition-colors font-medium">Forgot?</Link>
              </div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E4] bg-[#F8F7F4] text-sm text-[#0F0F0F] placeholder-[#0F0F0F]/30 outline-none focus:border-[#0F0F0F]/40 transition-colors" />
            </div>
            <button type="submit" disabled={loading} className="mt-2 w-full bg-[#E8FF5A] text-[#0F0F0F] font-bold py-3 rounded-full text-sm hover:bg-[#E8FF5A]/80 transition-colors disabled:opacity-60">
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E8E8E4]" /></div>
            <div className="relative flex justify-center"><span className="bg-[#FFFFFF] px-3 text-xs text-[#0F0F0F]/30">or continue with</span></div>
          </div>
          <button type="button" onClick={() => { setLoading(true); setTimeout(() => router.push("/dashboard"), 900); }} className="w-full flex items-center justify-center gap-2.5 border border-[#E8E8E4] rounded-full py-2.5 text-sm font-semibold text-[#0F0F0F] hover:border-[#0F0F0F]/20 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>
        <p className="text-center text-sm text-[#0F0F0F]/50 mt-6">No account?{" "}<Link href="/signup" className="font-semibold text-[#0F0F0F] hover:text-[#B8A060] transition-colors">Sign up free</Link></p>
      </div>
    </div>
  );
}
