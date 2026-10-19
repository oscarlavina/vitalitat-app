import { useT } from "../i18n";

export function Equipo() {
  const e = useT().equipo;

  return (
    <section className="section section--two-col team">
      <img src="/images/Mari-Angeles-Carmona-scaled.jpg" alt={e.photoAlt} width={1600} height={1067} />
      <div>
        <h1>{e.name}</h1>
        <p className="kicker">
          {e.role}
          <br />
          {e.degree}
        </p>
        <p className="lead">{e.intro}</p>
        {e.body.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </section>
  );
}
