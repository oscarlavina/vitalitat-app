import { Link } from "react-router-dom";
import { Rich } from "../components/Rich";
import { pagePath, useLang, useT } from "../i18n";
import type { Block } from "../i18n/ca";

const IMG_DETAILS: Record<string, string> = {
  embarazo: "/images/Embarazada-1.jpg",
  posparto: "/images/DSC01870-scaled.jpg",
  bebes: "/images/Bebe.jpg",
  ninos: "/images/DSC00160-scaled.jpg",
  adolescentes: "/images/DSC00246-scaled.jpg",
  familias: "/images/DSC00288-scaled.jpg",
};

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if ("h" in b) return <h3 key={i}>{b.h}</h3>;
        if ("ul" in b) {
          return (
            <ul key={i} className="check-list">
              {b.ul.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            <Rich text={b.p} />
          </p>
        );
      })}
    </>
  );
}

export function ParaQuien() {
  const t = useT();
  const lang = useLang();
  const p = t.paraQuien;
  const contactPath = pagePath(lang, "contacto");

  return (
    <>
      <section className="section section--narrow section--center pq-intro">
        <h1>{p.title}</h1>
        {p.intro.map((text) => (
          <p key={text}>
            <Rich text={text} />
          </p>
        ))}
      </section>

      {p.details.map((d, i) => (
        <section
          key={d.id}
          id={d.id}
          className={`section section--two-col pq-detail${i % 2 ? " pq-detail--alt" : ""}`}
          aria-labelledby={`${d.id}-title`}
        >
          <div className="pq-detail__text">
            <h2 id={`${d.id}-title`}>{d.title}</h2>
            <Blocks blocks={d.body} />
          </div>
          <div className="pq-detail__side">
            <img src={IMG_DETAILS[d.id]} alt={d.photoAlt} width={1280} height={854} loading="lazy" />
            <Blocks blocks={d.aside} />
          </div>
        </section>
      ))}

      <section className="section section--center">
        <Link className="button" to={contactPath}>
          {p.cta}
        </Link>
      </section>
    </>
  );
}
