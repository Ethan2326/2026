import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-black text-[#E8FF5A] leading-none mb-4">404</p>
      <h1 className="text-2xl font-black text-[#0F0F0F] mb-2">Deal not found</h1>
      <p className="text-[#0F0F0F]/50 mb-8 max-w-sm">
        This page doesn&apos;t exist — or the deal was already closed.
      </p>
      <div className="flex gap-3">
        <Link href="/dashboard" className="bg-[#E8FF5A] text-[#0F0F0F] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#E8FF5A]/80 transition-colors">
          Back to Pipeline
        </Link>
        <Link href="/" className="bg-[#FFFFFF] text-[#0F0F0F] font-semibold px-6 py-3 rounded-full text-sm border border-[#E8E8E4] hover:border-[#0F0F0F]/20 transition-colors">
          Home
        </Link>
      </div>
    </div>
  );
}
