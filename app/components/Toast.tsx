"use client";
import { useEffect, useState } from "react";

export function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300); }, 2500);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F0F0F] text-[#F8F7F4] text-sm font-semibold px-5 py-3 rounded-full shadow-[0_4px_16px_0_rgb(0_0_0/0.20)] transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      {message}
    </div>
  );
}
