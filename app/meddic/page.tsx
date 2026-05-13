"use client";
import { useState } from "react";
import { Nav } from "../components/Nav";
import { Score } from "../components/Score";
import { MeddicFull } from "../components/MeddicPills";
import { SuggestionCard } from "../components/SuggestionCard";

type Field = "Metrics" | "Economic Buyer" | "Decision Criteria" | "Decision Process" | "Identify Pain" | "Champion";

const DEFINITIONS: Record<Field, { short: string; question: string }> = {
  Metrics: {
    short: "Quantified value the deal delivers",
    question: "What measurable outcome does the buyer expect? (e.g. 30% cost reduction, 2× faster close rate)",
  },
  "Economic Buyer": {
    short: "Person who controls the budget",
    question: "Who has the authority to approve and fund this purchase?",
  },
  "Decision Criteria": {
    short: "How they'll choose a vendor",
    question: "What are their formal evaluation criteria? Have you seen the scorecard?",
  },
  "Decision Process": {
    short: "Steps to reach a decision",
    question: "Who else is involved? What are the approval stages and timeline?",
  },
  "Identify Pain": {
    short: "The core problem they need solved",
    question: "What happens if they do nothing? How painful is the status quo?",
  },
  Champion: {
    short: "Internal advocate who sells for you",
    question: "Who inside the account wants this deal to close? Can they sell it without you in the room?",
  },
};

const deals = [
  {
    id: 1,
    company: "Acme Corp",
    arr: "$120k",
    score: 82,
    completed: ["Metrics", "Economic Buyer", "Identify Pain", "Champion"] as Field[],
    notes: {
      Metrics: "30% reduction in manual ops cost — confirmed by CFO.",
      "Economic Buyer": "Sarah Chen, VP Finance. Met twice. Supportive.",
      "Decision Criteria": "",
      "Decision Process": "",
      "Identify Pain": "Current process takes 3 days per report. Losing $40k/mo.",
      Champion: "David Park, RevOps Lead. Very engaged.",
    },
  },
  {
    id: 2,
    company: "NovaTech",
    arr: "$84k",
    score: 61,
    completed: ["Metrics", "Identify Pain"] as Field[],
    notes: {
      Metrics: "2× pipeline velocity projected.",
      "Economic Buyer": "",
      "Decision Criteria": "",
      "Decision Process": "",
      "Identify Pain": "Reps spending 5h/week on manual CRM updates.",
      Champion: "",
    },
  },
  {
    id: 3,
    company: "Relay AI",
    arr: "$200k",
    score: 44,
    completed: ["Economic Buyer", "Champion"] as Field[],
    notes: {
      Metrics: "",
      "Economic Buyer": "Tom Weiss, CRO. Met once.",
      "Decision Criteria": "",
      "Decision Process": "",
      "Identify Pain": "",
      Champion: "Lisa Ng, Sales Ops. Responsive.",
    },
  },
];

const gapSuggestions: Record<Field, { title: string; body: string }> = {
  Metrics: {
    title: "Quantify the value case",
    body: "Ask the champion to share current baseline metrics so you can build a shared ROI model.",
  },
  "Economic Buyer": {
    title: "Get in front of the economic buyer",
    body: "Request an intro meeting via your champion. Prepare a 5-min exec brief.",
  },
  "Decision Criteria": {
    title: "Obtain the evaluation scorecard",
    body: "Ask your champion directly: 'How will you decide between vendors?'",
  },
  "Decision Process": {
    title: "Map the approval chain",
    body: "Ask 'What does the process look like from here to signature?' before next call.",
  },
  "Identify Pain": {
    title: "Anchor on cost of inaction",
    body: "Quantify what staying on the current solution costs per quarter.",
  },
  Champion: {
    title: "Develop a champion",
    body: "Find someone who gets promoted when this deal closes and invest in enabling them.",
  },
};

export default function MeddicPage() {
  const [selectedId, setSelectedId] = useState(deals[0].id);
  const deal = deals.find((d) => d.id === selectedId)!;
  const [completed, setCompleted] = useState<Field[]>(deal.completed);

  function handleDealChange(id: number) {
    const d = deals.find((x) => x.id === id)!;
    setSelectedId(id);
    setCompleted(d.completed);
  }

  const ALL_FIELDS = Object.keys(DEFINITIONS) as Field[];
  const gaps = ALL_FIELDS.filter((f) => !completed.includes(f));

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#0F0F0F] tracking-tight">MEDDIC Tracker</h1>
          <p className="text-sm text-[#0F0F0F]/50 mt-0.5">Toggle each criterion to track qualification coverage per deal</p>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {deals.map((d) => (
            <button
              key={d.id}
              onClick={() => handleDealChange(d.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-full border text-sm font-semibold transition-colors ${
                selectedId === d.id
                  ? "bg-[#0F0F0F] text-[#F8F7F4] border-[#0F0F0F]"
                  : "bg-[#FFFFFF] text-[#0F0F0F] border-[#E8E8E4] hover:border-[#0F0F0F]/30"
              }`}
            >
              {d.company}
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: d.score >= 75 ? "#E8FF5A" : d.score >= 50 ? "#B8A060" : "#E05252" }}
              >
                {d.score}
              </span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-bold text-[#0F0F0F]">{deal.company}</p>
                  <p className="text-sm text-[#0F0F0F]/50">ARR {deal.arr}</p>
                </div>
                <Score value={deal.score} label="Health" />
              </div>
              <MeddicFull completed={completed} onChange={(f) => setCompleted(f as Field[])} />
              <p className="mt-4 text-xs text-[#0F0F0F]/35">
                {completed.length}/{ALL_FIELDS.length} criteria covered · click to toggle
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {ALL_FIELDS.map((f) => {
                const done = completed.includes(f);
                const note = deal.notes[f];
                return (
                  <div
                    key={f}
                    className={`bg-[#FFFFFF] rounded-xl border p-4 transition-all ${
                      done ? "border-[#E8FF5A]/60" : "border-[#E8E8E4]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${done ? "bg-[#E8FF5A]" : "bg-[#E8E8E4]"}`} />
                      <span className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wide">{f}</span>
                    </div>
                    <p className="text-xs text-[#0F0F0F]/50 mb-2">{DEFINITIONS[f].short}</p>
                    {note ? (
                      <p className="text-sm text-[#0F0F0F]/80 leading-relaxed">{note}</p>
                    ) : (
                      <p className="text-xs italic text-[#0F0F0F]/30">{DEFINITIONS[f].question}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#0F0F0F] rounded-2xl p-5">
              <p className="text-xs text-[#F8F7F4]/40 font-semibold uppercase tracking-widest mb-4">Coverage</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-black text-[#E8FF5A]">{completed.length}</span>
                <span className="text-[#F8F7F4]/40 text-lg mb-1">/ {ALL_FIELDS.length}</span>
              </div>
              <div className="w-full bg-[#F8F7F4]/10 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-[#E8FF5A] transition-all"
                  style={{ width: `${(completed.length / ALL_FIELDS.length) * 100}%` }}
                />
              </div>
            </div>

            {gaps.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-3 px-1">Close These Gaps</p>
                <div className="flex flex-col gap-3">
                  {gaps.map((f) => (
                    <SuggestionCard key={f} title={gapSuggestions[f].title} body={gapSuggestions[f].body} tag={f} />
                  ))}
                </div>
              </div>
            )}

            {gaps.length === 0 && (
              <div className="bg-[#E8FF5A]/20 border border-[#E8FF5A] rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-[#0F0F0F]">All criteria covered 🎉</p>
                <p className="text-xs text-[#0F0F0F]/60 mt-1">This deal is fully qualified.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
