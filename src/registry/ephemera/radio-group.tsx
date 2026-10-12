"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

/** Pencil circles that fill with a blot of ink. */
export function RadioGroup({ className = "", ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={`grid gap-3 ${className}`} {...props} />;
}

export function RadioGroupItem({ className = "", ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={`peer relative inline-flex size-[20px] shrink-0 cursor-pointer items-center justify-center border-[1.5px] border-(--ink-muted) bg-(--paper-raised) outline-none transition-colors hover:border-(--ink) focus-visible:ring-2 focus-visible:ring-(--pen) focus-visible:ring-offset-2 focus-visible:ring-offset-(--paper) disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{ borderRadius: "50% 46% 52% 48% / 48% 52% 46% 50%" }}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-paper-motion
        className="block size-[10px] bg-(--pen) animate-[paper-blot_.25s_ease-out_both]"
        style={{ borderRadius: "55% 45% 50% 50% / 45% 55% 48% 52%" }}
      />
    </RadioGroupPrimitive.Item>
  );
}
