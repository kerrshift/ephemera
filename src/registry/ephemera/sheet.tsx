"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";

function usePaperContainer() {
  const anchor = React.useRef<HTMLSpanElement>(null);
  const [container, setContainer] = React.useState<HTMLElement | undefined>();
  React.useEffect(() => {
    const el = anchor.current?.closest<HTMLElement>("[data-paper]");
    setContainer(el && el !== document.documentElement ? el : undefined);
  }, []);
  return [anchor, container] as const;
}

/** A folder that slides in from the edge of the desk. */
export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;

const sides = {
  right:
    "inset-y-0 right-0 h-full w-[88%] max-w-md border-l data-[state=open]:animate-[paper-slide-in-right_.35s_cubic-bezier(.2,.9,.3,1)_both] data-[state=closed]:animate-[paper-slide-out-right_.25s_ease-in_both]",
  left: "inset-y-0 left-0 h-full w-[88%] max-w-md border-r data-[state=open]:animate-[paper-slide-in-left_.35s_cubic-bezier(.2,.9,.3,1)_both] data-[state=closed]:animate-[paper-slide-out-left_.25s_ease-in_both]",
  bottom:
    "inset-x-0 bottom-0 max-h-[85vh] border-t data-[state=open]:animate-[paper-slide-in-bottom_.35s_cubic-bezier(.2,.9,.3,1)_both] data-[state=closed]:animate-[paper-slide-out-bottom_.25s_ease-in_both]",
} as const;

// the folder tab that sticks out of the sheet
const tabs = {
  right: "left-0 top-10 -translate-x-full rounded-l-[6px] border-r-0 px-1.5 py-4 [writing-mode:vertical-rl] rotate-180",
  left: "right-0 top-10 translate-x-full rounded-r-[6px] border-l-0 px-1.5 py-4 [writing-mode:vertical-rl]",
  bottom: "left-8 top-0 -translate-y-full rounded-t-[6px] border-b-0 px-4 py-1.5",
} as const;

export function SheetContent({
  className = "",
  side = "right",
  tab,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: keyof typeof sides; tab?: React.ReactNode }) {
  const [anchor, container] = usePaperContainer();
  return (
    <>
      <span ref={anchor} hidden />
      <SheetPrimitive.Portal container={container}>
        <SheetPrimitive.Overlay
          data-paper-motion
          className="fixed inset-0 z-50 bg-[rgb(28_22_14/.4)] data-[state=closed]:animate-[paper-fade-out_.25s_ease_both] data-[state=open]:animate-[paper-fade-in_.25s_ease_both]"
        />
        <SheetPrimitive.Content
          data-paper-motion
          className={`fixed z-50 flex flex-col gap-4 border-(--edge) bg-(--paper-raised) p-7 text-(--ink) shadow-[0_0_50px_-10px_rgb(0_0_0/.5)] outline-none ${sides[side]} ${className}`}
          {...props}
        >
          {tab && (
            <span
              aria-hidden
              className={`absolute border border-(--edge) bg-(--paper-raised) text-[10px] font-bold uppercase tracking-[0.2em] text-(--ink-muted) ${tabs[side]}`}
              style={{ fontFamily: "var(--font-type, 'Courier New', monospace)" }}
            >
              {tab}
            </span>
          )}
          <div className="paper absolute inset-0 -z-10 bg-(--paper-raised)" aria-hidden />
          {children}
          <SheetPrimitive.Close
            className="absolute right-4 top-4 cursor-pointer rounded-[3px] px-1.5 text-[18px] leading-none text-(--ink-muted) outline-none hover:text-(--ink) focus-visible:ring-2 focus-visible:ring-(--pen)"
            style={{ fontFamily: "var(--font-type, 'Courier New', monospace)" }}
            aria-label="Close"
          >
            ×
          </SheetPrimitive.Close>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </>
  );
}

export function SheetHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col gap-1.5 pr-8 ${className}`} {...props} />;
}

export function SheetFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mt-auto flex flex-col-reverse gap-3 sm:flex-row sm:justify-end ${className}`} {...props} />;
}

export function SheetTitle({ className = "", style, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={`text-[24px] font-semibold leading-tight tracking-tight ${className}`}
      style={{ fontFamily: "var(--font-display, Georgia, serif)", ...style }}
      {...props}
    />
  );
}

export function SheetDescription({ className = "", ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description className={`text-[14px] leading-relaxed text-(--ink-muted) ${className}`} {...props} />;
}
