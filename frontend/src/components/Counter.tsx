import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  label: string;
  durationMs?: number;
}

export function Counter({ value, label, durationMs = 1500 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        setCurrent(Math.max(1, Math.round(t * value)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    setCurrent(1);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <div ref={ref} className="counter">
      <span className="counter__number" aria-label={`${value.toLocaleString("es-ES")} ${label}`}>
        {current.toLocaleString("es-ES")}
      </span>
      <span className="counter__label" aria-hidden="true">{label}</span>
    </div>
  );
}
