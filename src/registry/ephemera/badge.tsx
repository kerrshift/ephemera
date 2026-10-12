import * as React from "react";

const tapes = {
  black: ["#1d1d1f", "#f4f4f4"],
  red: ["#c0262d", "#fff4f2"],
  blue: ["#1f4fa3", "#f2f6ff"],
  green: ["#256b3a", "#f2fff5"],
  yellow: ["#f2c230", "#1d1a10"],
  ink: ["var(--pen)", "var(--pen-ink)"],
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Embossed label-maker tape color. */
  tape?: keyof typeof tapes;
}

/** Embossed label-maker tape. */
export function Badge({ tape = "black", className = "", style, ...props }: BadgeProps) {
  const [bg, fg] = tapes[tape];
  return (
    <span
      className={`inline-flex h-[22px] items-center gap-1 whitespace-nowrap px-2.5 text-[11px] font-bold uppercase leading-none tracking-[0.16em] ${className}`}
      style={{
        background: `linear-gradient(180deg, rgb(255 255 255 / .16), transparent 45%, rgb(0 0 0 / .12)), ${bg}`,
        color: fg,
        clipPath: "polygon(4px 0, calc(100% - 4px) 0, 100% 50%, calc(100% - 4px) 100%, 4px 100%, 0 50%)",
        // raised letters pressed into the tape
        textShadow: "0 1px 0 rgb(0 0 0 / .45), 0 -1px 0 rgb(255 255 255 / .18)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        ...style,
      }}
      {...props}
    />
  );
}
