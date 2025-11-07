import { useEffect, useMemo, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FONT_FAMILY = "'Bebas Neue', sans-serif";
const FONT_SIZE_VMIN = 14.5;
const LETTER_SPACING_EM = 0.22;
const GRADIENT_COLORS = ["#ff2a36", "#e50914", "#9b0911"];

type IntroProps = {
  onFinish?: () => void;
  text?: string;
  autoNavigate?: boolean;
  nextPath?: string;
};

export default function Intro({
  onFinish,
  text = "PORTFOLIO",
  autoNavigate = false,
  nextPath = "/browse",
}: IntroProps) {
  const nav = useNavigate();
  const [scope, animate] = useAnimate();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const letters = useMemo(() => [...text.toUpperCase()], [text]);

  useEffect(() => {
    document.fonts
      .load(`bold ${FONT_SIZE_VMIN}vmin ${FONT_FAMILY}`)
      .then(() => setIsFontLoaded(true))
      .catch(() => setIsFontLoaded(true));
  }, []);

  useEffect(() => {
    if (!isFontLoaded || !scope.current) return;

    const sequence = async () => {
      const letterElements = scope.current.querySelectorAll("span") as NodeListOf<HTMLSpanElement>;
      const spans = Array.from(letterElements) as HTMLSpanElement[];
      if (spans.length === 0) return; // 안전가드

      const firstSpan = spans[0];
      const firstWidth = firstSpan.getBoundingClientRect().width;

      await Promise.all([
        animate(
          scope.current,
          { width: firstWidth, x: -firstWidth / 2, opacity: 1 },
          { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
        ),
        animate(
          firstSpan,
          { opacity: 1, scale: 1 },
          { duration: 1.5, ease: [0.2, 0.8, 0.2, 1], delay: 0 }
        ),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 150));

      const fullWidth = spans.reduce<number>(
        (total, el) => total + el.getBoundingClientRect().width,
        0
      );
      const allOtherLetters = spans.slice(1);

      const revealDuration = 0.6;
      const staggerDelay = revealDuration / (letters.length - 1 || 1);

      await Promise.all([
        animate(
          scope.current,
          { width: fullWidth, x: -fullWidth / 2 },
          { duration: revealDuration, ease: "linear" }
        ),
        animate(
          allOtherLetters,
          { opacity: 1 },
          { duration: 0.3, delay: stagger(staggerDelay, { from: "first" }), ease: "easeOut" }
        ),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 800));

      await animate(scope.current, { scale: 5, opacity: 0 }, { duration: 0.5, ease: "easeOut" });

      onFinish?.();

      if (autoNavigate) {
        requestAnimationFrame(() => nav(nextPath, { replace: true }));
      }
    };

    sequence();
  }, [isFontLoaded, animate, letters.length, scope, nav, autoNavigate, nextPath, onFinish]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      `}</style>
      <div className="fixed inset-0 z-[9999] bg-black grid place-items-center overflow-hidden">
        <motion.div
          ref={scope}
          className="absolute top-2/5 left-1/2 flex flex-nowrap items-center"
          initial={{ opacity: 0 }}
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_VMIN}vmin`,
            letterSpacing: `${LETTER_SPACING_EM}em`,
            fontWeight: "bold",
          }}
        >
          {letters.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="bg-clip-text text-transparent"
              initial={i === 0 ? { opacity: 0, scale: 0.5 } : { opacity: 0 }}
              style={{
                backgroundImage: `linear-gradient(to bottom, ${GRADIENT_COLORS[0]}, ${GRADIENT_COLORS[1]}, ${GRADIENT_COLORS[2]})`,
                filter: `drop-shadow(0 0 24px rgba(229,9,20,0.35))`,
                whiteSpace: "nowrap",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </>
  );
}
