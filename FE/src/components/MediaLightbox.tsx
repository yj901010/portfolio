import React from "react";

export default function MediaLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt?: string;
  onClose: () => void;
}) {
  const isPdf = /\.pdf(\?|$)/i.test(src);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 rounded-md bg-white/10 hover:bg-white/20 text-white px-3 py-1.5"
        aria-label="닫기"
      >
        ✕
      </button>

      <div
        className="absolute inset-4 md:inset-10 grid place-items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isPdf ? (
          <div className="h-full w-full grid grid-rows-[1fr_auto] gap-3 place-items-center">
            <iframe
              src={`${src}#toolbar=1&view=FitH`}
              title={alt || "PDF"}
              className="row-start-1 rounded-lg bg-white w-[90vw] md:w-[55vw] h-[55vh] shadow-2xl"
            />
            <div className="row-start-2 flex items-center justify-center gap-3">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 text-black hover:bg-white/90"
              >
                새 탭에서 열기
              </a>
              <a
                href={src}
                download
                className="inline-flex items-center gap-2 rounded bg-white/10 px-3 py-1.5 text-white hover:bg-white/15"
              >
                다운로드
              </a>
            </div>
          </div>
        ) : (
          <div className="grid place-items-center gap-3">
            <img
              src={src}
              alt={alt || "preview"}
              className="rounded-lg shadow-2xl max-h-[55vh] max-w-[90vw] md:max-w-[55vw]"
            />
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 text-black hover:bg-white/90"
            >
              새 탭에서 크게 보기
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
