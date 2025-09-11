import { useParams, Link } from "react-router-dom";

export default function Portfolio() {
  const { profileId } = useParams();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 bg-black/70 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold tracking-wide">My Portfolio</div>
          <nav className="space-x-6 text-sm text-neutral-300">
            <Link to="/" className="hover:text-white">프로필 선택</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">안녕하세요, {profileId}님 👋</h1>
        <p className="text-neutral-300">
          여기는 포트폴리오 메인입니다. 이후에 프로젝트 카드, 기술 스택, 경력 타임라인,
          블로그/노트, 연락 섹션 등을 구성하면 됩니다.
        </p>
        <ul className="list-disc pl-6 mt-6 space-y-2 text-neutral-300">
          <li>프로젝트: API 설계, RDB/ERD, 캐시/큐, Observability 데모</li>
          <li>글/노트: 문제해결 기록, 성능 튜닝 사례</li>
          <li>연락처: GitHub, LinkedIn, 이메일</li>
        </ul>
      </main>
    </div>
  );
}
