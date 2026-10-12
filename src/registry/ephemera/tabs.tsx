"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

/** File-folder tabs. */
export function Tabs({ className = "", ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={`flex flex-col ${className}`} {...props} />;
}

export function TabsList({ className = "", ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={`relative z-10 -mb-px flex items-end gap-1 pl-2 ${className}`} {...props} />;
}

export function TabsTrigger({ className = "", style, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={`relative cursor-pointer rounded-t-[8px] border border-b-0 border-(--edge) bg-(--paper-sunk) px-4 pb-2 pt-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-(--ink-muted) outline-none transition-[transform,color] hover:text-(--ink) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--pen) disabled:pointer-events-none disabled:opacity-50 data-[state=inactive]:translate-y-[3px] data-[state=active]:bg-(--paper-raised) data-[state=active]:pb-3 data-[state=active]:text-(--ink) ${className}`}
      style={{ fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)", ...style }}
      {...props}
    />
  );
}

export function TabsContent({ className = "", ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={`paper rounded-[3px] rounded-tl-none border border-(--edge) bg-(--paper-raised) p-6 text-(--ink) shadow-[0_8px_18px_-8px_rgb(0_0_0/.28)] outline-none focus-visible:ring-2 focus-visible:ring-(--pen) ${className}`}
      {...props}
    />
  );
}
