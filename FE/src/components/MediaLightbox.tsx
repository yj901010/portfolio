import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";

export default function MediaLightbox({
  src,
  previewImageSrc,
  alt = "증빙 자료",
  description,
  onClose,
}: {
  src: string;
  previewImageSrc?: string;
  alt?: string;
  description?: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const isPdf = /\.pdf(\?|$)/i.test(src);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="nf-evidence"
      aria-labelledby="evidence-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="nf-evidence-inner">
        <header className="nf-evidence-header">
          <div>
            <h2 id="evidence-title">{alt}</h2>
            {description && <p>{description}</p>}
          </div>
          <button className="nf-round" onClick={onClose} aria-label="증빙 닫기">
            <X size={23} />
          </button>
        </header>
        <div className="nf-evidence-viewer">
          {loading && (
            <p className="nf-evidence-loading" role="status">
              증빙을 불러오는 중…
            </p>
          )}
          {failed ? (
            <p role="alert">
              미리보기를 불러오지 못했습니다. 아래에서 원본을 열어주세요.
            </p>
          ) : isPdf && !previewImageSrc ? (
            <iframe
              src={`${src}#view=FitH`}
              title={`${alt} PDF 증빙`}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setFailed(true);
              }}
            />
          ) : (
            <img
              src={previewImageSrc ?? src}
              alt={alt}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setFailed(true);
              }}
            />
          )}
        </div>
        <footer className="nf-evidence-footer">
          <p>
            {isPdf
              ? "문서 미리보기입니다. 원본 PDF도 확인할 수 있습니다."
              : "원본에서 더 크게 확인할 수 있습니다."}
          </p>
          <a href={src} target="_blank" rel="noopener noreferrer">
            원본 열기 <ExternalLink size={16} />
          </a>
        </footer>
      </div>
    </dialog>
  );
}
