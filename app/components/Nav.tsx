import Link from "next/link";
import { LiveBadge } from "./LiveBadge";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[#F8F7F4]/80 backdrop-blur-sm border-b border-[#E8E8E4]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#0F0F0F] font-bold text-lg tracking-tight">
            2026
          </Link>
          <LiveBadge />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-[#0F0F0F]/60 hover:text-[#0F0F0F] transition-colors font-medium">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm text-[#0F0F0F]/60 hover:text-[#0F0F0F] transition-colors font-medium">
            Dashboard
          </Link>
          <Link href="/meddic" className="text-sm text-[#0F0F0F]/60 hover:text-[#0F0F0F] transition-colors font-medium">
            MEDDIC
          </Link>
        </nav>
        <Link
          href="/dashboard"
          className="bg-[#E8FF5A] text-[#0F0F0F] text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#E8FF5A]/80 transition-colors"
        >
          Open App
        </Link>
      </div>
    </header>
  );
}
