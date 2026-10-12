"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

/** A letter that slides up out of its envelope. */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className = "",
  children,
  showClose = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { showClose?: boolean }) {
  // Portal into the nearest data-paper container so the letter keeps its paper theme.
  const anchor = React.useRef<HTMLSpanElement>(null);
  const [container, setContainer] = React.useState<HTMLElement | undefined>();
  React.useEffect(() => {
    const el = anchor.current?.closest<HTMLElement>("[data-paper]");
    setContainer(el && el !== document.documentElement ? el : undefined);
  }, []);

  return (
    <>
    <span ref={anchor} hidden />
    <DialogPrimitive.Portal container={container}>
      <DialogPrimitive.Overlay
        data-paper-motion
        className="fixed inset-0 z-50 bg-[rgb(28_22_14/.45)] backdrop-blur-[2px] data-[state=closed]:animate-[paper-fade-out_.2s_ease_both] data-[state=open]:animate-[paper-fade-in_.2s_ease_both]"
      />
      <DialogPrimitive.Content
        data-paper-motion
        className={`paper fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg rounded-[3px] border border-(--edge) bg-(--paper-raised) p-7 text-(--ink) shadow-[0_24px_60px_-12px_rgb(0_0_0/.5)] outline-none data-[state=closed]:animate-[paper-letter-out_.2s_ease-in_both] data-[state=open]:animate-[paper-letter-in_.4s_cubic-bezier(.2,.9,.3,1.1)_both] ${className}`}
        {...props}
      >
        {/* fold line across the letter */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-[linear-gradient(90deg,transparent,rgb(0_0_0/.07)_15%,rgb(0_0_0/.07)_85%,transparent)]" />
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className="absolute right-4 top-4 cursor-pointer rounded-[3px] px-1.5 text-[18px] leading-none text-(--ink-muted) outline-none transition-colors hover:text-(--ink) focus-visible:ring-2 focus-visible:ring-(--pen)"
            style={{ fontFamily: "var(--font-type, 'Courier New', monospace)" }}
            aria-label="Close"
          >
            ×
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
    </>
  );
}

export function DialogHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mb-4 flex flex-col gap-1.5 pr-6 ${className}`} {...props} />;
}

export function DialogFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end ${className}`} {...props} />;
}

export function DialogTitle({ className = "", style, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={`text-[24px] font-semibold leading-tight tracking-tight ${className}`}
      style={{ fontFamily: "var(--font-display, Georgia, serif)", ...style }}
      {...props}
    />
  );
}

export function DialogDescription({ className = "", ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={`text-[14px] leading-relaxed text-(--ink-muted) ${className}`} {...props} />;
}
