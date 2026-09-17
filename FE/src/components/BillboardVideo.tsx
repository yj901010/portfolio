import { useEffect, useRef, useState } from "react";

/** Only the active billboard owns a video. The image underneath is always available. */
export default function BillboardVideo({ src, playing, position }: {
  src: string;
  playing: boolean;
  position?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element || failed) return;
    let cancelled = false;
    if (playing) {
      element.muted = true;
      void element.play().catch(() => {
        // Autoplay restrictions and interrupted loads leave the poster visible.
        if (!cancelled) setReady(false);
      });
    } else {
      element.pause();
    }
    return () => {
      cancelled = true;
      element.pause();
    };
  }, [playing, failed]);

  if (failed) return null;

  return <video ref={video} src={src} muted loop playsInline preload="none"
    className={`nf-billboard-image nf-billboard-video${ready ? " is-ready" : ""}`}
    style={{ objectPosition: position }} aria-hidden="true" tabIndex={-1} disablePictureInPicture
    onPlaying={() => setReady(true)} onError={() => setFailed(true)} />;
}
