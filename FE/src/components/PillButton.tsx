import { useEffect, useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";
import type { CopyKey } from "../assets/types";

type Props = {
  icon: React.ReactNode;
  label: string;
  href?: string;
  copyValue?: string;
  copyKey?: CopyKey;
};

export default function PillButton({
  icon,
  label,
  href,
  copyValue,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!copyValue) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const content = (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm text-white/90 hover:bg-white/15 transition">
      {icon}
      {label}
      {copyValue && (
        <button
          type="button"
          onClick={handleCopy}
          className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
          title="복사"
        >
          {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
          {copied ? "복사됨" : "복사"}
        </button>
      )}
    </span>
  );

  return href ? (
    <a href={href} onClick={(e) => e.stopPropagation()} className="no-underline">
      {content}
    </a>
  ) : (
    content
  );
}
