import { Link } from "react-router-dom";
import { Counter } from "../components/Counter";
import { HeroSlideshow } from "../components/HeroSlideshow";
import { Rich } from "../components/Rich";
import { TestimonialCarousel } from "../components/TestimonialCarousel";
import { counters, heroImages, testimonials } from "../content";
import { pagePath, useLang, useT } from "../i18n";
import { LOGOS } from "../logos";

const HELP_IMG: Record<string, string> = {
  columna: "/images/columna.jpg",
  estres: "/images/DSC00316-scaled.jpg",
  embarazo: "/images/iStock-1299083749-creamy-scaled-e1677449383387.jpg",
  ninos: "/images/iStock-656530510-creamy-scaled.jpg",
};

/** Tarjetas que tienen una sección de detalle en la página Para quién. */
const DETAIL_IDS = new Set(["embarazo", "ninos"]);

export function Home() {
  const t = useT();
  const lang = useLang();
  const h = t.home;
  const contactPath = pagePath(lang, "contacto");

  return (
    <>
      <HeroSlideshow images={heroImages}>
        <h1>{t.hero.h1}</h1>
        <img
          className="hero__logo"
          src="/images/Logo-vitalitat-quiropractica.png"
          alt="Vitalitat Quiropràctica Familiar"
          width={2251}
          height={741}
        />
        <p className="hero__tagline">{t.hero.tagline}</p>
      </HeroSlideshow>

      <section className="section section--two-col section--intro">
        <img src="/images/DSC00142-scaled.jpg" alt={h.introImgAlt} width={2560} height={1707} loading="lazy" />
        <div>
          <p className="kicker">{h.introKicker}</p>
          <h2><Rich text={h.introTitle} /></h2>
          <p><Rich text={h.intro1} /></p>
          <p><Rich text={h.intro2} /></p>
          <div className="button-row">
            <Link className="button" to={contactPath}>{h.introButton}</Link>
            <Link className="button button--outline" to={pagePath(lang, "quiropractica")}>
              {h.introLearn} <span aria-hidden="true" className="button__arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--help">
        <p className="kicker">{h.helpKicker}</p>
        <h2>{h.helpTitle}</h2>
        <div className="pq-cards pq-cards--2">
          {h.helpCards.map((c) => (
            <article key={c.id} className={`pq-card pq-card--${c.id}`}>
              <div className="pq-card__media">
                <img src={HELP_IMG[c.id]} alt={c.alt} width={1280} height={854} loading="lazy" />
                <h3>{c.title}</h3>
              </div>
              <div className="pq-card__body">
                <p>{c.text}</p>
                <Link
                  className="button button--outline"
                  to={`${pagePath(lang, "paraQuien")}${DETAIL_IDS.has(c.id) ? `#${c.id}` : ""}`}
                >
                  {h.helpMore} <span aria-hidden="true" className="button__arrow">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--two-col section--doctor">
        <div>
          <p className="kicker">{h.doctorKicker}</p>
          <h2>{h.doctorTitle}</h2>
          <p>{h.doctor1}</p>
          <p>{h.doctor2}</p>
          <Link className="button" to={pagePath(lang, "equipo")}>{h.doctorButton}</Link>
        </div>
        <img src="/images/Mari-Angeles-Carmona-scaled.jpg" alt={h.doctorImgAlt} width={1600} height={1067} loading="lazy" />
        <ul className="doctor-logos" aria-label={t.quiropractica.logosLabel}>
          {LOGOS.map((l) => (
            <li key={l.name}>
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                <img src={l.src} alt={l.name} loading="lazy" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--counters">
        <div className="counters">
          {counters.map((value, i) => (
            <Counter key={t.counters[i]} value={value} label={t.counters[i]} />
          ))}
        </div>
      </section>

      <section className="section section--experiences">
        <TestimonialCarousel items={testimonials} />
      </section>

      <section className="section section--faq" aria-labelledby="home-faq-title">
        <div className="home-faq__head">
          <div>
            <p className="kicker">{h.faqKicker}</p>
            <h2 id="home-faq-title">{h.faqTitle}</h2>
          </div>
          <Link className="button button--outline" to={pagePath(lang, "faq")}>
            {h.faqAll} <span aria-hidden="true" className="button__arrow">→</span>
          </Link>
        </div>
        <div className="home-faq__list">
          {t.faq.items.slice(0, 4).map((item) => (
            <details key={item.q} className="home-faq__item">
              <summary>{item.q}</summary>
              <p>
                <Rich text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="section section--center section--visit" aria-labelledby="home-visit-title">
        <h2 id="home-visit-title">{h.visitTitle}</h2>
        <p className="visit__steps">{h.visitSteps}</p>
        <Link className="button" to={pagePath(lang, "contacto")}>{h.visitButton}</Link>
      </section>
    </>
  );
}
