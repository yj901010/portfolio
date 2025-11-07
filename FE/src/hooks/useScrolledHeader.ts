import { useEffect, useState } from "react";

export function useScrolledHeader(threshold = 20) {
  const [scrolled, set] = useState(false);
  useEffect(() => {
    const onScroll = () => set(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
