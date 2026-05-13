"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LiveBadge } from "./LiveBadge";

const LINKS = [
  { href: "/dashboard", label: "Pipeline" },
  { href: "/coaching", label: "Coaching" },
  { href: "/meddic", label: "MEDDIC" },
  { href: "/analytics", label: "Analytics" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8F7F4]/90 backdrop-blur-sm border-b border-[#E8E8E4]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#0F0F0F] font-black text-lg tracking-tight">
            2026
          </Link>
          <LiveBadge />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#0F0F0F] text-[#F8F7F4]"
                    : "text-[#0F0F0F]/60 hover:text-[#0F0F0F] hover:bg-[#0F0F0F]/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/coaching"
            className="hidden md:inline-flex items-center gap-1.5 bg-[#E8FF5A] text-[#0F0F0F] text-sm font-bold px-4 py-2 rounded-full hover:bg-[#E8FF5A]/80 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E05252] animate-pulse" />
            Join call
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#0F0F0F]/5 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`h-0.5 bg-[#0F0F0F] rounded-full transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 bg-[#0F0F0F] rounded-full transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-[#0F0F0F] rounded-full transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#E8E8E4] bg-[#F8F7F4] px-6 py-4 flex flex-col gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#0F0F0F] text-[#F8F7F4]"
                    : "text-[#0F0F0F]/70 hover:bg-[#0F0F0F]/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/coaching"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center gap-1.5 bg-[#E8FF5A] text-[#0F0F0F] text-sm font-bold px-4 py-2.5 rounded-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E05252] animate-pulse" />
            Join live call
          </Link>
        </div>
      )}
    </header>
  );
}
