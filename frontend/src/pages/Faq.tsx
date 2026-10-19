import { Link } from "react-router-dom";
import { Rich } from "../components/Rich";
import { pagePath, useLang, useT } from "../i18n";

export function Faq() {
  const t = useT();
  const lang = useLang();
  const f = t.faq;

  return (
    <>
      <section className="section section--narrow faq">
        <h1>{f.title}</h1>
        <p className="faq__intro">{f.intro}</p>
        <div className="faq__list">
          {f.items.map((item) => (
            <details key={item.q} className="faq__item">
              <summary>{item.q}</summary>
              <p>
                <Rich text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="section section--center">
        <Link className="button" to={pagePath(lang, "contacto")}>
          {t.paraQuien.cta}
        </Link>
      </section>
    </>
  );
}
