"use client";
import { useState } from "react";

interface SuggestionCardProps {
  title: string;
  body: string;
  tag?: string;
  onDone?: () => void;
}

export function SuggestionCard({ title, body, tag, onDone }: SuggestionCardProps) {
  const [done, setDone] = useState(false);
  if (done) return null;
  return (
    <div className="bg-[#FFFFFF] rounded-xl border border-[#E8E8E4] border-l-4 border-l-[#B8A060] p-4 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <p className="text-sm font-semibold text-[#0F0F0F]">{title}</p>
          {tag && <span className="text-xs font-medium text-[#B8A060] bg-[#B8A060]/10 rounded-full px-2.5 py-0.5">{tag}</span>}
        </div>
        <p className="text-sm text-[#0F0F0F]/60 leading-relaxed">{body}</p>
      </div>
      <button onClick={() => { setDone(true); onDone?.(); }} className="mt-3 text-xs font-semibold text-[#0F0F0F]/40 hover:text-[#0F0F0F] transition-colors">
        Mark done ✓
      </button>
    </div>
  );
}
