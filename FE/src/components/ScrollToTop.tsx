import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  ignoreHash?: boolean;
  offset?: number;
  behavior?: ScrollBehavior;
};

export default function ScrollToTop({ ignoreHash = true, offset = 0, behavior = "auto" }: Props) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (ignoreHash && hash) return;
    window.scrollTo({ top: 0 + offset, left: 0, behavior });
  }, [pathname, hash, ignoreHash, offset, behavior]);

  return null;
}