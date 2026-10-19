import { useT } from "../i18n";

export function Pending() {
  const t = useT();
  return (
    <section className="section section--narrow">
      <h1>{t.pending.title}</h1>
      <p>{t.pending.text}</p>
    </section>
  );
}
