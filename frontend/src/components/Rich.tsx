import { Fragment } from "react";

const TOKENS = /(\*\*[^*]+\*\*|__[^_]+__)/g;

/** Renderiza **negrita** y __texto ligero__ sin usar dangerouslySetInnerHTML. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKENS).map((part, i) => {
        if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.length > 4 && part.startsWith("__") && part.endsWith("__")) {
          return <span key={i} className="light">{part.slice(2, -2)}</span>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
