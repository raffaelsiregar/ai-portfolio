import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/lib/portfolio";

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: `${profile.name} — Builder & Vibe Coder`,
  description:
    "Exploring the space between ideas and execution. Raffael Nathaniel Siregar builds AI automations, web experiences, and Windows apps.",
  openGraph: {
    title: `${profile.name} — Ideas, made real.`,
    description:
      "AI automation. Web apps. Windows apps. Thoughtfully built with a little help from AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
