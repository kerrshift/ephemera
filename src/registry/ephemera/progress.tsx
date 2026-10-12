"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

export interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  /** Number of holes on the card. */
  holes?: number;
}

/** A punch card: each hole punched is a step closer to done. */
export function Progress({ value = 0, max = 100, holes = 20, className = "", ...props }: ProgressProps) {
  const punched = Math.round(((value ?? 0) / max) * holes);
  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      className={`paper relative flex w-full items-center gap-[3px] rounded-[3px] border border-(--edge) bg-(--paper-raised) px-2.5 py-2 ${className}`}
      style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
      {...props}
    >
      {Array.from({ length: holes }, (_, i) => (
        <span
          key={i}
          className="aspect-square min-w-0 flex-1 rounded-full transition-[background-color,box-shadow] duration-200"
          style={
            i < punched
              ? { background: "var(--ink)", boxShadow: "inset 0 1px 2px rgb(0 0 0 / .6)", transitionDelay: `${i * 25}ms` }
              : { boxShadow: "inset 0 0 0 1px var(--edge)" }
          }
        />
      ))}
      <ProgressPrimitive.Indicator className="sr-only" />
    </ProgressPrimitive.Root>
  );
}
