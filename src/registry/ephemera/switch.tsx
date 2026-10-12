"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

/** A typewriter-style lever: a paper tab slides between OFF and ON. */
export function Switch({ className = "", ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={`group peer relative inline-flex h-[26px] w-[58px] shrink-0 cursor-pointer items-center rounded-[5px] border border-(--edge) bg-(--paper-sunk) p-[2px] shadow-[inset_0_1px_3px_rgb(0_0_0/.22)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-(--pen) focus-visible:ring-offset-2 focus-visible:ring-offset-(--paper) disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-transparent data-[state=checked]:bg-(--pen) ${className}`}
      style={{ fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" }}
      {...props}
    >
      <span
        aria-hidden
        className="absolute left-[7px] text-[9px] font-bold tracking-[0.12em] text-(--pen-ink) opacity-0 transition-opacity group-data-[state=checked]:opacity-100"
      >
        ON
      </span>
      <span
        aria-hidden
        className="absolute right-[5px] text-[9px] font-bold tracking-[0.12em] text-(--ink-faint) transition-opacity group-data-[state=checked]:opacity-0"
      >
        OFF
      </span>
      <SwitchPrimitive.Thumb className="relative z-10 flex h-[20px] w-[24px] items-center justify-center gap-[2px] rounded-[3px] border border-(--edge) bg-(--paper-raised) shadow-[0_1px_2px_rgb(0_0_0/.3)] transition-transform duration-150 data-[state=checked]:translate-x-[28px]">
        <span className="h-[9px] w-px bg-(--ink-faint)" />
        <span className="h-[9px] w-px bg-(--ink-faint)" />
        <span className="h-[9px] w-px bg-(--ink-faint)" />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}
