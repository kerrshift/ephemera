"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

const NOTES = {
  yellow: "#fff1a1",
  pink: "#ffd3dd",
  blue: "#d2e9ff",
  green: "#d8f4c8",
} as const;

// Popups render in a layer on <body> that copies the paper type of the nearest [data-paper]
// element (and follows it if it changes). That keeps their theme without trapping them inside the
// container's stacking context, so sticky headers can't cover them.
function usePaperContainer() {
  const anchor = React.useRef<HTMLSpanElement>(null);
  const [container, setContainer] = React.useState<HTMLElement | undefined>();
  React.useEffect(() => {
    const source = anchor.current?.closest<HTMLElement>("[data-paper]");
    if (!source || source === document.documentElement) return;
    const layer = document.createElement("div");
    layer.setAttribute("data-paper-layer", "");
    const sync = () => layer.setAttribute("data-paper", source.getAttribute("data-paper") ?? "");
    sync();
    document.body.appendChild(layer);
    const observer = new MutationObserver(sync);
    observer.observe(source, { attributes: true, attributeFilter: ["data-paper"] });
    setContainer(layer);
    return () => {
      observer.disconnect();
      layer.remove();
    };
  }, []);
  return [anchor, container] as const;
}

/** Wrap your app (or a section) once to share hover delays between tooltips. */
export function TooltipProvider({ delayDuration = 200, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

/** A sticky note that appears on hover. Includes its own provider, so it works standalone. */
export function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root {...props} />
    </TooltipProvider>
  );
}

export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
  className = "",
  style,
  sideOffset = 8,
  note = "yellow",
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & { note?: keyof typeof NOTES }) {
  const [anchor, container] = usePaperContainer();
  return (
    <>
      <span ref={anchor} hidden />
      <TooltipPrimitive.Portal container={container}>
        <TooltipPrimitive.Content
          sideOffset={sideOffset}
          data-paper-motion
          className={`z-50 max-w-[240px] origin-(--radix-tooltip-content-transform-origin) animate-[paper-pop-in_.14s_ease-out] ${className}`}
          {...props}
        >
          <div
            className="rotate-[-1.5deg] px-3.5 py-2 text-[18px] leading-tight"
            style={{
              background: `linear-gradient(180deg, color-mix(in srgb, ${NOTES[note]} 88%, #000) 0, ${NOTES[note]} 18%)`,
              color: "#2a2a4a",
              fontFamily: "var(--font-hand, 'Bradley Hand', 'Segoe Print', cursive)",
              boxShadow: "0 1px 1px rgb(0 0 0 / .1), 2px 6px 12px -4px rgb(0 0 0 / .35)",
              borderBottomRightRadius: "14px 3px",
              ...style,
            }}
          >
            {children}
          </div>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </>
  );
}
