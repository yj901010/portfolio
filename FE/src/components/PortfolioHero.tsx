import type { Media } from "../types/media";
import { img } from "../assets/mockData";

export default function PortfolioHero({ item }: { item: Media }) {
  const bg = item.backdrop ?? item.thumb;

  return (
    <section className="relative w-full">
      <div className="relative w-full h-[36svh] sm:h-[44svh] md:h-[52svh] lg:h-[56svh] max-h-[640px] overflow-hidden">
        <img
          src={bg}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
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

        <div className="absolute bottom-5 sm:bottom-8 left-0 right-0">
          <div
            className="
              pl-5 sm:pl-8 md:pl-10 lg:pl-16
              pr-5
              text-left
              max-w-[980px]
            "
          >
            <h1
              className="
                font-extrabold
                text-2xl sm:text-4xl md:text-5xl lg:text-6xl
                leading-tight drop-shadow
              "
            >
              {item.title}
            </h1>

            {item.subtitle && (
              <p className="mt-3 text-white/85 text-sm sm:text-base md:text-lg">
                {item.subtitle}
              </p>
            )}

            {item.description && (
              <p className="mt-4 text-white/80 text-xs sm:text-sm md:text-base">
                {item.description}
              </p>
            )}

            <div className="mt-5 flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded px-4 py-2 bg-white text-black font-semibold hover:bg-white/90 focus:outline-none focus:ring focus:ring-white/30">
                ▶ 재생
              </button>
              <button className="inline-flex items-center gap-2 rounded px-4 py-2 bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring focus:ring-white/30">
                ⓘ 상세 정보
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
