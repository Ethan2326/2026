"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Nav } from "../../components/Nav";
import { Score } from "../../components/Score";
import { SuggestionCard } from "../../components/SuggestionCard";
import { MeddicFull } from "../../components/MeddicPills";

type Field = "Metrics" | "Economic Buyer" | "Decision Criteria" | "Decision Process" | "Identify Pain" | "Champion";

const DEALS: Record<string, {
  company: string; stage: string; arr: string; owner: string;
  score: number; close: string;
  contacts: { name: string; title: string; role: string; lastContact: string }[];
  meddic: Field[];
  notes: string;
  timeline: { date: string; event: string; type: "call" | "email" | "signal" | "won" | "alert" }[];
  suggestions: { title: string; body: string; tag: string }[];
}> = {
  "1": {
    company: "Acme Corp",
    stage: "Proposal",
    arr: "$120,000",
    owner: "Sarah K.",
    score: 82,
    close: "Jun 30, 2026",
    contacts: [
      { name: "David Park", title: "RevOps Lead", role: "Champion", lastContact: "2h ago" },
      { name: "Sarah Chen", title: "VP Finance", role: "Economic Buyer", lastContact: "5d ago" },
      { name: "Mike Torres", title: "CTO", role: "Technical Buyer", lastContact: "2w ago" },
    ],
    meddic: ["Metrics", "Economic Buyer", "Identify Pain", "Champion"],
    notes: "David is highly engaged. Sarah Chen met twice — supportive but needs CFO sign-off. Security review is the final gate. Push to schedule a technical workshop before June.",
    timeline: [
      { date: "Today, 10:14", event: "Call ended (34 min) — ROI model presented. 3 suggestions generated.", type: "call" },
      { date: "May 10", event: "Sarah Chen opened ROI summary email.", type: "signal" },
      { date: "May 8", event: "Proposal sent ($120k, 12-month term).", type: "email" },
      { date: "May 5", event: "Discovery call (52 min) — pain confirmed, champion engaged.", type: "call" },
      { date: "Apr 28", event: "Intro call (20 min) — qualified, moved to Proposal.", type: "call" },
    ],
    suggestions: [
      { title: "Schedule security review", body: "CTO is the last sign-off. Propose a technical workshop this week before the close date.", tag: "Next Step" },
      { title: "Get CFO introduction", body: "Sarah Chen mentioned CFO approval is needed. Ask David to broker a 15-min intro.", tag: "High Impact" },
    ],
  },
  "2": {
    company: "NovaTech",
    stage: "Discovery",
    arr: "$84,000",
    owner: "James L.",
    score: 61,
    close: "Jul 31, 2026",
    contacts: [
      { name: "Amy Wu", title: "Sales Ops Manager", role: "Champion", lastContact: "1d ago" },
      { name: "Brad Allen", title: "VP Sales", role: "Economic Buyer", lastContact: "2w ago" },
    ],
    meddic: ["Metrics", "Identify Pain"],
    notes: "Early stage. Amy is engaged but hasn't confirmed who controls budget. Need to identify decision process before sending a proposal.",
    timeline: [
      { date: "Yesterday", event: "Amy Wu opened ROI doc.", type: "signal" },
      { date: "May 9", event: "Discovery call #2 (40 min) — process pain confirmed.", type: "call" },
      { date: "May 2", event: "Intro call (25 min) — qualified.", type: "call" },
    ],
    suggestions: [
      { title: "Identify economic buyer", body: "Budget owner unknown. Ask Amy: 'Who owns the budget for this kind of initiative?'", tag: "Risk" },
      { title: "Confirm decision criteria", body: "Ask for the vendor evaluation scorecard before next call.", tag: "Risk" },
    ],
  },
  "3": {
    company: "Relay AI",
    stage: "Negotiation",
    arr: "$200,000",
    owner: "Maria T.",
    score: 44,
    close: "May 31, 2026",
    contacts: [
      { name: "Lisa Ng", title: "Sales Ops", role: "Champion", lastContact: "3d ago" },
      { name: "Tom Weiss", title: "CRO", role: "Economic Buyer", lastContact: "1w ago" },
    ],
    meddic: ["Economic Buyer", "Champion"],
    notes: "Deal is at risk. Champion went quiet after procurement pushed back on pricing. Need to re-engage Tom Weiss directly and reframe value before close date.",
    timeline: [
      { date: "May 10", event: "Deal score dropped 8 pts — champion response time increased.", type: "alert" },
      { date: "May 7", event: "Procurement requested 20% discount.", type: "email" },
      { date: "May 4", event: "Negotiation call (45 min) — pricing discussed.", type: "call" },
      { date: "Apr 25", event: "POC completed — champion signed off.", type: "signal" },
    ],
    suggestions: [
      { title: "Re-engage Tom Weiss (CRO)", body: "No exec contact in 7 days. Send a 1-page business case before end of week.", tag: "High Impact" },
      { title: "Reframe value vs. discount", body: "Counter procurement with multi-year savings vs. a one-time discount.", tag: "High Impact" },
    ],
  },
  "4": {
    company: "Stackbase",
    stage: "Closed Won",
    arr: "$60,000",
    owner: "Tom B.",
    score: 91,
    close: "May 12, 2026",
    contacts: [
      { name: "Raj Patel", title: "Head of Engineering", role: "Champion", lastContact: "Just now" },
      { name: "Chloe Marsh", title: "CFO", role: "Economic Buyer", lastContact: "2d ago" },
    ],
    meddic: ["Metrics", "Economic Buyer", "Decision Criteria", "Decision Process", "Identify Pain", "Champion"],
    notes: "Won. All MEDDIC criteria were confirmed before proposal. Smooth close — 6-week cycle. Great reference account potential.",
    timeline: [
      { date: "Today", event: "Contract signed. Closed Won! 🎉", type: "won" },
      { date: "May 10", event: "Legal review completed.", type: "signal" },
      { date: "May 6", event: "Final proposal accepted.", type: "email" },
      { date: "Apr 28", event: "Technical validation completed.", type: "call" },
    ],
    suggestions: [
      { title: "Request a case study", body: "Raj is a strong advocate. Strike while momentum is fresh — ask this week.", tag: "Next Step" },
    ],
  },
};

function typeDot(t: string) {
  const map: Record<string, string> = {
    call: "bg-[#B8A060]",
    email: "bg-[#E8E8E4] border border-[#0F0F0F]/20",
    signal: "bg-[#E8FF5A]",
    won: "bg-[#E8FF5A]",
    alert: "bg-[#E05252]",
  };
  return map[t] ?? "bg-[#E8E8E4]";
}

export default function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const deal = DEALS[id] ?? DEALS["1"];
  const [meddic, setMeddic] = useState<Field[]>(deal.meddic);
  const [notes, setNotes] = useState(deal.notes);
  const [editingNotes, setEditingNotes] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Breadcrumb + header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-sm text-[#0F0F0F]/40 hover:text-[#0F0F0F] transition-colors"
          >
            ← Pipeline
          </Link>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#0F0F0F] tracking-tight">{deal.company}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-[#0F0F0F]/40 bg-[#FFFFFF] border border-[#E8E8E4] px-2.5 py-0.5 rounded-full font-medium">
                  {deal.stage}
                </span>
                <span className="text-sm text-[#0F0F0F]/50">ARR {deal.arr}</span>
                <span className="text-sm text-[#0F0F0F]/50">Close {deal.close}</span>
                <span className="text-sm text-[#0F0F0F]/50">Owner: {deal.owner}</span>
              </div>
            </div>
            <Score value={deal.score} label="Deal Health" size="md" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left col */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* MEDDIC */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-4">
                MEDDIC · {meddic.length}/6 covered
              </p>
              <MeddicFull completed={meddic} onChange={(f) => setMeddic(f as Field[])} />
              <div className="mt-4 w-full bg-[#F8F7F4] rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-[#E8FF5A] transition-all"
                  style={{ width: `${(meddic.length / 6) * 100}%` }}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest">
                  Deal Notes
                </p>
                <button
                  onClick={() => setEditingNotes(!editingNotes)}
                  className="text-xs font-semibold text-[#B8A060] hover:text-[#0F0F0F] transition-colors"
                >
                  {editingNotes ? "Done" : "Edit"}
                </button>
              </div>
              {editingNotes ? (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-sm text-[#0F0F0F] leading-relaxed bg-[#F8F7F4] rounded-xl border border-[#E8E8E4] p-3 resize-none h-28 outline-none focus:border-[#B8A060] transition-colors"
                />
              ) : (
                <p className="text-sm text-[#0F0F0F]/70 leading-relaxed">{notes}</p>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-5">
                Activity Timeline
              </p>
              <ol className="flex flex-col gap-4">
                {deal.timeline.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${typeDot(item.type)}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#0F0F0F] leading-snug">{item.event}</p>
                    </div>
                    <span className="text-xs text-[#0F0F0F]/35 shrink-0 whitespace-nowrap">
                      {item.date}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right col */}
          <div className="flex flex-col gap-4">
            {/* Contacts */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-4">
                Contacts
              </p>
              <div className="flex flex-col gap-3">
                {deal.contacts.map((c) => (
                  <div key={c.name} className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#F8F7F4] border border-[#E8E8E4] flex items-center justify-center text-xs font-bold text-[#0F0F0F]/60 shrink-0">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F0F0F] leading-tight">{c.name}</p>
                        <p className="text-xs text-[#0F0F0F]/45">{c.title}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs bg-[#B8A060]/10 text-[#B8A060] font-medium px-2 py-0.5 rounded-full">
                        {c.role}
                      </span>
                      <p className="text-xs text-[#0F0F0F]/35 mt-1">{c.lastContact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-3 px-1">
                Top Suggestions
              </p>
              <div className="flex flex-col gap-3">
                {deal.suggestions.map((s) => (
                  <SuggestionCard key={s.title} {...s} />
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-3">
                Quick Actions
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/coaching"
                  className="flex items-center gap-2 text-sm font-semibold text-[#0F0F0F] bg-[#E8FF5A] px-4 py-2.5 rounded-full hover:bg-[#E8FF5A]/80 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E05252]" />
                  Join live coaching
                </Link>
                <Link
                  href="/meddic"
                  className="flex items-center gap-2 text-sm font-semibold text-[#0F0F0F] bg-[#F8F7F4] border border-[#E8E8E4] px-4 py-2.5 rounded-full hover:border-[#0F0F0F]/20 transition-colors"
                >
                  View full MEDDIC
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
