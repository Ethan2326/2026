interface ScoreProps {
  value: number; // 0–100
  label?: string;
  size?: "sm" | "md" | "lg";
}

function scoreColor(v: number) {
  if (v >= 75) return "#E8FF5A";   // lime — strong
  if (v >= 50) return "#B8A060";   // gold — moderate
  return "#E05252";                // red — at risk
}

export function Score({ value, label, size = "md" }: ScoreProps) {
  const sizeClass = { sm: "text-5xl", md: "text-7xl", lg: "text-9xl" }[size];
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={`${sizeClass} font-black leading-none tabular-nums`}
        style={{ color: scoreColor(value) }}
      >
        {value}
      </span>
      {label && (
        <span className="text-xs font-medium text-[#0F0F0F]/50 uppercase tracking-widest">
          {label}
        </span>
      )}
    </div>
  );
}
