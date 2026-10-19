import { Link } from "react-router-dom";
import { pagePath, useLang, useT } from "../i18n";

export function Blog() {
  const t = useT();
  const lang = useLang();
  const b = t.blog;

  return (
    <>
      <section className="section section--narrow section--center blog">
        <h1>{b.title}</h1>
        <p className="blog__intro">{b.intro}</p>
        <p className="blog__empty">{b.empty}</p>
      </section>

      <section className="section section--center">
        <Link className="button" to={pagePath(lang, "contacto")}>
          {t.paraQuien.cta}
        </Link>
      </section>
    </>
  );
}
