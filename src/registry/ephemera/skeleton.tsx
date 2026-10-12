import * as React from "react";

/** A light pencil sketch where content will go. */
export function Skeleton({ className = "", style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      data-paper-motion
      className={`rounded-[2px] ${className}`}
      style={{
        background:
          "repeating-linear-gradient(-45deg, color-mix(in srgb, var(--ink) 16%, transparent) 0 1px, transparent 1px 6px) 0 0 / 24px 24px",
        boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--ink) 12%, transparent)",
        animation: "paper-sketch 1.4s linear infinite",
        ...style,
      }}
      {...props}
    />
  );
}
