interface SuggestionCardProps {
  title: string;
  body: string;
  tag?: string;
}

export function SuggestionCard({ title, body, tag }: SuggestionCardProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-xl border border-[#E8E8E4] border-l-4 border-l-[#B8A060] p-4 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#0F0F0F]">{title}</p>
          <p className="mt-1 text-sm text-[#0F0F0F]/60 leading-relaxed">{body}</p>
        </div>
        {tag && (
          <span className="shrink-0 text-xs font-medium text-[#B8A060] bg-[#B8A060]/10 rounded-full px-2.5 py-0.5">
            {tag}
          </span>
        )}
      </div>
    </div>
  );
}
