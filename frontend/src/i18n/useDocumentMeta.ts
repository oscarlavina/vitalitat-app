import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LANGS, alternatePath, dictionaries, langFromPath } from ".";

/** Sincroniza <html lang>, título, descripción y enlaces hreflang con el idioma de la URL. */
export function useDocumentMeta(): void {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);

  useEffect(() => {
    const t = dictionaries[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    description.content = t.meta.description;

    document.head.querySelectorAll("link[data-i18n]").forEach((el) => el.remove());
    const addAlternate = (hreflang: string, path: string) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = window.location.origin + path;
      link.dataset.i18n = "";
      document.head.appendChild(link);
    };
    for (const l of LANGS) addAlternate(l, alternatePath(pathname, l));
    addAlternate("x-default", alternatePath(pathname, "ca"));
  }, [lang, pathname]);
}
