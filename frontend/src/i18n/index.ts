import { useLocation } from "react-router-dom";
import { ca, type Dictionary } from "./ca";
import { es } from "./es";

export type Lang = "ca" | "es";
export type PageKey = keyof Dictionary["slugs"];

export const LANGS: Lang[] = ["ca", "es"];
export const NAV_KEYS: PageKey[] = ["quiropractica", "paraQuien", "primeraVisita", "equipo", "faq", "blog", "contacto"];

export const dictionaries: Record<Lang, Dictionary> = { ca, es };

/** Catalán en la raíz (/), español bajo /es. */
export function langFromPath(pathname: string): Lang {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "ca";
}

export function pagePath(lang: Lang, key: PageKey): string {
  const slug = dictionaries[lang].slugs[key];
  const base = lang === "es" ? "/es" : "";
  return slug ? `${base}/${slug}` : base || "/";
}

/** Ruta equivalente de `pathname` en el idioma `target`; si la página no existe, la home. */
export function alternatePath(pathname: string, target: Lang): string {
  const from = langFromPath(pathname);
  const withoutLang = from === "es" ? pathname.replace(/^\/es/, "") : pathname;
  const slug = withoutLang.replace(/^\/+|\/+$/g, "");
  const slugs = dictionaries[from].slugs;
  const key = (Object.keys(slugs) as PageKey[]).find((k) => slugs[k] === slug);
  return pagePath(target, key ?? "home");
}

export function useLang(): Lang {
  return langFromPath(useLocation().pathname);
}

export function useT(): Dictionary {
  return dictionaries[useLang()];
}
