import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onFinish?: () => void;
  text?: string;
  autoNavigate?: boolean;
  nextPath?: string;
};
export default function Intro({
  onFinish,
  text = "MYFLIX",
  autoNavigate = false,
  nextPath = "/browse",
}: Props) {
  const navigate = useNavigate();
  const finish = useCallback(() => {
    if (onFinish) onFinish();
    else if (autoNavigate) navigate(nextPath, { replace: true });
  }, [onFinish, autoNavigate, navigate, nextPath]);
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(finish, reduced ? 150 : 1800);
    return () => window.clearTimeout(timer);
  }, [finish]);
  return (
    <div className="nf-intro">
      <span className="nf-intro-word" aria-label="마이플릭스">
        {text}
      </span>
      <button className="nf-intro-skip" onClick={finish}>
        건너뛰기 →
      </button>
    </div>
  );
}
