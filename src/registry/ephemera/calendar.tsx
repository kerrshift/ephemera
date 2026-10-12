"use client";

import * as React from "react";

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect" | "defaultValue"> {
  selected?: Date;
  onSelect?: (date: Date) => void;
  /** Month shown first. Defaults to the selected date or today. */
  defaultMonth?: Date;
  /** 0 = Sunday, 1 = Monday */
  weekStartsOn?: 0 | 1;
  disabled?: (date: Date) => boolean;
  /** BCP 47 locale for month and weekday names. Fixed by default so server and client render the same. */
  locale?: string;
}

const type = { fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" };

const sameDay = (a?: Date, b?: Date) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

/** A desk calendar page. The chosen day gets circled in pen. */
export function Calendar({
  selected,
  onSelect,
  defaultMonth,
  weekStartsOn = 1,
  disabled,
  locale = "en-US",
  className = "",
  ...props
}: CalendarProps) {
  // No `new Date()` during render: it breaks prerendering and server/client markup can disagree.
  // Without a selected/default date, the current month fills in once mounted.
  const initial = defaultMonth ?? selected;
  const [month, setMonth] = React.useState<Date | undefined>(initial && startOfMonth(initial));
  const [focus, setFocus] = React.useState<Date | undefined>(selected ?? defaultMonth);
  const [today, setToday] = React.useState<Date>();
  const grid = React.useRef<HTMLDivElement>(null);
  const moved = React.useRef(false);

  React.useEffect(() => {
    const now = new Date();
    setToday(now);
    setMonth((m) => m ?? startOfMonth(now));
    setFocus((f) => f ?? now);
  }, []);

  React.useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    grid.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus();
  }, [focus]);

  const first = month && startOfMonth(month);
  const offset = first ? (first.getDay() - weekStartsOn + 7) % 7 : 0;
  const days = first ? Array.from({ length: 42 }, (_, i) => addDays(first, i - offset)) : [];
  const weeks = Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7));
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(new Date(2024, 0, 7 + weekStartsOn + i)),
  );
  const focusInMonth = !!focus && !!month && focus.getMonth() === month.getMonth() && focus.getFullYear() === month.getFullYear();
  const tabbable = focusInMonth ? focus : first;

  const go = (d: Date) => {
    moved.current = true;
    setFocus(d);
    if (!month || d.getMonth() !== month.getMonth() || d.getFullYear() !== month.getFullYear()) setMonth(startOfMonth(d));
  };

  const onKeyDown = (e: React.KeyboardEvent, d: Date) => {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in map) {
      e.preventDefault();
      go(addDays(d, map[e.key]));
    } else if (e.key === "PageUp" || e.key === "PageDown") {
      e.preventDefault();
      go(new Date(d.getFullYear(), d.getMonth() + (e.key === "PageUp" ? -1 : 1), d.getDate()));
    }
  };

  const nav = (delta: number) => month && setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));
  const navBtn =
    "flex size-8 cursor-pointer items-center justify-center rounded-[3px] text-[18px] text-(--ink-muted) outline-none hover:bg-(--paper-sunk) hover:text-(--ink) focus-visible:ring-2 focus-visible:ring-(--pen)";

  return (
    <div
      className={`paper relative inline-block w-[300px] max-w-full rounded-[4px] border border-(--edge) bg-(--paper-raised) text-(--ink) shadow-[0_10px_24px_-12px_rgb(0_0_0/.4)] ${className}`}
      {...props}
    >
      {/* binding with two rings */}
      <div className="relative h-4 rounded-t-[4px] bg-(--pen)">
        {[28, 72].map((x) => (
          <span
            key={x}
            aria-hidden
            className="absolute -top-2.5 h-5 w-2 rounded-full border-2 border-(--ink-muted) bg-(--paper-sunk)"
            style={{ left: `${x}%` }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between px-3 pb-1 pt-3">
        <button type="button" className={navBtn} onClick={() => nav(-1)} aria-label="Previous month">
          ‹
        </button>
        <div className="text-center" aria-live="polite">
          <div className="text-[22px] font-semibold leading-none tracking-tight" style={{ fontFamily: "var(--font-display, Georgia, serif)" }}>
            {month ? new Intl.DateTimeFormat(locale, { month: "long" }).format(month) : "\u00a0"}
          </div>
          <div className="mt-1 text-[11px] tracking-[0.3em] text-(--ink-muted)" style={type}>
            {month?.getFullYear() ?? "\u00a0"}
          </div>
        </div>
        <button type="button" className={navBtn} onClick={() => nav(1)} aria-label="Next month">
          ›
        </button>
      </div>
      <div ref={grid} role="grid" className="px-3 pb-3" style={type}>
        <div role="row" className="grid grid-cols-7 border-b border-(--rule) pb-1">
          {weekdays.map((w, i) => (
            <span key={i} role="columnheader" className="text-center text-[10.5px] font-bold text-(--ink-faint)">
              {w}
            </span>
          ))}
        </div>
        {weeks.map((week, w) => (
          <div key={w} role="row" className="grid min-h-9 grid-cols-7">
            {week.map((d) => {
              const outside = d.getMonth() !== month?.getMonth();
              const isSel = sameDay(d, selected);
              const isToday = sameDay(d, today);
              const isDisabled = disabled?.(d) ?? false;
              const sunday = d.getDay() === 0;
              return (
                <div key={d.toISOString()} role="gridcell" aria-selected={isSel || undefined}>
                  <button
                    type="button"
                    tabIndex={sameDay(d, tabbable) ? 0 : -1}
                    disabled={isDisabled}
                    onClick={() => {
                      setFocus(d);
                      onSelect?.(d);
                    }}
                    onKeyDown={(e) => onKeyDown(e, d)}
                    aria-label={new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(d)}
                    aria-current={isToday ? "date" : undefined}
                    className={`relative mx-auto flex size-9 cursor-pointer items-center justify-center rounded-full text-[14px] tabular-nums outline-none transition-colors hover:bg-(--paper-sunk) focus-visible:ring-2 focus-visible:ring-(--pen) disabled:cursor-not-allowed disabled:line-through disabled:opacity-40 ${
                      outside ? "text-(--ink-faint)" : sunday ? "text-(--danger)" : ""
                    } ${isToday ? "font-bold underline decoration-(--pen) decoration-2 underline-offset-4" : ""}`}
                  >
                    {d.getDate()}
                    {isSel && (
                      <svg viewBox="0 0 40 40" aria-hidden className="pointer-events-none absolute -inset-1 overflow-visible text-(--pen)">
                        <path
                          d="M 22 5 C 9 4, 3 13, 5 23 C 7 33, 20 37, 29 33 C 37 29, 38 17, 32 10 C 27 5, 18 4, 12 8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeDasharray="120"
                          data-paper-motion
                          style={{ animation: "paper-draw .35s ease-out both" }}
                        />
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
