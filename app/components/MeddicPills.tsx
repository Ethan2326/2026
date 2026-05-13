"use client";
import { useState } from "react";

const FIELDS = ["Metrics", "Economic Buyer", "Decision Criteria", "Decision Process", "Identify Pain", "Champion"] as const;
type Field = (typeof FIELDS)[number];

const SHORT: Record<Field, string> = {
  "Metrics": "M",
  "Economic Buyer": "E",
  "Decision Criteria": "D",
  "Decision Process": "D",
  "Identify Pain": "I",
  "Champion": "C",
};

interface MeddicPillsProps {
  completed?: Field[];
  onChange?: (fields: Field[]) => void;
  readOnly?: boolean;
}

export function MeddicPills({ completed = [], onChange, readOnly = false }: MeddicPillsProps) {
  const [active, setActive] = useState<Field[]>(completed);

  function toggle(f: Field) {
    if (readOnly) return;
    const next = active.includes(f) ? active.filter((x) => x !== f) : [...active, f];
    setActive(next);
    onChange?.(next);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {FIELDS.map((f) => {
        const on = active.includes(f);
        return (
          <button
            key={f}
            onClick={() => toggle(f)}
            title={f}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors select-none ${
              on
                ? "bg-[#0F0F0F] text-[#F8F7F4]"
                : "bg-[#F8F7F4] text-[#0F0F0F] border border-[#E8E8E4] hover:border-[#0F0F0F]/30"
            } ${readOnly ? "cursor-default" : "cursor-pointer"}`}
          >
            {SHORT[f]}
          </button>
        );
      })}
    </div>
  );
}

export function MeddicFull({ completed = [], onChange, readOnly = false }: MeddicPillsProps) {
  const [active, setActive] = useState<Field[]>(completed);

  function toggle(f: Field) {
    if (readOnly) return;
    const next = active.includes(f) ? active.filter((x) => x !== f) : [...active, f];
    setActive(next);
    onChange?.(next);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {FIELDS.map((f) => {
        const on = active.includes(f);
        return (
          <button
            key={f}
            onClick={() => toggle(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors select-none ${
              on
                ? "bg-[#0F0F0F] text-[#F8F7F4]"
                : "bg-[#F8F7F4] text-[#0F0F0F] border border-[#E8E8E4] hover:border-[#0F0F0F]/40"
            } ${readOnly ? "cursor-default" : "cursor-pointer"}`}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
