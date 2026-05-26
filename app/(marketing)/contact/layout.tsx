import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

/**
 * Server-side metadata for /contact.
 * The page itself is `"use client"` (form state + handlers), which means it
 * cannot export metadata directly — Next.js requires metadata on a server
 * boundary. This thin layout supplies it for SEO/OpenGraph without affecting
 * the rendered tree.
 */
export const metadata: Metadata = {
  title: "Contact — TokenLens",
  description:
    "Talk to the TokenLens team. Sales, support, and partnerships for the multi-provider AI spend, adoption, and governance dashboard.",
  openGraph: {
    title: "Contact — TokenLens",
    description:
      "Sales, support, and partnerships for the TokenLens AI operating dashboard.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F2E8" },
    { media: "(prefers-color-scheme: dark)",  color: "#050505" },
  ],
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
