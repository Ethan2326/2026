"use client";
import { useState } from "react";
import { Nav } from "../components/Nav";
import { Score } from "../components/Score";
import { SuggestionCard } from "../components/SuggestionCard";
import { LiveBadge } from "../components/LiveBadge";
import { MeddicPills } from "../components/MeddicPills";

const deals = [
  {
    id: 1,
    company: "Acme Corp",
    stage: "Proposal",
    score: 82,
    arr: "$120k",
    owner: "Sarah K.",
    lastActivity: "2h ago",
    meddic: ["Metrics", "Economic Buyer", "Identify Pain", "Champion"] as const,
  },
  {
    id: 2,
    company: "NovaTech",
    stage: "Discovery",
    score: 61,
    arr: "$84k",
    owner: "James L.",
    lastActivity: "1d ago",
    meddic: ["Metrics", "Identify Pain"] as const,
  },
  {
    id: 3,
    company: "Relay AI",
    stage: "Negotiation",
    score: 44,
    arr: "$200k",
    owner: "Maria T.",
    lastActivity: "3d ago",
    meddic: ["Economic Buyer", "Champion"] as const,
  },
  {
    id: 4,
    company: "Stackbase",
    stage: "Closed Won",
    score: 91,
    arr: "$60k",
    owner: "Tom B.",
    lastActivity: "Just now",
    meddic: ["Metrics", "Economic Buyer", "Decision Criteria", "Decision Process", "Identify Pain", "Champion"] as const,
  },
];

const feed = [
  { time: "just now", event: "Acme Corp — call ended (34 min). 3 new suggestions.", type: "call" },
  { time: "12m ago", event: "NovaTech — economic buyer opened ROI doc.", type: "signal" },
  { time: "1h ago", event: "Relay AI — deal score dropped 8 pts. Champion went quiet.", type: "alert" },
  { time: "2h ago", event: "Stackbase — contract signed. 🎉 Closed won!", type: "won" },
  { time: "3h ago", event: "Acme Corp — decision criteria doc shared by champion.", type: "signal" },
];

const suggestions = [
  {
    title: "Re-engage Relay AI economic buyer",
    body: "VP Finance hasn't responded in 3 days. Send a 1-page ROI summary before Monday.",
    tag: "High Impact",
  },
  {
    title: "Confirm NovaTech decision criteria",
    body: "You haven't captured their evaluation scorecard. Ask on next call.",
    tag: "Risk",
  },
  {
    title: "Schedule Acme security review",
    body: "Security sign-off is the only open gate. Propose a technical workshop this week.",
    tag: "Next Step",
  },
];

function feedDot(type: string) {
  const map: Record<string, string> = {
    call: "bg-[#B8A060]",
    signal: "bg-[#E8FF5A]",
    alert: "bg-[#E05252]",
    won: "bg-[#E8FF5A]",
  };
  return map[type] ?? "bg-[#E8E8E4]";
}

export default function DashboardPage() {
  const [selected, setSelected] = useState(deals[0]);

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#0F0F0F] tracking-tight">Pipeline</h1>
            <p className="text-sm text-[#0F0F0F]/50 mt-0.5">4 active deals · updated live</p>
          </div>
          <LiveBadge />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: deal list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {deals.map((deal) => (
              <button
                key={deal.id}
                onClick={() => setSelected(deal)}
                className={`text-left w-full bg-[#FFFFFF] rounded-2xl border p-5 transition-all shadow-[0_1px_3px_0_rgb(0_0_0/0.06)] ${
                  selected.id === deal.id
                    ? "border-[#0F0F0F]"
                    : "border-[#E8E8E4] hover:border-[#0F0F0F]/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#0F0F0F]">{deal.company}</span>
                    <span className="text-xs text-[#0F0F0F]/40 bg-[#F8F7F4] px-2 py-0.5 rounded-full border border-[#E8E8E4]">
                      {deal.stage}
                    </span>
                  </div>
                  <Score value={deal.score} size="sm" />
                </div>
                <div className="flex items-center gap-4 text-xs text-[#0F0F0F]/50">
                  <span>ARR {deal.arr}</span>
                  <span>Owner: {deal.owner}</span>
                  <span>{deal.lastActivity}</span>
                </div>
                <div className="mt-3">
                  <MeddicPills completed={deal.meddic as any} readOnly />
                </div>
              </button>
            ))}
          </div>

          {/* Right: detail panel */}
          <div className="flex flex-col gap-4">
            {/* Selected deal score */}
            <div className="bg-[#0F0F0F] rounded-2xl p-6 flex flex-col items-center gap-2">
              <p className="text-xs text-[#F8F7F4]/40 font-semibold uppercase tracking-widest">
                {selected.company}
              </p>
              <Score value={selected.score} label="Deal Health" size="lg" />
              <div className="mt-2 w-full bg-[#F8F7F4]/10 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${selected.score}%`,
                    backgroundColor:
                      selected.score >= 75 ? "#E8FF5A" : selected.score >= 50 ? "#B8A060" : "#E05252",
                  }}
                />
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-3 px-1">
                Top Suggestions
              </p>
              <div className="flex flex-col gap-3">
                {suggestions.map((s) => (
                  <SuggestionCard key={s.title} {...s} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live feed */}
        <div className="mt-10 bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
          <div className="flex items-center gap-2 mb-5">
            <p className="text-sm font-bold text-[#0F0F0F]">Activity Feed</p>
            <LiveBadge />
          </div>
          <ol className="flex flex-col gap-4">
            {feed.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${feedDot(item.type)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0F0F0F] leading-snug">{item.event}</p>
                </div>
                <span className="text-xs text-[#0F0F0F]/35 shrink-0">{item.time}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
