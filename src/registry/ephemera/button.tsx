import * as React from "react";
import { Slot } from "radix-ui";

const variants = {
  /** Solid ink, like a typewriter key. The default. */
  ink: "bg-(--pen) text-(--pen-ink) border-transparent shadow-[0_3px_0_color-mix(in_srgb,var(--pen)_55%,black),0_4px_6px_-2px_rgb(0_0_0/.3)] hover:brightness-110 active:translate-y-[3px] active:shadow-[0_0_0_color-mix(in_srgb,var(--pen)_55%,black)]",
  /** A raised card of paper. */
  paper:
    "paper bg-(--paper-raised) text-(--ink) border-(--edge) shadow-[0_2px_0_var(--edge),0_3px_6px_-2px_rgb(0_0_0/.18)] hover:bg-(--paper) active:translate-y-[2px] active:shadow-[0_0_0_var(--edge)]",
  /** Just ink on the page, underlined in pencil on hover. */
  ghost:
    "bg-transparent text-(--ink) border-transparent underline decoration-(--ink-faint) decoration-dashed decoration-1 underline-offset-[5px] hover:decoration-(--pen) hover:decoration-solid",
  /** Red ink for things that can't be undone. */
  danger:
    "bg-(--danger) text-(--paper) border-transparent shadow-[0_3px_0_color-mix(in_srgb,var(--danger)_55%,black)] hover:brightness-110 active:translate-y-[3px] active:shadow-none",
} as const;

const sizes = {
  sm: "h-8 px-3 text-[11px] gap-1.5",
  md: "h-10 px-4 text-[12.5px] gap-2",
  lg: "h-12 px-6 text-[14px] gap-2.5",
  icon: "h-10 w-10 text-[14px]",
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Render as the child element instead, e.g. a link. */
  asChild?: boolean;
}

export function Button({ variant = "ink", size = "md", asChild, className = "", ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={`inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[4px] border font-bold uppercase tracking-[0.14em] outline-none transition-[transform,box-shadow,filter,background-color] duration-75 focus-visible:ring-2 focus-visible:ring-(--pen) focus-visible:ring-offset-2 focus-visible:ring-offset-(--paper) disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0 ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" }}
      {...props}
    />
  );
}
