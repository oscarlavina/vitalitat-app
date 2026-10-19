import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const url = process.argv[2] || "http://localhost:4173";
const outFile = process.argv[3] || "export.html";

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(url, { waitUntil: "networkidle" });

// Inline all stylesheets so the file works offline
const html = await page.evaluate(async () => {
  // Inline external <link rel="stylesheet"> as <style>
  const links = [...document.querySelectorAll('link[rel="stylesheet"]')];
  for (const link of links) {
    try {
      const res = await fetch(link.href);
      const css = await res.text();
      const style = document.createElement("style");
      style.textContent = css;
      link.replaceWith(style);
    } catch (_) {}
  }

  // Inline external <script src> as <script> with content
  const scripts = [...document.querySelectorAll("script[src]")];
  for (const s of scripts) {
    try {
      const res = await fetch(s.src);
      const js = await res.text();
      const inlined = document.createElement("script");
      inlined.textContent = js;
      s.replaceWith(inlined);
    } catch (_) {}
  }

  return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
});

await browser.close();

const out = resolve(outFile);
mkdirSync(resolve(outFile, ".."), { recursive: true });
writeFileSync(out, html, "utf-8");
console.log(`✓ Exportado: ${out}`);
