import type { Issue } from "../types/project";

function SeverityPill({ s }: { s: Issue["severity"] }) {
  return (
    <span
      className={
        "mr-3 inline-flex items-center rounded px-2 py-0.5 text-[11px] font-bold " +
        (s === "CRITICAL"
          ? "bg-red-600/20 text-red-300 ring-1 ring-red-500/30"
          : "bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30")
      }
    >
      {s}
    </span>
  );
}

export default function Accordion({ items }: { items: Issue[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="space-y-3">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className="rounded-xl bg-white/[0.04] ring-1 ring-white/10">
            <button className="w-full flex items-center justify-between px-4 py-3 text-left" onClick={() => setOpen(isOpen ? null : it.id)}>
              <div className="flex items-center">
                <SeverityPill s={it.severity} />
                <span className="font-medium text-white">{it.title}</span>
              </div>
              <span className="text-white/60">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && it.detail ? (
              <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed">
                <p className="text-red-300">
                  <strong className="text-white/80">[문제]</strong> {it.detail.problem}
                </p>
                <p className="mt-2 text-amber-300">
                  <strong className="text-white/80">[원인]</strong> {it.detail.cause}
                </p>
                <p className="mt-2 text-emerald-300">
                  <strong className="text-white/80">[해결]</strong> {it.detail.fix}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

import { useState } from "react";
