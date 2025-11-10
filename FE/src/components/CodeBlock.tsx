import React from "react";

export default function CodeBlock({
  code,
  lang = "dockerfile",
  height = 360,
  initialCollapsed = true,
}: {
  code: string;
  lang?: string;
  height?: number;
  initialCollapsed?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(!initialCollapsed);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
  };

  return (
    <div className="relative">
      <pre
        className={`rounded-xl bg-black/60 ring-1 ring-white/10 p-4 overflow-auto code-scroll text-[12.5px] leading-relaxed ${
          expanded ? "" : "mask-fade-b"
        }`}
        style={{ height: expanded ? undefined : height, maxHeight: expanded ? undefined : height }}
      >
        <code className={`language-${lang}`}>{code}</code>
      </pre>
      <div className="absolute right-2 top-2 flex gap-2 pointer-events-auto">
        <button
          onClick={copy}
          className="rounded-md bg-black/50 backdrop-blur px-2 py-1 text-xs text-white/90 ring-1 ring-white/15 hover:bg-black/60"
        >
          Copy
        </button>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="rounded-md bg-black/50 backdrop-blur px-2 py-1 text-xs text-white/90 ring-1 ring-white/15 hover:bg-black/60"
        >
          {expanded ? "Fold" : "Expand"}
        </button>
      </div>
    </div>
  );
}
