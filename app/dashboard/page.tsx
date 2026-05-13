"use client";
import { useState } from "react";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Score } from "../components/Score";
import { SuggestionCard } from "../components/SuggestionCard";
import { LiveBadge } from "../components/LiveBadge";
import { MeddicPills } from "../components/MeddicPills";
import { DEALS, scoreColor, activityDotClass } from "../../lib/data";

const feed = [
  { time: "just now", event: "Acme Corp — call ended (34 min). 3 new suggestions.", type: "call" },
  { time: "12m ago", event: "NovaTech — economic buyer opened ROI doc.", type: "signal" },
  { time: "1h ago", event: "Relay AI — deal score dropped 8 pts. Champion went quiet.", type: "alert" },
  { time: "2h ago", event: "Stackbase — contract signed. 🎉 Closed won!", type: "won" },
  { time: "3h ago", event: "Acme Corp — decision criteria doc shared by champion.", type: "signal" },
];

const globalSuggestions = [
  { title: "Re-engage Relay AI economic buyer", body: "VP Finance hasn't responded in 3 days. Send a 1-page ROI summary before Monday.", tag: "High Impact" },
  { title: "Confirm NovaTech decision criteria", body: "You haven't captured their evaluation scorecard. Ask on next call.", tag: "Risk" },
  { title: "Schedule Acme security review", body: "Security sign-off is the only open gate. Propose a technical workshop this week.", tag: "Next Step" },
];

const STAGES = ["Discovery", "Proposal", "Negotiation", "Closed Won"];

type ViewMode = "list" | "board";

export default function DashboardPage() {
  const [selected, setSelected] = useState(DEALS[0]);
  const [view, setView] = useState<ViewMode>("list");

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#0F0F0F] tracking-tight">Pipeline</h1>
            <p className="text-sm text-[#0F0F0F]/50 mt-0.5">
              {DEALS.length} deals · ${(DEALS.reduce((a, d) => a + d.arrRaw, 0) / 1000).toFixed(0)}k ARR · updated live
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#FFFFFF] border border-[#E8E8E4] rounded-full p-1 gap-1">
              {(["list", "board"] as ViewMode[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors capitalize ${
                    view === v ? "bg-[#0F0F0F] text-[#F8F7F4]" : "text-[#0F0F0F]/50 hover:text-[#0F0F0F]"
                  }`}
                >
                  {v === "list" ? "≡ List" : "⊞ Board"}
                </button>
              ))}
            </div>
            <LiveBadge />
          </div>
        </div>

        {view === "list" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {DEALS.map((deal) => (
                <button
                  key={deal.id}
                  onClick={() => setSelected(deal)}
                  className={`text-left w-full bg-[#FFFFFF] rounded-2xl border p-5 transition-all shadow-[0_1px_3px_0_rgb(0_0_0/0.06)] ${
                    selected.id === deal.id ? "border-[#0F0F0F]" : "border-[#E8E8E4] hover:border-[#0F0F0F]/20"
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
                  <div className="mt-3 flex items-center justify-between">
                    <MeddicPills completed={deal.meddic} readOnly />
                    <Link
                      href={`/dashboard/${deal.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-[#B8A060] hover:text-[#0F0F0F] transition-colors shrink-0 ml-3"
                    >
                      View →
                    </Link>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-[#0F0F0F] rounded-2xl p-6 flex flex-col items-center gap-2">
                <p className="text-xs text-[#F8F7F4]/40 font-semibold uppercase tracking-widest">
                  {selected.company}
                </p>
                <Score value={selected.score} label="Deal Health" size="lg" />
                <div className="mt-2 w-full bg-[#F8F7F4]/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${selected.score}%`, backgroundColor: scoreColor(selected.score) }}
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-3 px-1">
                  Top Suggestions
                </p>
                <div className="flex flex-col gap-3">
                  {globalSuggestions.map((s) => (
                    <SuggestionCard key={s.title} {...s} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "board" && (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {STAGES.map((stage) => {
                const stageDeals = DEALS.filter((d) => d.stage === stage);
                return (
                  <div key={stage} className="w-64 flex flex-col gap-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-bold text-[#0F0F0F] uppercase tracking-widest">{stage}</span>
                      <span className="text-xs text-[#0F0F0F]/40 font-medium">{stageDeals.length}</span>
                    </div>
                    {stageDeals.length === 0 ? (
                      <div className="bg-[#FFFFFF] border-2 border-dashed border-[#E8E8E4] rounded-2xl p-6 text-center">
                        <p className="text-xs text-[#0F0F0F]/30">No deals</p>
                      </div>
                    ) : (
                      stageDeals.map((deal) => (
                        <Link
                          key={deal.id}
                          href={`/dashboard/${deal.id}`}
                          className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-4 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)] hover:border-[#0F0F0F]/20 transition-all block"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-[#0F0F0F] text-sm">{deal.company}</span>
                            <span
                              className="text-base font-black tabular-nums"
                              style={{ color: scoreColor(deal.score) }}
                            >
                              {deal.score}
                            </span>
                          </div>
                          <p className="text-xs text-[#0F0F0F]/50 mb-3">{deal.arr} · {deal.owner}</p>
                          <MeddicPills completed={deal.meddic} readOnly />
                          <div className="mt-2 w-full bg-[#F8F7F4] rounded-full h-1">
                            <div
                              className="h-1 rounded-full"
                              style={{ width: `${(deal.meddic.length / 6) * 100}%`, backgroundColor: scoreColor(deal.score) }}
                            />
                          </div>
                        </Link>
                      ))
                    )}
                    {stageDeals.length > 0 && (
                      <div className="px-1 pt-1 border-t border-[#E8E8E4]">
                        <p className="text-xs text-[#0F0F0F]/40 font-medium">
                          ${(stageDeals.reduce((a, d) => a + d.arrRaw, 0) / 1000).toFixed(0)}k total
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-10 bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
          <div className="flex items-center gap-2 mb-5">
            <p className="text-sm font-bold text-[#0F0F0F]">Activity Feed</p>
            <LiveBadge />
          </div>
          <ol className="flex flex-col gap-4">
            {feed.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${activityDotClass(item.type as any)}`} />
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
