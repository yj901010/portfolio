import type { Media } from "../types/media";
import { img } from "../assets/mockData";

export default function Hero({ item }: { item: Media }) {
  return (
    <section className="relative w-full overflow-hidden" id="home">
      <div className="relative h-[36svh] sm:h-[44svh] md:h-[52svh] lg:h-[56svh] max-h-[640px]">
        <img
          src={item.backdrop || item.thumb}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = img(
              "photo-1495567720989-cebdbdd97913",
              { w: 1600 }
            );
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      </div>

      <div className="absolute bottom-5 sm:bottom-8 left-0 right-0 z-10">
        <div className="pl-5 sm:pl-8 md:pl-12 lg:pl-16 pr-5 text-left max-w-[980px]">
          <h1 className="mt-1 text-3xl sm:text-5xl font-extrabold text-white drop-shadow">
            {item.title}
          </h1>
          {item.subtitle && (
            <p className="mt-3 text-white/90 max-w-3xl text-lg sm:text-xl">
              {item.subtitle}
            </p>
          )}
          {item.description && (
            <p className="mt-3 text-white/80 max-w-3xl text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          )}
          <div className="mt-6 flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white text-black font-semibold rounded px-4 py-2 hover:bg-white/90 active:scale-[.99]">
              ▶ 재생
            </button>
            <button className="inline-flex items-center gap-2 bg-white/10 text-white rounded px-4 py-2 hover:bg-white/15">
              ⓘ 상세 정보
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
