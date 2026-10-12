"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

/** Index-card dividers that open to reveal their notes. */
export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className = "", ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={`border-b border-dashed border-(--edge) last:border-b-0 ${className}`} {...props} />;
}

export function AccordionTrigger({ className = "", style, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={`group flex flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-left text-[12.5px] font-bold uppercase tracking-[0.16em] text-(--ink) outline-none transition-colors hover:text-(--pen) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--pen) disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{ fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)", ...style }}
        {...props}
      >
        {children}
        <span aria-hidden className="shrink-0 text-[18px] font-normal leading-none text-(--ink-muted) transition-transform duration-200 group-data-[state=open]:rotate-45">
          +
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className = "", children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-paper-motion
      className="overflow-hidden text-[15px] leading-relaxed text-(--ink-muted) data-[state=closed]:animate-[paper-accordion-up_.2s_ease-out] data-[state=open]:animate-[paper-accordion-down_.2s_ease-out]"
      {...props}
    >
      <div className={`pb-4 ${className}`}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
