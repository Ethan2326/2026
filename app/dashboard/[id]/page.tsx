"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Nav } from "../../components/Nav";
import { Score } from "../../components/Score";
import { SuggestionCard } from "../../components/SuggestionCard";
import { MeddicFull } from "../../components/MeddicPills";
import { getDeal, activityDotClass, type MeddicField } from "../../../lib/data";

export default function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const base = getDeal(id) ?? getDeal(1)!;

  const [meddic, setMeddic] = useState<MeddicField[]>(base.meddic);
  const [notes, setNotes] = useState(base.notes);
  const [editingNotes, setEditingNotes] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-[#0F0F0F]/40 hover:text-[#0F0F0F] transition-colors">
            ← Pipeline
          </Link>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#0F0F0F] tracking-tight">{base.company}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <span className="text-xs text-[#0F0F0F]/40 bg-[#FFFFFF] border border-[#E8E8E4] px-2.5 py-0.5 rounded-full font-medium">
                  {base.stage}
                </span>
                <span className="text-sm text-[#0F0F0F]/50">ARR {base.arr}</span>
                <span className="text-sm text-[#0F0F0F]/50">Close {base.close}</span>
                <span className="text-sm text-[#0F0F0F]/50">Owner: {base.owner}</span>
              </div>
            </div>
            <Score value={base.score} label="Deal Health" size="md" />
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
              <MeddicFull completed={meddic} onChange={(f) => setMeddic(f as MeddicField[])} />
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
                <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest">Deal Notes</p>
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
                {base.timeline.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${activityDotClass(item.type)}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#0F0F0F] leading-snug">{item.event}</p>
                    </div>
                    <span className="text-xs text-[#0F0F0F]/35 shrink-0 whitespace-nowrap">{item.date}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right col */}
          <div className="flex flex-col gap-4">
            {/* Contacts */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-4">Contacts</p>
              <div className="flex flex-col gap-3">
                {base.contacts.map((c) => (
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
                {base.suggestions.map((s) => (
                  <SuggestionCard key={s.title} {...s} />
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-3">Quick Actions</p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/coaching"
                  className="flex items-center gap-2 text-sm font-semibold text-[#0F0F0F] bg-[#E8FF5A] px-4 py-2.5 rounded-full hover:bg-[#E8FF5A]/80 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E05252] animate-pulse" />
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
