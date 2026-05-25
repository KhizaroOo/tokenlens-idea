"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FAQ {
  q: string;
  a: string;
}

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`rounded-2xl border transition-colors ${
              isOpen ? "border-emerald-400/30 bg-emerald-500/[0.04]" : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm lg:text-base font-semibold text-white">{item.q}</span>
              <span
                className={`flex-shrink-0 h-7 w-7 rounded-full grid place-items-center ring-1 transition-colors ${
                  isOpen ? "bg-emerald-400/20 ring-emerald-400/40 text-emerald-300" : "bg-white/5 ring-white/10 text-white/60"
                }`}
              >
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-0 text-sm text-white/65 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
