
import React from "react";
import type { Media } from "../assets/mockData";

export default function Hero({ item }: { item: Media }) {
  return (
    <section className="relative aspect-[16/7] w-full overflow-hidden" id="home">
      <img
        src={item.backdrop || item.thumb}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-white/90">
          <span className="px-2 py-0.5 rounded bg-white/10">{item.maturity || "ALL"}</span>
          {item.tags?.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-white/10">{t}</span>
          ))}
        </div>
        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white drop-shadow">
          {item.title}
        </h1>
        {item.subtitle && (
          <p className="mt-3 text-white/80 max-w-2xl text-sm sm:text-base">{item.subtitle}</p>
        )}
        <div className="mt-6 flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-white text-black font-semibold rounded px-4 py-2 hover:bg-white/90 active:scale-[.99]">
            ▶ Play
          </button>
          <button className="inline-flex items-center gap-2 bg-white/10 text-white rounded px-4 py-2 hover:bg-white/15">
            ℹ More Info
          </button>
        </div>
      </div>
    </section>
  );
}
