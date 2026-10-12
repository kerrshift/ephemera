"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

const SIZES = { sm: 32, md: 44, lg: 64, xl: 88 } as const;

export interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  size?: keyof typeof SIZES;
  /** stamp: perforated postage stamp · postmark: round with an inked ring */
  shape?: "stamp" | "postmark";
}

const perf = (r: number) =>
  `radial-gradient(${r}px, #0000 98%, #000) round ${-1.5 * r}px ${-1.5 * r}px / ${3 * r}px ${3 * r}px, linear-gradient(#000 0 0) no-repeat 50% / calc(100% - ${3 * r}px) calc(100% - ${3 * r}px)`;

/** A postage-stamp avatar. Pair with AvatarImage and AvatarFallback. */
export function Avatar({ size = "md", shape = "stamp", className = "", style, children, ...props }: AvatarProps) {
  const px = SIZES[size];
  if (shape === "postmark") {
    return (
      <AvatarPrimitive.Root
        className={`relative inline-flex shrink-0 overflow-hidden rounded-full p-[3px] ${className}`}
        style={{ width: px, height: px, fontSize: px * 0.4, boxShadow: "0 0 0 1.5px var(--ink-muted), inset 0 0 0 1px var(--edge)", ...style }}
        {...props}
      >
        <span className="relative flex size-full overflow-hidden rounded-full">{children}</span>
      </AvatarPrimitive.Root>
    );
  }
  const r = Math.max(2, Math.round(px / 16));
  return (
    <span className={`inline-flex shrink-0 ${className}`} style={{ filter: "drop-shadow(0 1px 2px rgb(0 0 0 / .25))" }}>
      <AvatarPrimitive.Root
        className="relative inline-flex bg-(--paper-raised)"
        style={{ width: px, height: px * 1.12, fontSize: px * 0.4, padding: 2 * r, mask: perf(r), WebkitMask: perf(r), ...style }}
        {...props}
      >
        <span className="relative flex size-full overflow-hidden">{children}</span>
      </AvatarPrimitive.Root>
    </span>
  );
}

export function AvatarImage({ className = "", ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image className={`size-full object-cover ${className}`} {...props} />;
}

export function AvatarFallback({ className = "", style, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={`flex size-full items-center justify-center bg-(--pen) text-[0.9em] font-semibold italic text-(--pen-ink) ${className}`}
      style={{ fontFamily: "var(--font-display, Georgia, serif)", ...style }}
      {...props}
    />
  );
}
