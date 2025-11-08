import React from "react";

export default function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt?: string;
  onClose: () => void;
}) {
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
      <div className="absolute inset-4 md:inset-10 grid place-items-center" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt || "certificate"} className="max-h-full max-w-full rounded-lg shadow-2xl" />
      </div>
    </div>
  );
}
