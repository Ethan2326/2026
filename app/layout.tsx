import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026 — Revenue Intelligence, Live",
  description: "Real-time deal scores, AI suggestions, and MEDDIC tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
