import { useEffect, useState } from "react";

interface Props {
  images: string[];
  intervalMs?: number;
  children: React.ReactNode;
}

export function HeroSlideshow({ images, intervalMs = 5000, children }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <section className="hero">
      {images.map((src, i) => (
        <div
          key={src}
          className={i === index ? "hero__slide hero__slide--active" : "hero__slide"}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden="true"
        />
      ))}
      <div className="hero__content">{children}</div>
    </section>
  );
}
