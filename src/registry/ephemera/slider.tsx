"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

// Ticks are placed by value: a tall tick every 10%, a short one every 2%, plus the closing 100% tick.
const RULER = [
  "linear-gradient(90deg, var(--ink) 1px, transparent 1px) 0 0 / 10% 55% repeat-x",
  "linear-gradient(90deg, var(--ink-muted) 1px, transparent 1px) 0 0 / 2% 28% repeat-x",
  "linear-gradient(270deg, var(--ink) 1px, transparent 1px) 0 0 / 100% 55% no-repeat",
  "var(--paper-raised)",
].join(", ");

// Radix keeps the thumb inside the root, so its centre travels from THUMB/2 to (width - THUMB/2).
// Insetting the ruler by the same amount makes the nib's tip land exactly on the value.
const THUMB = 16;

/** A wooden-ruler slider with a pen-nib marker. */
export function Slider({ className = "", defaultValue, value, min = 0, max = 100, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const count = (value ?? defaultValue ?? [min]).length;
  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={`relative flex w-full touch-none select-none items-center pt-3 data-[disabled]:opacity-50 ${className}`}
      {...props}
    >
      <SliderPrimitive.Track
        className="relative h-7 grow overflow-hidden rounded-[2px] shadow-[0_0_0_1px_var(--edge),0_2px_4px_-1px_rgb(0_0_0/.2)]"
        style={{ background: RULER, marginInline: THUMB / 2 }}
      >
        <SliderPrimitive.Range className="absolute h-full bg-[color-mix(in_srgb,var(--pen)_18%,transparent)]" />
      </SliderPrimitive.Track>
      {Array.from({ length: count }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-[30px] w-(--thumb) -translate-y-[10px] cursor-grab bg-(--pen) outline-none drop-shadow-[0_2px_2px_rgb(0_0_0/.35)] transition-transform hover:-translate-y-[11px] focus-visible:scale-125 focus-visible:brightness-125 active:cursor-grabbing"
          style={{ "--thumb": `${THUMB}px`, clipPath: "polygon(0 0, 100% 0, 100% 62%, 50% 100%, 0 62%)" } as React.CSSProperties}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
