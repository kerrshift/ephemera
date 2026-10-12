"use client";

import * as React from "react";

type Toast = { id: number; title: string; description?: string; tone: "default" | "danger"; leaving?: boolean };
type Options = { description?: string; tone?: Toast["tone"]; duration?: number };

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function dismiss(id: number) {
  toasts = toasts.map((t) => (t.id === id ? { ...t, leaving: true } : t));
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 350);
}

/** Print a receipt slip. Returns its id. */
export function toast(title: string, { description, tone = "default", duration = 4000 }: Options = {}) {
  const id = nextId++;
  toasts = [...toasts, { id, title, description, tone }].slice(-4);
  emit();
  if (duration !== Infinity) setTimeout(() => dismiss(id), duration);
  return id;
}
toast.dismiss = dismiss;

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const EMPTY: Toast[] = [];

const EDGE = "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 10px 100%";

/** Render once, near the root of your app. */
export function Toaster({ position = "bottom-right" }: { position?: "bottom-right" | "top-right" | "bottom-center" }) {
  const list = React.useSyncExternalStore(
    subscribe,
    () => toasts,
    () => EMPTY,
  );
  const pos =
    position === "top-right"
      ? "top-4 right-4 items-end"
      : position === "bottom-center"
        ? "bottom-4 left-1/2 -translate-x-1/2 items-center"
        : "bottom-4 right-4 items-end";

  return (
    <div aria-live="polite" className={`pointer-events-none fixed z-[100] flex w-[300px] max-w-[calc(100vw-2rem)] flex-col gap-3 ${pos}`}>
      {list.map((t) => (
        <div
          key={t.id}
          role="status"
          data-paper-motion
          className="pointer-events-auto w-full"
          style={{
            filter: "drop-shadow(0 6px 10px rgb(0 0 0 / .2))",
            animation: t.leaving ? "paper-tear-away .35s ease-in both" : "paper-print .45s steps(8) both",
          }}
        >
          <div
            className="paper relative bg-(--paper-raised) px-4 pb-5 pt-3.5 text-(--ink)"
            style={{ mask: EDGE, WebkitMask: EDGE, fontFamily: "var(--font-receipt, var(--font-type, ui-monospace, monospace))" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div
                  className={`text-[12.5px] font-bold uppercase tracking-[0.12em] ${t.tone === "danger" ? "text-(--danger)" : ""}`}
                >
                  {t.title}
                </div>
                {t.description && <div className="mt-1 text-[12px] leading-snug text-(--ink-muted)">{t.description}</div>}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="-mr-1 -mt-0.5 cursor-pointer px-1 text-[15px] leading-none text-(--ink-faint) hover:text-(--ink)"
              >
                ×
              </button>
            </div>
            <div className="mt-2.5 border-t border-dashed border-(--ink-faint)" />
          </div>
        </div>
      ))}
    </div>
  );
}
