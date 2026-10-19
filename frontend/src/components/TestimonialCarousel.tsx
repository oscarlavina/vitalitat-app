import { useRef } from "react";
import type { Testimonial } from "../content";
import { useT } from "../i18n";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function GoogleLogo() {
  return (
    <svg className="review__google" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Stars({ className }: { className: string }) {
  return (
    <span className={className} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const t = useT();
  const h = t.home;
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8 });
  };

  return (
    <div role="region" aria-roledescription="carrusel" aria-label={t.carousel.region}>
      <div className="reviews__head">
        <div>
          <p className="kicker">{h.reviewsKicker}</p>
          <h2>{h.reviewsTitle}</h2>
          <p className="reviews__rating">
            <Stars className="reviews__stars reviews__stars--lg" />
            <span>{h.reviewsRating}</span>
          </p>
        </div>
        <div className="reviews__nav">
          <button type="button" className="reviews__btn" onClick={() => scroll(-1)} aria-label={t.carousel.prev}>
            ‹
          </button>
          <button type="button" className="reviews__btn" onClick={() => scroll(1)} aria-label={t.carousel.next}>
            ›
          </button>
        </div>
      </div>
      <ul className="reviews__track" ref={track} tabIndex={0} aria-label={t.carousel.region}>
        {items.map((item) => (
          <li key={item.name} className="review">
            <Stars className="reviews__stars" />
            <blockquote lang={item.lang}>{item.text}</blockquote>
            <div className="review__footer">
              <p className="review__author">
                <span className="review__initial" aria-hidden="true">{item.name.charAt(0)}</span>
                {item.name}
              </p>
              <GoogleLogo />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
