import * as React from "react";

const type = { fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" };

/** Typed on a single ruled line. */
export function Input({ className = "", style, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-10 w-full min-w-0 border-0 border-b-[1.5px] border-(--rule) bg-transparent px-0.5 pb-1 pt-2 text-[15px] text-(--ink) caret-(--pen) outline-none transition-colors placeholder:text-(--ink-faint) focus:border-(--pen) aria-invalid:border-(--danger) disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{ ...type, ...style }}
      {...props}
    />
  );
}

/** Ruled notebook paper with a margin line. Text sits on the lines. */
export function Textarea({ className = "", style, rows = 5, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={`paper-ruled block w-full resize-y rounded-[3px] border border-(--edge) bg-(--paper-raised) py-0 pl-12 pr-4 text-[15px] text-(--ink) caret-(--pen) outline-none transition-colors placeholder:text-(--ink-faint) focus:border-(--pen) aria-invalid:border-(--danger) disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{ ...type, lineHeight: "28px", paddingTop: 0, ...style }}
      {...props}
    />
  );
}

/** Small typed caps above a field. */
export function Label({ className = "", style, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`block text-[10.5px] font-bold uppercase tracking-[0.2em] text-(--ink-muted) ${className}`}
      style={{ ...type, ...style }}
      {...props}
    />
  );
}
