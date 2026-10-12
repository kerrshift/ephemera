"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

export interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  /** rule: a thin line · double: a ledger total line · perforated: tear here · scissors: perforated with a ✂ */
  variant?: "rule" | "double" | "perforated" | "scissors";
}

/** Rules, double rules and tear-here perforations. */
export function Separator({ variant = "rule", orientation = "horizontal", decorative = true, className = "", ...props }: SeparatorProps) {
  const vertical = orientation === "vertical";

  if (vertical || variant === "rule" || variant === "double") {
    return (
      <SeparatorPrimitive.Root
        orientation={orientation}
        decorative={decorative}
        className={`shrink-0 ${
          vertical
            ? "h-full w-px self-stretch bg-(--edge)"
            : variant === "double"
              ? "h-[4px] w-full border-y border-(--ink)"
              : "h-px w-full bg-(--edge)"
        } ${className}`}
        {...props}
      />
    );
  }

  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      decorative={decorative}
      className={`relative flex h-4 w-full shrink-0 items-center ${className}`}
      {...props}
    >
      <span
        className="h-[2px] flex-1"
        style={{ background: "radial-gradient(circle, var(--ink-faint) 1px, transparent 1.5px) 0 50% / 7px 2px repeat-x" }}
      />
      {variant === "scissors" && (
        <span aria-hidden className="absolute -top-px left-3 bg-(--paper) px-1 text-[13px] leading-none text-(--ink-muted)">
          ✂
        </span>
      )}
    </SeparatorPrimitive.Root>
  );
}
