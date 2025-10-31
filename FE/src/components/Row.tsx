import React from "react";
import { Link } from "react-router-dom";
import type { Row, Media } from "../assets/mockData";

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}
const isExternal = (url?: string) => !!url && /^https?:\/\//i.test(url);

function LinkOrA({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return isExternal(to) ? (
    <a href={to} className={className}>
      {children}
    </a>
  ) : (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function MediaCard({ item, index, kind }: { item: Media; index: number; kind?: Row["kind"] }) {
  const [hover, setHover] = React.useState(false);

  const cardHref = item.href;

  const playTo = item.playHref || item.href;
  const moreTo = item.moreHref;

  const Img = (
    <img
      src={item.thumb}
      alt={item.title}
      className={classNames(
        "absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300",
        hover && "scale-[1.05]"
      )}
      loading="lazy"
    />
  );

  return (
    <article
      className="group relative w-[62vw] xs:w-[48vw] sm:w-64 md:w-72 lg:w-80 shrink-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-white/5">
        {cardHref ? (
          <LinkOrA to={cardHref}>{Img}</LinkOrA>
        ) : (
          Img
        )}

        <div
          className={classNames(
            "absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/60 to-transparent",
            hover && "opacity-100"
          )}
        />
        <div className="absolute bottom-0 inset-x-0 p-3">
          <h3 className="text-white font-semibold drop-shadow line-clamp-1">{item.title}</h3>
          {item.subtitle && (
            <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{item.subtitle}</p>
          )}

          {kind !== "top10" && (
            <div className="mt-2 hidden group-hover:block">
              <div className="flex flex-wrap gap-1">
                {item.tags?.slice(0, 5).map((t) => (
                  <span key={t} className="text-[10px] text-white/85 bg-white/10 rounded px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-2 flex items-center gap-2">
                {playTo ? (
                  <LinkOrA
                    to={playTo}
                    className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-white text-black hover:bg-white/90"
                  >
                    Play
                  </LinkOrA>
                ) : (
                  <button
                    className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-white/30 text-black/60 cursor-not-allowed"
                    disabled
                  >
                    Play
                  </button>
                )}

                {moreTo ? (
                  <LinkOrA
                    to={moreTo}
                    className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-white/15 text-white hover:bg-white/25"
                  >
                    More
                  </LinkOrA>
                ) : (
                  <button className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-white/15 text-white/60 cursor-not-allowed">
                    More
                  </button>
                )}

                <span className="ml-auto text-[10px] text-white/70">{item.maturity || "ALL"}</span>
              </div>
            </div>
          )}
        </div>

        {kind === "top10" && (
          <div className="absolute -left-1 bottom-2 text-[120px] font-black leading-none text-white/10 drop-shadow-xl select-none">
            {index + 1}
          </div>
        )}
        {kind === "continue" && (
          <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-white/20">
            <div className="h-full bg-red-600" style={{ width: `${item.progress ?? 0}%` }} />
          </div>
        )}
      </div>
    </article>
  );
}

export default function Row({ row }: { row: Row }) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id={row.id} className="relative">
      <div className="flex items-baseline justify-between px-0">
        <h2 className="text-white text-xl sm:text-2xl font-semibold">{row.title}</h2>
        <a href="#" className="text-sm text-white/60 hover:text-white/80" aria-label={`${row.title} 전체 보기`}>
          See all
        </a>
      </div>

      <div className="relative mt-3">
        <button
          aria-label="이전"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70"
          onClick={() => scrollByAmount(-1)}
        >
          ‹
        </button>
        <div
          ref={scrollerRef}
          className="no-scrollbar overflow-x-auto whitespace-nowrap scroll-smooth px-0"
          role="region"
          aria-label={`${row.title} 가로 목록`}
        >
          <div className="flex gap-3">
            {row.items.map((it, idx) => (
              <MediaCard key={it.id} item={it} index={idx} kind={row.kind} />
            ))}
          </div>
        </div>
        <button
          aria-label="다음"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70"
          onClick={() => scrollByAmount(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
