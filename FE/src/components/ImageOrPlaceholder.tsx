import React from "react";

export default function ImageOrPlaceholder({
  src,
  alt,
  hint,
  className = "",
}: {
  src?: string;
  alt: string;
  hint?: string;
  className?: string;
}) {
  const [ok, setOk] = React.useState(Boolean(src));
  React.useEffect(() => setOk(Boolean(src)), [src]);

  return ok ? (
    <img
      src={src}
      alt={alt}
      onError={() => setOk(false)}
      className={"w-full h-full object-contain " + className}
      loading="lazy"
    />
  ) : (
    <div
      className={
        "w-full h-full grid place-items-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-white/50 " +
        className
      }
    >
      <div className="text-center px-4">
        <div className="font-semibold">{alt}</div>
        {hint ? <div className="mt-1 text-xs">{hint}</div> : null}
      </div>
    </div>
  );
}
