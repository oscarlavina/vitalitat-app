import { Link } from "react-router-dom";
import { Rich } from "../components/Rich";
import { pagePath, useLang, useT } from "../i18n";

const DOSSIER_PDF = "/docs/Resumen-de-la-Evidencia-Cientifica-en-Quiropractica-Septiembre-2021.pdf";

export function Quiropractica() {
  const t = useT();
  const lang = useLang();
  const q = t.quiropractica;
  const h = t.home;
  const contactPath = pagePath(lang, "contacto");

  return (
    <>
      <section className="quiro-band-top">
        <p className="kicker">{q.bandKicker}</p>
        <h1>{q.bandTitle}</h1>
      </section>

      <section className="section section--two-col section--intro quiro-hero">
        <img src="/images/DSC00268-scaled.jpg" alt={q.heroAlt} width={1600} height={1067} loading="lazy" />
        <div>
          <p className="kicker">{q.heroKicker}</p>
          <h2>{q.title}</h2>
          {q.intro.map((text) => (
            <p key={text}>
              <Rich text={text} />
            </p>
          ))}
        </div>
      </section>

      <section className="section quiro-nervous" aria-labelledby="quiro-nervous-title">
        <p className="kicker">{q.nervousKicker}</p>
        <h2 id="quiro-nervous-title">{q.nervousTitle}</h2>
        {q.nervous.map((text) => (
          <p key={text}>
            <Rich text={text} />
          </p>
        ))}
        <blockquote className="quiro-quote">{q.quote}</blockquote>
      </section>

      <div className="quiro-band" role="img" aria-label={q.bandAlt} />

      <section className="section quiro-studies" aria-labelledby="quiro-studies-title">
        <p className="kicker">{q.studiesKicker}</p>
        <h2 id="quiro-studies-title">{q.studiesTitle}</h2>
        {q.studies.map((text) => (
          <p key={text}>
            <Rich text={text} />
          </p>
        ))}
        <p>
          {q.dossierPre}{" "}
          <a href={DOSSIER_PDF} target="_blank" rel="noopener noreferrer">
            {q.dossierLink}
          </a>
          .
        </p>
      </section>

      <section className="section section--center section--visit" aria-labelledby="quiro-visit-title">
        <h2 id="quiro-visit-title">{h.visitTitle}</h2>
        <p className="visit__steps">{h.visitSteps}</p>
        <Link className="button" to={contactPath}>{h.visitButton}</Link>
      </section>
    </>
  );
}
