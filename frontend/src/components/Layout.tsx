import { Fragment, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { contact } from "../content";
import { LANGS, NAV_KEYS, alternatePath, pagePath, useLang, useT } from "../i18n";
import { useDocumentMeta } from "../i18n/useDocumentMeta";

function LanguageSwitcher() {
  const t = useT();
  const lang = useLang();
  const { pathname } = useLocation();
  return (
    <nav className="lang-switch" aria-label={t.langSwitch.label}>
      {LANGS.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span className="lang-switch__sep" aria-hidden="true">|</span>}
          <Link
            to={alternatePath(pathname, l)}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            className={l === lang ? "lang-switch__item lang-switch__item--active" : "lang-switch__item"}
          >
            {l.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}

function Header() {
  const t = useT();
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const home = pagePath(lang, "home");
  const isHome = pathname.replace(/\/+$/, "") === home.replace(/\/+$/, "");
  const trim = (path: string) => path.replace(/\/+$/, "");
  /** Páginas que abren con un bloque de color a todo el ancho bajo el header. */
  const isTinted = [pagePath(lang, "quiropractica"), pagePath(lang, "primeraVisita")]
    .map(trim).includes(trim(pathname));

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !headerRef.current) return;
      // Mantiene el foco dentro del header (logo, botón y panel) mientras el menú está abierto.
      const items = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !headerRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !headerRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1101px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    headerRef.current?.querySelector<HTMLElement>(".main-nav a")?.focus();
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const classes = ["site-header"];
  if (isHome || isTinted) classes.push("site-header--overlay");
  if (isHome && !scrolled && !open) classes.push("site-header--transparent");
  if (isTinted && !scrolled && !open) classes.push("site-header--tinted");

  return (
    <header ref={headerRef} className={classes.join(" ")}>
      <NavLink to={home} className="site-header__logo" onClick={() => setOpen(false)}>
        <img src="/images/Logo-vitalitat-quiropractica.png" alt={t.nav.homeAria} width={2251} height={741} />
      </NavLink>
      <button
        ref={toggleRef}
        type="button"
        className="site-header__toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label={t.nav.menu}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" />
      </button>
      <div id="main-nav" className={open ? "main-nav main-nav--open" : "main-nav"}>
        <nav aria-label={t.nav.label}>
          <ul>
            {NAV_KEYS.map((key) => {
              const to = pagePath(lang, key);
              return (
                <li key={key}>
                  <NavLink to={to} end={to === home} onClick={() => setOpen(false)}>
                    {t.pages[key]}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <LanguageSwitcher />
        <Link className="button" to={pagePath(lang, "contacto")} onClick={() => setOpen(false)}>
          {t.nav.cta}
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const t = useT();
  const lang = useLang();
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <span className="site-footer__logo" role="img" aria-label="Vitalitat Quiropràctica Familiar" />
          <p>{t.footer.tagline}</p>
          <ul className="plain-list">
            <li><a href={contact.phoneHref}>{contact.phone}</a></li>
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li>
              <a href={contact.directoryHref} target="_blank" rel="noopener noreferrer">
                {t.footer.directory}
              </a>
            </li>
          </ul>
        </div>
        <div className="site-footer__cert">
          <h4>{t.footer.certTitle}</h4>
          <ul className="plain-list">
            {t.footer.certLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <h4>{t.footer.hours}</h4>
          <ul className="plain-list">
            {t.footer.hoursList.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <address>
            {t.footer.certAddress.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>
        <div className="site-footer__col">
          <h4>{t.footer.follow}</h4>
          <ul className="plain-list">
            {contact.social.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="site-footer__legal">
        <div className="site-footer__legal-text">
          <p>
            {t.footer.regulation} {t.footer.regulationNotice}
          </p>
          <p className="site-footer__copy">
            <span>© {new Date().getFullYear()} Vitalitat Quiropràctica</span>
            <span aria-hidden="true">|</span>
            <span>{t.footer.credit}</span>
          </p>
        </div>
        <nav className="site-footer__legal-links" aria-label={t.footer.legalLabel}>
          <Link to={pagePath(lang, "notaLegal")}>{t.footer.legalNotice}</Link>
          <span aria-hidden="true">|</span>
          <Link to={pagePath(lang, "privacidad")}>{t.footer.privacy}</Link>
          <span aria-hidden="true">|</span>
          <Link to={pagePath(lang, "cookies")}>{t.footer.cookies}</Link>
        </nav>
      </div>
    </footer>
  );
}

export function Layout() {
  const t = useT();
  useDocumentMeta();
  return (
    <>
      <a className="skip-link" href="#content">{t.skip}</a>
      <Header />
      <main id="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
