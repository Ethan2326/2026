export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E05252]/10 text-[#E05252] text-xs font-semibold tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-[#E05252] animate-pulse" />
      Live
    </span>
  );
}
