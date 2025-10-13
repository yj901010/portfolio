
import React from "react";
import TopNav from "../components/TopNav";
import Hero from "../components/Hero";
import Row from "../components/Row";
import { HERO, ROWS } from "../assets/mockData";

export default function Browse() {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopNav />
      <main className="pt-16">
        <Hero item={HERO} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 -mt-10">
          {ROWS.map((r) => (
            <Row key={r.id} row={r} />
          ))}
          <footer className="mt-16 pb-20 text-center text-white/40 text-sm">
            <p>© {new Date().getFullYear()} Myflix — Educational clone of Netflix browse UI.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
