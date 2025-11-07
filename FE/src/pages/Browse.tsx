import Hero from "../components/Hero";
import Row from "../components/Row";
import { HERO, ROWS } from "../assets/mockData";
import type { Row as RowType } from "../types/media";

export default function Browse() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 네비/푸터 없음 (Intro/Select 전용 페이지) */}
      <main>
        <Hero item={HERO} />
        <div className="w-full space-y-10 px-4 md:px-10 mt-4 md:mt-6">
          {ROWS.map((r: RowType) => (
            <Row key={r.id} row={r} />
          ))}
        </div>
      </main>
    </div>
  );
}
