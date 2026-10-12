"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

/** A box ticked in pen. */
export function Checkbox({ className = "", ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={`peer relative inline-flex size-[20px] shrink-0 cursor-pointer items-center justify-center border-[1.5px] border-(--ink-muted) bg-(--paper-raised) outline-none transition-colors hover:border-(--ink) focus-visible:ring-2 focus-visible:ring-(--pen) focus-visible:ring-offset-2 focus-visible:ring-offset-(--paper) disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{ borderRadius: "3px 4px 2px 5px / 4px 2px 5px 3px" }}
      {...props}
    >
      <CheckboxPrimitive.Indicator forceMount className="pointer-events-none absolute -inset-[3px] data-[state=unchecked]:hidden">
        <svg viewBox="0 0 26 26" className="h-full w-full overflow-visible text-(--pen)" aria-hidden>
          <path
            d="M5 14 C 7 15.5, 9 18, 10.5 20.5 C 13 14, 17 8, 23 2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="30"
            data-paper-motion
            style={{ animation: "paper-tick .22s cubic-bezier(.3,.6,.4,1) both", strokeDashoffset: 0 }}
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
