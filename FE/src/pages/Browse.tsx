import TopNav from "../components/TopNav";
import Hero from "../components/Hero";
import Row from "../components/Row";
import { HERO, ROWS } from "../assets/mockData";
import type { Row as RowType } from "../assets/mockData";

export default function Browse() {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopNav />
      <main className="pt-16">
        <Hero item={HERO} />
        <div className="w-full space-y-10 -mt-10">
          {ROWS.map((r: RowType) => (
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
