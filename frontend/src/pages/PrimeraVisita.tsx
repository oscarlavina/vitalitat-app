import { Link } from "react-router-dom";
import { pagePath, useLang, useT } from "../i18n";

export function PrimeraVisita() {
  const t = useT();
  const lang = useLang();
  const h = t.home;
  const pv = t.primeraVisita;
  const contactPath = pagePath(lang, "contacto");

  return (
    <>
      <section className="quiro-band-top">
        <p className="kicker">{t.pages.primeraVisita}</p>
        <h1>{pv.title}</h1>
      </section>

      <section className="section pv-images">
        <div className="pv-images__grid">
          <div className="pv-images__item">
            <div className="pv-images__card">
              <img src="/images/Flat icon cita informativa.png" alt={pv.step1} loading="lazy" />
            </div>
            <span className="pv-images__num">01</span>
            <span className="kicker">{pv.step1}</span>
            <p>{pv.step1Text}</p>
          </div>
          <div className="pv-images__item">
            <div className="pv-images__card pv-images__card--contain">
              <img src="/images/Flat icon avaluacio.png" alt={pv.step2} loading="lazy" />
            </div>
            <span className="pv-images__num">02</span>
            <span className="kicker">{pv.step2}</span>
            <p>{pv.step2Text}</p>
          </div>
          <div className="pv-images__item">
            <div className="pv-images__card">
              <img src="/images/Flat icon results.png" alt={pv.step3} loading="lazy" />
            </div>
            <span className="pv-images__num">03</span>
            <span className="kicker">{pv.step3}</span>
            <p>{pv.step3Text}</p>
          </div>
        </div>
      </section>

      <section className="section section--center section--visit" aria-labelledby="pv-visit-title">
        <h2 id="pv-visit-title">{h.visitTitle}</h2>
        <p className="visit__steps">{h.visitSteps}</p>
        <Link className="button" to={contactPath}>{h.visitButton}</Link>
      </section>
    </>
  );
}
