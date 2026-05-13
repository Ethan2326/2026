"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = ["Account", "Workspace", "Integrations"] as const;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", workspace: "", crm: "" });

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function next(e: React.FormEvent) {
    e.preventDefault();
    if (step < STEPS.length - 1) { setStep((s) => s + 1); return; }
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 1000);
  }

  const crms = ["Salesforce", "HubSpot", "Pipedrive", "None — I'll add later"];

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-black text-[#0F0F0F] tracking-tight">
            2026
          </Link>
          <p className="text-sm text-[#0F0F0F]/50 mt-1">Set up your account in 3 steps</p>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  i < step
                    ? "bg-[#E8FF5A] text-[#0F0F0F]"
                    : i === step
                    ? "bg-[#0F0F0F] text-[#F8F7F4]"
                    : "bg-[#E8E8E4] text-[#0F0F0F]/40"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${i === step ? "text-[#0F0F0F]" : "text-[#0F0F0F]/35"}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-[#E8E8E4]" />}
            </div>
          ))}
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-8 shadow-[0_4px_16px_0_rgb(0_0_0/0.06)]">
          <form onSubmit={next} className="flex flex-col gap-4">
            {step === 0 && (
              <>
                <h2 className="text-xl font-black text-[#0F0F0F] mb-1">Create your account</h2>
                <div>
                  <label className="text-xs font-semibold text-[#0F0F0F]/50 uppercase tracking-widest block mb-1.5">Full name</label>
                  <input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Smith" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E4] bg-[#F8F7F4] text-sm text-[#0F0F0F] placeholder-[#0F0F0F]/30 outline-none focus:border-[#0F0F0F]/40 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#0F0F0F]/50 uppercase tracking-widest block mb-1.5">Work email</label>
                  <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E4] bg-[#F8F7F4] text-sm text-[#0F0F0F] placeholder-[#0F0F0F]/30 outline-none focus:border-[#0F0F0F]/40 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#0F0F0F]/50 uppercase tracking-widest block mb-1.5">Password</label>
                  <input required type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min. 8 characters" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E4] bg-[#F8F7F4] text-sm text-[#0F0F0F] placeholder-[#0F0F0F]/30 outline-none focus:border-[#0F0F0F]/40 transition-colors" />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-xl font-black text-[#0F0F0F] mb-1">Name your workspace</h2>
                <p className="text-sm text-[#0F0F0F]/50 -mt-2 mb-2">This is usually your company name.</p>
                <div>
                  <label className="text-xs font-semibold text-[#0F0F0F]/50 uppercase tracking-widest block mb-1.5">Workspace name</label>
                  <input required value={form.workspace} onChange={(e) => update("workspace", e.target.value)} placeholder="Acme Corp" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E4] bg-[#F8F7F4] text-sm text-[#0F0F0F] placeholder-[#0F0F0F]/30 outline-none focus:border-[#0F0F0F]/40 transition-colors" />
                </div>
                <div className="bg-[#F8F7F4] rounded-xl border border-[#E8E8E4] p-4 text-xs text-[#0F0F0F]/50">
                  Your workspace URL will be{" "}
                  <span className="font-semibold text-[#0F0F0F]">
                    {form.workspace ? form.workspace.toLowerCase().replace(/\s+/g, "-") : "your-company"}
                    .2026.ai
                  </span>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-black text-[#0F0F0F] mb-1">Connect your CRM</h2>
                <p className="text-sm text-[#0F0F0F]/50 -mt-2 mb-2">2026 enriches your deals with live signals.</p>
                <div className="flex flex-col gap-2">
                  {crms.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => update("crm", c)}
                      className={`px-4 py-3 rounded-xl border text-sm font-semibold text-left transition-colors ${
                        form.crm === c
                          ? "bg-[#0F0F0F] text-[#F8F7F4] border-[#0F0F0F]"
                          : "bg-[#F8F7F4] text-[#0F0F0F] border-[#E8E8E4] hover:border-[#0F0F0F]/20"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading || (step === 2 && !form.crm)}
              className="mt-2 w-full bg-[#E8FF5A] text-[#0F0F0F] font-bold py-3 rounded-full text-sm hover:bg-[#E8FF5A]/80 transition-colors disabled:opacity-50"
            >
              {loading ? "Setting up…" : step < STEPS.length - 1 ? "Continue →" : "Launch 2026 →"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#0F0F0F]/50 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#0F0F0F] hover:text-[#B8A060] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
