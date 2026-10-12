"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";

function usePaperContainer() {
  const anchor = React.useRef<HTMLSpanElement>(null);
  const [container, setContainer] = React.useState<HTMLElement | undefined>();
  React.useEffect(() => {
    const el = anchor.current?.closest<HTMLElement>("[data-paper]");
    setContainer(el && el !== document.documentElement ? el : undefined);
  }, []);
  return [anchor, container] as const;
}

/** A slip of paper with a folded corner. */
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

const FOLD = 16;

export function PopoverContent({
  className = "",
  align = "center",
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const [anchor, container] = usePaperContainer();
  return (
    <>
      <span ref={anchor} hidden />
      <PopoverPrimitive.Portal container={container}>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          data-paper-motion
          className="z-50 origin-(--radix-popover-content-transform-origin) outline-none drop-shadow-[0_12px_18px_rgb(0_0_0/.25)] data-[state=open]:animate-[paper-pop-in_.16s_ease-out]"
          {...props}
        >
          <div
            className={`paper relative w-72 bg-(--paper-raised) p-5 text-(--ink) ${className}`}
            style={{ clipPath: `polygon(0 0, calc(100% - ${FOLD}px) 0, 100% ${FOLD}px, 100% 100%, 0 100%)` }}
          >
            {/* the folded-down corner */}
            <span
              aria-hidden
              className="absolute right-0 top-0"
              style={{
                width: FOLD,
                height: FOLD,
                background: "linear-gradient(225deg, transparent 50%, color-mix(in srgb, var(--paper-sunk) 80%, #000) 50%)",
              }}
            />
            {children}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </>
  );
}
