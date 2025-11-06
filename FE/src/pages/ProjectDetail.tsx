import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { PROJECTS, type Project } from "../assets/projects";
import {
  CheckCircle2,
  Github,
  Globe,
  GitBranch,
  Image as ImageIcon,
  Wrench,
} from "lucide-react";

function ScrollStyles() {
  return (
    <style>{`
      /* Netflix toned-down: 기본 회색, Hover 때만 붉은 기운 */
      .ut-scroll{
        /* Firefox */
        scrollbar-width: thin;
        scrollbar-color: rgba(120,120,120,.70) transparent; /* thumb / track */
      }
      .ut-scroll:hover{
        scrollbar-color: rgba(184,29,36,.70) #0f0f0f;       /* hover 시만 살짝 붉게 */
      }

      /* Chrome / Safari / Edge */
      .ut-scroll::-webkit-scrollbar{ width:8px; height:8px; }
      .ut-scroll::-webkit-scrollbar-track{ background:#0f0f0f; }
      .ut-scroll::-webkit-scrollbar-thumb{
        background-color: rgba(120,120,120,.70);  /* 기본: 회색 */
        border-radius: 9999px;
        border: 2px solid #0f0f0f;               /* 트랙과 자연스럽게 */
      }
      .ut-scroll:hover::-webkit-scrollbar-thumb{
        background-color: rgba(184,29,36,.75);   /* Hover: muted ruby (#B81D24 계열) */
      }
      .ut-scroll::-webkit-scrollbar-thumb:active{
        background-color: #d31e28;               /* 클릭 시만 조금 진하게 */
      }
    `}</style>
  );
}

const Stat = ({ label, value, note }: { label: string; value: string; note?: string }) => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900/60">
    <div className="px-4 pt-3"><div className="text-zinc-300 text-sm font-medium">{label}</div></div>
    <div className="px-4 pb-4">
      <div className="text-3xl md:text-4xl font-semibold tracking-tight text-emerald-300">{value}</div>
      {note && <p className="text-xs text-zinc-500 mt-1">{note}</p>}
    </div>
  </div>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-zinc-800/70 border border-zinc-700 px-2.5 py-1 text-xs text-zinc-200">
    {children}
  </span>
);

type IconType = React.ComponentType<{ size?: number; className?: string }>;
const Pill = ({ Icon, label }: { Icon: IconType; label: string }) => (
  <div className="flex items-center gap-2 rounded-full bg-zinc-900/60 border border-zinc-800 px-3 py-1 text-sm text-zinc-300">
    <Icon size={16} className="text-zinc-400" />
    {label}
  </div>
);

type UTItem = {
  id: string;
  title: string;
  priority: "Critical" | "Major" | "Minor";
  status: "Fixed" | "In Progress" | "Planned";
  summary: string;
  steps?: string[];
  change?: string[];
  attachments?: { before?: string; after?: string };
  date?: string;
};

function StatusBadge({ status }: { status: UTItem["status"] }) {
  const map: Record<UTItem["status"], string> = {
    Fixed: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    "In Progress": "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    Planned: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] ${map[status]}`}>
      {status === "Fixed" && <CheckCircle2 size={12} />}{status}
    </span>
  );
}
function PriorityBadge({ p }: { p: UTItem["priority"] }) {
  const map: Record<UTItem["priority"], string> = {
    Critical: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    Major: "bg-orange-500/15 text-orange-300 border border-orange-500/30",
    Minor: "bg-white/10 text-white/80 border border-white/15",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] ${map[p]}`}>{p}</span>;
}

function UTListItem({ it, selected, onClick }: { it: UTItem; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border p-3 transition ${
        selected ? "border-emerald-500/40 bg-emerald-500/5" : "border-white/10 bg-white/5 hover:bg-white/[0.08]"
      }`}
    >
      <div className="flex items-center gap-2 text-[11px] mb-1">
        <StatusBadge status={it.status} />
        <PriorityBadge p={it.priority} />
        {it.date && <span className="text-white/60">({it.date})</span>}
      </div>
      <div className="font-medium text-zinc-100">{it.title}</div>
      <div className="text-sm text-white/70 mt-0.5 line-clamp-2">{it.summary}</div>
    </button>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project: Project | undefined = useMemo(() => PROJECTS.find((p) => p.slug === slug), [slug]);
  if (!project) return <Navigate to="/projects" replace />;

  const cs = project.caseStudy;
  const ut: { summary?: string; items?: UTItem[] } | undefined = (project as any).userTesting;
  const isMyFairy = project.slug === "myfairy";

  const metaTeam = (project as any).teamLabel ?? (isMyFairy ? "팀 6인" : undefined);
  const metaRole = (project as any).roleLabel ?? (isMyFairy ? "역할: Infra/BE/FE 일부 주도" : undefined);
  const metaPeriod = (project as any).periodLabel ?? project.period;

  const heroStats: Array<{ label: string; value: string; note?: string }> =
    (project as any).heroStats ?? (isMyFairy
      ? [
          { label: "배포 리드타임", value: "15m → 4m", note: "Jenkins + Docker" },
          { label: "WS 연결 안정화", value: "재연결·Heartbeat", note: "OpenVidu + STOMP" },
          { label: "AI 대기 UX", value: "SSE·Cancel", note: "지연 복구 UX" },
        ]
      : []);

  const resultCards: Array<{ title: string; lines: string[] }> =
    (project as any).resultCards ?? (isMyFairy
      ? [
          { title: "OpenVidu 토큰/권한 정비", lines: ["세션/역할 스코프 검증으로 권한 오류 감소", "사용자-세션 매핑으로 재연결/만료 대응 단순화"] },
          { title: "Docker 멀티스테이지 & 캐시", lines: ["이미지 경량화·빌드 캐시로 배포 시간 단축", "프런트/백엔드/NGINX 환경 일관성 확보"] },
          { title: "Nginx 게이트웨이 일원화", lines: ["HTTPS 강제·정적 캐시·/api·/ws 라우팅 통합", "운영 복잡도 감소, 연결 안정성 향상"] },
        ]
      : []);

  type BuildTab = { id: string; label: string; content: React.ReactNode };
  const defaultBuildTabs: BuildTab[] = isMyFairy ? [
    {
      id: "jpa",
      label: "JPA 설계/토글",
      content: (
        <pre className="mt-3 overflow-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs leading-relaxed ut-scroll">{`-- DDL
ALTER TABLE gallery_like ADD UNIQUE KEY uk_user_gallery(user_id, gallery_id);

-- Service (pseudo)
@Transactional
public void toggleLike(Long userId, Long gid) {
  try {
    repo.insert(userId, gid); // @Modifying native INSERT
  } catch (DuplicateKeyException e) {
    repo.delete(userId, gid); // idempotent toggle
  }
}`}</pre>
      ),
    },
    {
      id: "ov",
      label: "OpenVidu 토큰/권한",
      content: (
        <pre className="mt-3 overflow-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs leading-relaxed ut-scroll">{`// Spring (pseudo)
@PostMapping("/api/rtc/token")
public TokenRes token(@RequestBody TokenReq req) {
  Map<String,Object> body = Map.of("session", req.sessionId(), "role", "PUBLISHER");
  HttpEntity<Map<String,Object>> entity = new HttpEntity<>(body, basicAuthHeaders());
  ResponseEntity<String> r = rest.exchange(ovUrl + "/openvidu/api/tokens", HttpMethod.POST, entity, String.class);
  return parse(r.getBody());
}`}</pre>
      ),
    },
    {
      id: "zustand",
      label: "Zustand 무한 스크롤",
      content: (
        <pre className="mt-3 overflow-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs leading-relaxed ut-scroll">{`const useGallery = create((set,get) => ({
  page: 0, hasMore: true, items: [],
  async fetch({page=0,size=20,sort,filter}) {
    if (!get().hasMore && page!==0) return;
    const res = await api.get('/view/my-pictures',{params:{page,size,sort,filter}});
    set({ items: page? [...get().items,...res.data] : res.data, page, hasMore: res.hasMore });
  }
}));`}</pre>
      ),
    },
    {
      id: "nginx",
      label: "Nginx / 캐시 / WS",
      content: (
        <pre className="mt-3 overflow-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs leading-relaxed ut-scroll">{`map $http_upgrade $connection_upgrade { default upgrade; '' close; }

server {
  listen 443 ssl http2;
  server_name example.com;

  location /assets/ {
    expires 1y; add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }
  location /ws {
    proxy_pass http://backend:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_read_timeout 60s; proxy_send_timeout 60s;
  }
  location /api/ { proxy_pass http://backend:8080; }
}`}</pre>
      ),
    },
  ] : [];
  const externalBuildTabs: BuildTab[] = (project as any).buildTabs || [];
  const buildTabs = externalBuildTabs.length ? externalBuildTabs : defaultBuildTabs;
  const [tab, setTab] = useState<string>(buildTabs[0]?.id ?? "arch");

  const [utOpen, setUtOpen] = useState(false);
  const [activeUT, setActiveUT] = useState<UTItem | null>(null);
  const handleOpenUT = (it: UTItem) => { setActiveUT(it); setUtOpen(true); };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setUtOpen(false);
    if (utOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [utOpen]);

  type TroubleItem = { title: string; bullets?: string[] };
  const troubleshooting: TroubleItem[] = useMemo(() => {
    const ts = (cs as any)?.troubleshooting as TroubleItem[] | undefined;
    if (ts?.length) return ts;
    const rn = (cs as any)?.risksNext as string[] | undefined;
    if (!rn?.length) return [];
    return rn.map((r) => {
      const [head, ...tail] = r.split("→");
      const joined = tail.join("→").trim();
      const bullets = joined ? joined.split("·").map((s) => s.trim()).filter(Boolean) : [];
      return { title: head.trim(), bullets };
    }).filter((x) => x.title);
  }, [cs]);

  const utItems = ut?.items ?? [];
  const [selectedUT, setSelectedUT] = useState<UTItem | null>(utItems.length ? utItems[0]! : null);

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <ScrollStyles />

      <div className="sticky top-0 z-40 border-b border-zinc-900 backdrop-blur bg-black/50">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="text-sm md:text-base font-medium text-zinc-300">{project.title} — Case Study</div>
          <div className="hidden md:flex items-center gap-3 text-xs">
            <a href="#overview" className="text-zinc-400 hover:text-zinc-200">Overview</a>
            <a href="#demo" className="text-zinc-400 hover:text-zinc-200">Demo</a>
            <a href="#stack" className="text-zinc-400 hover:text-zinc-200">기술 스택</a>
            <a href="#work" className="text-zinc-400 hover:text-zinc-200">My work</a>
            {cs?.adrs?.length ? <a href="#choices" className="text-zinc-400 hover:text-zinc-200">기술 선정</a> : null}
            {buildTabs.length ? <a href="#build" className="text-zinc-400 hover:text-zinc-200">구현 사항</a> : null}
            {(heroStats.length || resultCards.length) && <a href="#results" className="text-zinc-400 hover:text-zinc-200">결과</a>}
            {utItems.length > 0 && <a href="#ut" className="text-zinc-400 hover:text-zinc-200">사용자 테스트</a>}
            {troubleshooting.length > 0 && <a href="#ts" className="text-zinc-400 hover:text-zinc-200">트러블슈팅</a>}
          </div>
        </div>
      </div>

      <section id="overview" className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{project.title}</h1>
            {project.summary && <p className="mt-4 text-zinc-300 max-w-2xl text-lg">{project.summary}</p>}
            <div className="mt-6 flex flex-wrap gap-2">
              {metaTeam && <Chip>{metaTeam}</Chip>}
              {metaPeriod && <Chip>{metaPeriod}</Chip>}
              {metaRole && <Chip>{metaRole}</Chip>}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links?.demo && (
                <a href={project.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-zinc-100/10 hover:bg-zinc-100/20 px-3 py-1.5 text-sm">
                  <Globe size={16} /> Live
                </a>
              )}
              {project.links?.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-zinc-100/10 hover:bg-zinc-100/20 px-3 py-1.5 text-sm">
                  <Github size={16} /> Repo
                </a>
              )}
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-zinc-100/10 hover:bg-zinc-100/20 px-3 py-1.5 text-sm">← Back</Link>
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3" id="impact">
            {heroStats.length ? heroStats.slice(0,3).map((s,i)=><Stat key={i} label={s.label} value={s.value} note={s.note}/>)
              : (<><Stat label="상태" value="Stable" note="프로덕션"/><Stat label="배포" value="자동화" note="Docker/Jenkins"/><Stat label="연결" value="실시간" note="STOMP/WebRTC"/></>)}
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-6xl px-4 pb-8">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <div className="text-zinc-200 font-medium">서비스 스크린샷</div>
            <div className="flex items-center gap-2 text-xs text-zinc-400"><Pill Icon={ImageIcon} label="UI/흐름 미리보기" /></div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="aspect-video w-full rounded-xl border border-zinc-800 bg-zinc-950/40 flex items-center justify-center text-zinc-500">
                {project.cover ? <img src={project.cover} alt="cover" className="h-full w-full object-cover rounded-xl" /> : "스크린샷 #1"}
              </div>
              <div className="aspect-video w-full rounded-xl border border-zinc-800 bg-zinc-950/40 flex items-center justify-center text-zinc-500">스크린샷 #2</div>
              <div className="aspect-video w-full rounded-xl border border-zinc-800 bg-zinc-950/40 flex items-center justify-center text-zinc-500">스크린샷 #3</div>
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">기술 스택</h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex flex-wrap gap-2">{project.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
        </div>
      </section>

      {project.bullets?.length ? (
        <section id="work" className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">내 역할</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="grid gap-2">
              {project.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 size={18} className="mt-0.5 text-emerald-300/80" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {cs?.adrs?.length ? (
        <section id="choices" className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">기술 선정</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
              <GitBranch size={18} className="text-white/80" />
              <div className="text-zinc-200 font-medium">대안 비교 & 결정(ADR)</div>
            </div>
            <div className="p-4 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-3">Option</th>
                    <th className="text-left p-3">장점</th>
                    <th className="text-left p-3">단점</th>
                    <th className="text-left p-3">선택 사유</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {cs.adrs.map((a, i) => (
                    <tr key={i}>
                      <td className="p-3">{a.option}</td>
                      <td className="p-3">{a.pros}</td>
                      <td className="p-3">{a.cons}</td>
                      <td className="p-3">{a.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {buildTabs.length > 0 && (
        <section id="build" className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">구현 사항</h2>
          <div className="mb-3">
            <div className="inline-flex flex-wrap gap-1 rounded-lg border border-zinc-800 bg-zinc-900/50 p-1">
              {buildTabs.map(t => (
                <button key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3 py-1.5 text-sm rounded-md transition
                    ${tab === t.id ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-800/40"}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
            {buildTabs.find(t => t.id === tab)?.content}
          </div>
        </section>
      )}

      {(heroStats.length || resultCards.length) && (
        <section id="results" className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">결과 & 성과</h2>
          {resultCards.length > 0 && (
            <div className="grid gap-3 md:grid-cols-3">
              {resultCards.map((c, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50">
                  <div className="px-5 pt-4 pb-2 text-zinc-200 text-base font-medium">{c.title}</div>
                  <div className="p-5 pt-2 text-sm text-zinc-300 space-y-1">{c.lines.map((ln, j) => <p key={j}>{ln}</p>)}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {utItems.length > 0 && (
        <section id="ut" className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="text-2xl font-semibold mb-2">사용자 테스트 & 개선</h2>
          {ut?.summary && <p className="text-zinc-400 mb-4">{ut.summary}</p>}

          <div className="grid md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <div className="relative h-[34rem] rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 flex flex-col">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/35 to-transparent rounded-t-xl" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/35 to-transparent rounded-b-xl" />
                <div className="flex-1 overflow-y-auto pr-2 scroll-smooth overscroll-contain ut-scroll">
                  <div className="space-y-2 pb-2">
                    {utItems.map((it) => (
                      <UTListItem
                        key={it.id}
                        it={it as UTItem}
                        selected={selectedUT?.id === it.id}
                        onClick={() => setSelectedUT(it as UTItem)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="relative h-[34rem] rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 flex flex-col">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/35 to-transparent rounded-t-xl" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/35 to-transparent rounded-b-xl" />

                {selectedUT ? (
                  <>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] mb-1">
                      <StatusBadge status={selectedUT.status} />
                      <PriorityBadge p={selectedUT.priority} />
                      {selectedUT.date && <span className="text-white/60">({selectedUT.date})</span>}
                    </div>
                    <h3 className="text-lg font-semibold">{selectedUT.title}</h3>
                    <p className="text-sm text-zinc-300 mt-1">{selectedUT.summary}</p>

                    <div className="mt-3 flex-1 overflow-y-auto pr-2 scroll-smooth overscroll-contain ut-scroll grid gap-3">
                      {selectedUT.steps?.length ? (
                        <div className="rounded-lg border border-white/10 p-3">
                          <div className="text-xs font-semibold text-white/70 mb-1">재현/기대 요약</div>
                          <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
                            {selectedUT.steps.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                      ) : null}
                      {selectedUT.change?.length ? (
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                          <div className="text-xs font-semibold text-emerald-300 mb-1">반영한 개선 (After)</div>
                          <ul className="list-disc pl-5 text-sm text-emerald-100 space-y-1">
                            {selectedUT.change.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                      ) : null}

                      {(selectedUT.attachments?.before || selectedUT.attachments?.after) && (
                        <div className="rounded-lg border border-white/10 p-3">
                          <div className="text-xs font-semibold text-white/70">전/후 이미지</div>
                          <p className="text-sm text-zinc-400 mt-1">버튼을 눌러 전/후 이미지를 확인하세요.</p>
                          <button
                            className="mt-3 inline-flex items-center gap-2 rounded-md bg-zinc-100/10 hover:bg-zinc-100/20 px-3 py-1.5 text-sm"
                            onClick={() => handleOpenUT(selectedUT)}
                          >
                            전/후 보기 (모달)
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-zinc-400">왼쪽에서 항목을 선택하면 상세 설명이 표시됩니다.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {utOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setUtOpen(false)} />
          <div className="relative w-full max-w-3xl rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold">{activeUT?.title} — 전/후 화면</div>
              <button onClick={() => setUtOpen(false)} className="rounded-md px-2 py-1 text-sm bg-zinc-800 hover:bg-zinc-700">닫기</button>
            </div>
            <div className="mt-3 grid md:grid-cols-2 gap-3">
              <figure className="rounded-lg overflow-hidden border border-white/10">
                {activeUT?.attachments?.before
                  ? <img src={activeUT.attachments.before} alt="Before" className="w-full h-64 object-cover" />
                  : <div className="w-full h-64 bg-zinc-900/60 flex items-center justify-center text-zinc-500">Before 없음</div>}
                <figcaption className="text-xs text-white/60 px-3 py-2">Before</figcaption>
              </figure>
              <figure className="rounded-lg overflow-hidden border border-white/10">
                {activeUT?.attachments?.after
                  ? <img src={activeUT.attachments.after} alt="After" className="w-full h-64 object-cover" />
                  : <div className="w-full h-64 bg-zinc-900/60 flex items-center justify-center text-zinc-500">After 없음</div>}
                <figcaption className="text-xs text-white/60 px-3 py-2">After</figcaption>
              </figure>
            </div>
          </div>
        </div>
      )}

      {troubleshooting.length > 0 && (
        <section id="ts" className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">트러블슈팅</h2>
          <div className="space-y-3">
            {troubleshooting.map((t, i) => (
              <details key={i} className="rounded-lg border border-zinc-800 px-4 py-3">
                <summary className="cursor-pointer flex items-center gap-2">
                  <Wrench size={16} className="text-white/70" /><span className="text-zinc-200">{t.title}</span>
                </summary>
                {t.bullets?.length ? (
                  <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
                    {t.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                ) : null}
              </details>
            ))}
          </div>
        </section>
      )}

      <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-zinc-500">© 2025 {project.title} — Case Study</footer>
    </div>
  );
}
