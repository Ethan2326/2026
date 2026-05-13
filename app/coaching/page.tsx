"use client";
import { useState, useEffect, useRef } from "react";
import { Nav } from "../components/Nav";
import { Score } from "../components/Score";
import { SuggestionCard } from "../components/SuggestionCard";
import { LiveBadge } from "../components/LiveBadge";

const TRANSCRIPT_LINES = [
  { speaker: "Rep", text: "Thanks for making time today, Sarah. Wanted to walk through what the ROI model looks like for Acme specifically." },
  { speaker: "Prospect", text: "Sure, yeah — our CFO actually asked me to get a clearer number before we move forward." },
  { speaker: "Rep", text: "Perfect timing. Based on your current process, we're seeing teams like yours save around 12 hours per rep per week. At your team size that's roughly $180k annually." },
  { speaker: "Prospect", text: "That's higher than I expected. How are you calculating the $180k?" },
  { speaker: "Rep", text: "We use fully-loaded cost per hour from your headcount data — $45/hour times 12 hours times 83 reps. The model is transparent, I'll share the spreadsheet after." },
  { speaker: "Prospect", text: "OK. And what about implementation time? Our IT team is stretched right now." },
  { speaker: "Rep", text: "Standard deployment is 3 weeks. We handle the CRM integration — your team only needs to be involved for day one SSO setup, about 2 hours." },
  { speaker: "Prospect", text: "That's manageable. Can we loop in our security team on the next call?" },
  { speaker: "Rep", text: "Absolutely. We have a standard security questionnaire and SOC 2 Type II report ready to share today." },
  { speaker: "Prospect", text: "Great. Let me check what the process looks like on our end for vendor approval — there are a few stakeholders I need to align." },
  { speaker: "Rep", text: "Of course. Who else needs to be in the room? I'd love to understand the decision process so we can move efficiently." },
];

const SUGGESTION_TIMELINE = [
  { at: 4, title: "Ask for CFO intro", body: "CFO was mentioned — this is your economic buyer. Request a 15-min intro now while momentum is high.", tag: "High Impact" },
  { at: 7, title: "Confirm IT timeline", body: "Prospect flagged IT bandwidth. Get a specific date so implementation doesn't slip post-signature.", tag: "Risk" },
  { at: 9, title: "Send security docs now", body: "Prospect asked for security team involvement. Drop the SOC 2 + questionnaire in chat while still on the call.", tag: "Next Step" },
  { at: 11, title: "Map the decision process", body: "Multiple stakeholders mentioned. Ask: 'What does the path from here to signature look like?'", tag: "High Impact" },
];

const CALLS = [
  { id: 1, company: "Acme Corp", rep: "Sarah K.", duration: "ongoing", score: 78 },
  { id: 2, company: "NovaTech", rep: "James L.", duration: "12:34", score: 55 },
  { id: 3, company: "Relay AI", rep: "Maria T.", duration: "28:01", score: 41 },
];

export default function CoachingPage() {
  const [activeCall, setActiveCall] = useState(CALLS[0]);
  const [visibleLines, setVisibleLines] = useState(3);
  const [suggestions, setSuggestions] = useState<typeof SUGGESTION_TIMELINE>([]);
  const [elapsed, setElapsed] = useState(0);
  const [score, setScore] = useState(72);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        setVisibleLines((l) => Math.min(l + (next % 4 === 0 ? 1 : 0), TRANSCRIPT_LINES.length));
        setScore((s) => Math.min(s + (next % 8 === 0 ? 1 : 0), 95));
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const visible = SUGGESTION_TIMELINE.filter((s) => s.at <= visibleLines);
    setSuggestions(visible);
  }, [visibleLines]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [visibleLines]);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#0F0F0F] tracking-tight">Live Coaching</h1>
            <p className="text-sm text-[#0F0F0F]/50 mt-0.5">Real-time deal intelligence during your calls</p>
          </div>
          <LiveBadge />
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {CALLS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCall(c)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-sm font-semibold transition-colors ${
                activeCall.id === c.id
                  ? "bg-[#0F0F0F] text-[#F8F7F4] border-[#0F0F0F]"
                  : "bg-[#FFFFFF] text-[#0F0F0F] border-[#E8E8E4] hover:border-[#0F0F0F]/30"
              }`}
            >
              {c.duration === "ongoing" && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E05252] animate-pulse" />
              )}
              {c.company}
              <span className="text-xs opacity-60">{c.rep}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-[#0F0F0F] rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <LiveBadge />
                <div>
                  <p className="text-[#F8F7F4] font-bold">{activeCall.company}</p>
                  <p className="text-[#F8F7F4]/40 text-xs">{activeCall.rep}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[#F8F7F4]/40 text-xs uppercase tracking-widest">Duration</p>
                  <p className="text-[#E8FF5A] font-black text-xl tabular-nums">
                    {activeCall.id === 1 ? `${mm}:${ss}` : activeCall.duration}
                  </p>
                </div>
                <Score value={activeCall.id === 1 ? score : activeCall.score} size="sm" />
              </div>
            </div>

            <div
              ref={scrollRef}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 h-[420px] overflow-y-auto flex flex-col gap-4 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]"
            >
              {TRANSCRIPT_LINES.slice(0, activeCall.id === 1 ? visibleLines : TRANSCRIPT_LINES.length).map(
                (line, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${line.speaker === "Rep" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        line.speaker === "Rep"
                          ? "bg-[#E8FF5A] text-[#0F0F0F]"
                          : "bg-[#E8E8E4] text-[#0F0F0F]/60"
                      }`}
                    >
                      {line.speaker[0]}
                    </div>
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        line.speaker === "Rep"
                          ? "bg-[#0F0F0F] text-[#F8F7F4] rounded-tr-sm"
                          : "bg-[#F8F7F4] text-[#0F0F0F] rounded-tl-sm"
                      }`}
                    >
                      {line.text}
                    </div>
                  </div>
                )
              )}
              {activeCall.id === 1 && visibleLines < TRANSCRIPT_LINES.length && (
                <div className="flex gap-2 items-center px-2">
                  <span className="w-2 h-2 rounded-full bg-[#B8A060] animate-pulse" />
                  <span className="text-xs text-[#0F0F0F]/40 italic">Prospect is speaking…</span>
                </div>
              )}
            </div>

            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-3">Score over call</p>
              <div className="flex items-end gap-1 h-12">
                {[68, 70, 71, 72, 73, 73, 75, 74, 76, 77, 78, score].slice(-12).map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all"
                    style={{
                      height: `${((v - 60) / 40) * 100}%`,
                      backgroundColor: v >= 75 ? "#E8FF5A" : v >= 50 ? "#B8A060" : "#E05252",
                      opacity: 0.4 + (i / 12) * 0.6,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-sm font-bold text-[#0F0F0F]">Live Suggestions</p>
                <span className="text-xs bg-[#E8FF5A] text-[#0F0F0F] font-bold px-2 py-0.5 rounded-full">
                  {suggestions.length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {suggestions.length === 0 ? (
                  <p className="text-sm text-[#0F0F0F]/40 italic">Suggestions will appear as the call progresses…</p>
                ) : (
                  suggestions.slice().reverse().map((s) => (
                    <SuggestionCard key={s.title} title={s.title} body={s.body} tag={s.tag} />
                  ))
                )}
              </div>
            </div>

            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-4">Talk Ratio</p>
              <div className="flex gap-1 rounded-full overflow-hidden h-3 mb-3">
                <div className="bg-[#E8FF5A]" style={{ width: "42%" }} />
                <div className="bg-[#E8E8E4]" style={{ width: "58%" }} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#0F0F0F]">Rep — 42%</span>
                <span className="text-[#0F0F0F]/50">Prospect — 58%</span>
              </div>
              <p className="text-xs text-[#B8A060] mt-2">Good balance. Target is 40/60.</p>
            </div>

            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-3">Topics Detected</p>
              <div className="flex flex-wrap gap-2">
                {["ROI / Metrics", "Security", "Implementation", "Decision Process", "Stakeholders"].map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-[#F8F7F4] border border-[#E8E8E4] text-[#0F0F0F]/70 font-medium px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
