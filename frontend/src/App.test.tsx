import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";
import { testimonials } from "./content";
import { alternatePath, langFromPath, pagePath } from "./i18n";

function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  document.head.querySelectorAll("link[data-i18n]").forEach((el) => el.remove());
});

describe("Rutas de idioma", () => {
  it("catalán en la raíz y español bajo /es", () => {
    expect(langFromPath("/")).toBe("ca");
    expect(langFromPath("/contacte")).toBe("ca");
    expect(langFromPath("/es")).toBe("es");
    expect(langFromPath("/es/contacto")).toBe("es");
    expect(langFromPath("/espai")).toBe("ca");
  });

  it("construye rutas por idioma", () => {
    expect(pagePath("ca", "home")).toBe("/");
    expect(pagePath("es", "home")).toBe("/es");
    expect(pagePath("ca", "contacto")).toBe("/contacte");
    expect(pagePath("es", "contacto")).toBe("/es/contacto");
  });

  it("traduce la ruta al cambiar de idioma", () => {
    expect(alternatePath("/", "es")).toBe("/es");
    expect(alternatePath("/es", "ca")).toBe("/");
    expect(alternatePath("/per-a-qui", "es")).toBe("/es/para-quien");
    expect(alternatePath("/es/primera-visita", "ca")).toBe("/primera-visita");
    expect(alternatePath("/es/no-existe", "ca")).toBe("/");
  });
});

describe("Home en catalán (por defecto)", () => {
  it("muestra el h1, el menú y lang=ca", () => {
    renderApp("/");
    expect(
      screen.getByRole("heading", { level: 1, name: "Cura quiropràctica a Vilanova i la Geltrú" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contacte" })).toHaveAttribute("href", "/contacte");
    expect(document.documentElement.lang).toBe("ca");
    expect(document.title).toMatch(/Quiropràctica a Vilanova/);
  });

  it("muestra las opiniones de pacientes", () => {
    renderApp("/");
    expect(screen.getByRole("heading", { level: 2, name: "Opinions dels Nostres Pacients" })).toBeInTheDocument();
    expect(screen.getByText("4.9 sobre 5 | 71 ressenyes a Google")).toBeInTheDocument();
    expect(screen.getAllByRole("blockquote")).toHaveLength(testimonials.length);
    expect(screen.getByRole("button", { name: "Testimoni següent" })).toBeInTheDocument();
  });
});

describe("Home en español (/es)", () => {
  it("muestra el h1, el menú y lang=es", () => {
    renderApp("/es");
    expect(
      screen.getByRole("heading", { level: 1, name: "Cuidado Quiropráctico en Vilanova i la Geltrú" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute("href", "/es/contacto");
    expect(document.documentElement.lang).toBe("es");
    expect(document.title).toMatch(/Quiropráctica en Vilanova/);
  });

  it("los botones de la home apuntan a /es/contacto", () => {
    renderApp("/es");
    const buttons = screen.getAllByRole("link", { name: "Pide cita" });
    expect(buttons.length).toBeGreaterThan(1);
    buttons.forEach((b) => expect(b).toHaveAttribute("href", "/es/contacto"));
  });
});

describe("Selector de idioma", () => {
  it("enlaza a la versión equivalente y marca el idioma activo", () => {
    renderApp("/");
    const nav = screen.getByRole("navigation", { name: "Idioma" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "CA" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute("href", "/es");
  });

  it("cambia a español al pulsar ES", () => {
    renderApp("/");
    fireEvent.click(screen.getByRole("link", { name: "ES" }));
    expect(document.documentElement.lang).toBe("es");
    expect(screen.getByRole("link", { name: "CA" })).toHaveAttribute("href", "/");
  });
});

describe("SEO", () => {
  it("añade hreflang para ca, es y x-default", () => {
    renderApp("/es");
    const hrefs = Object.fromEntries(
      [...document.head.querySelectorAll<HTMLLinkElement>("link[data-i18n]")].map((l) => [
        l.hreflang,
        new URL(l.href).pathname,
      ]),
    );
    expect(hrefs).toEqual({ ca: "/", es: "/es", "x-default": "/" });
  });
});

describe("Footer", () => {
  it("no muestra el bloque de la revista", () => {
    renderApp("/");
    expect(screen.queryByText(/\brevista\b/i)).not.toBeInTheDocument();
  });

  it("muestra el aviso de regulación y los créditos", () => {
    renderApp("/");
    expect(screen.getByText(/La quiropràctica no és una professió sanitària regulada a Espanya/)).toBeInTheDocument();
    expect(screen.getByText(/Alineat per QuiroAds/)).toBeInTheDocument();
  });
});
