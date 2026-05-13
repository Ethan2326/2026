import Link from "next/link";
import { Nav } from "./components/Nav";
import { Score } from "./components/Score";
import { SuggestionCard } from "./components/SuggestionCard";
import { MeddicPills } from "./components/MeddicPills";
import { LiveBadge } from "./components/LiveBadge";

const features = [
  {
    icon: "⚡",
    title: "Real-time deal scoring",
    body: "Every signal from your CRM, calls, and emails feeds a live score so you never miss a deal going cold.",
  },
  {
    icon: "🎯",
    title: "AI suggestions, gold-standard",
    body: "Actionable next steps surface instantly, ranked by impact. No fluff — just what moves the number.",
  },
  {
    icon: "🔵",
    title: "MEDDIC built in",
    body: "Track every qualification criterion per deal. One click to see what's covered and what's missing.",
  },
  {
    icon: "📡",
    title: "Live session coaching",
    body: "Join any active sales call. The LIVE badge tells your team when a coach is in the room.",
  },
];

const suggestions = [
  {
    title: "Re-engage economic buyer",
    body: "No contact with VP Finance in 12 days. Send a ROI summary to keep the deal moving.",
    tag: "High Impact",
  },
  {
    title: "Confirm decision criteria",
    body: "Champion hasn't shared the evaluation scorecard. Ask for it before next call.",
    tag: "Risk",
  },
  {
    title: "Schedule a technical win",
    body: "Security review is the last open gate. Propose a workshop this week.",
    tag: "Next Step",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-2">
            <LiveBadge />
            <span className="text-sm text-[#0F0F0F]/50">Coaching 3 calls right now</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#0F0F0F] max-w-4xl leading-[1.05]">
            Close more deals.{" "}
            <span className="text-[#B8A060]">Know exactly why.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#0F0F0F]/60 max-w-2xl leading-relaxed">
            2026 is a live revenue intelligence platform — real-time deal scores,
            AI suggestions, and MEDDIC tracking in one warm, fast interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/dashboard"
              className="bg-[#E8FF5A] text-[#0F0F0F] font-bold px-8 py-3.5 rounded-full text-base hover:bg-[#E8FF5A]/80 transition-colors"
            >
              See the dashboard →
            </Link>
            <Link
              href="/meddic"
              className="bg-[#FFFFFF] text-[#0F0F0F] font-semibold px-8 py-3.5 rounded-full text-base border border-[#E8E8E4] hover:border-[#0F0F0F]/20 transition-colors"
            >
              Explore MEDDIC
            </Link>
          </div>
        </div>
      </section>

      {/* Score preview strip */}
      <section className="bg-[#0F0F0F] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[#F8F7F4]/40 text-xs font-semibold uppercase tracking-widest mb-10">
            Live deal scores — right now
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Acme Corp", value: 82 },
              { label: "NovaTech", value: 61 },
              { label: "Relay AI", value: 44 },
              { label: "Stackbase", value: 91 },
            ].map((d) => (
              <div key={d.label} className="flex flex-col items-center gap-3">
                <Score value={d.value} label={d.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-black text-[#0F0F0F] text-center mb-14 tracking-tight">
          Everything you need in one place
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]"
            >
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-[#0F0F0F] mb-2">{f.title}</h3>
              <p className="text-sm text-[#0F0F0F]/55 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggestions preview */}
      <section className="bg-[#FFFFFF] border-y border-[#E8E8E4] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0F0F0F] tracking-tight mb-4">
                Suggestions that actually move deals
              </h2>
              <p className="text-[#0F0F0F]/60 leading-relaxed mb-8">
                Every suggestion is backed by signal from your pipeline — not generic playbook advice.
                The gold border means it&apos;s worth acting on today.
              </p>
              <Link
                href="/dashboard"
                className="bg-[#E8FF5A] text-[#0F0F0F] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#E8FF5A]/80 transition-colors"
              >
                View your suggestions →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {suggestions.map((s) => (
                <SuggestionCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEDDIC preview */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-8 shadow-[0_4px_16px_0_rgb(0_0_0/0.08)]">
            <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-6">
              Acme Corp · Q2 Enterprise
            </p>
            <div className="mb-6">
              <Score value={82} label="Deal Health" size="lg" />
            </div>
            <MeddicPills
              completed={["Metrics", "Economic Buyer", "Identify Pain", "Champion"]}
              readOnly
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F0F0F] tracking-tight mb-4">
              MEDDIC at a glance
            </h2>
            <p className="text-[#0F0F0F]/60 leading-relaxed mb-8">
              Toggle each qualification criterion to track coverage per deal.
              Ink-filled pill = done. Empty pill = gap to close.
            </p>
            <Link
              href="/meddic"
              className="bg-[#0F0F0F] text-[#F8F7F4] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#0F0F0F]/80 transition-colors"
            >
              Explore MEDDIC →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E8E4] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-[#0F0F0F]">2026</span>
          <p className="text-sm text-[#0F0F0F]/40">
            © {new Date().getFullYear()} 2026. Revenue intelligence, live.
          </p>
        </div>
      </footer>
    </div>
  );
}
