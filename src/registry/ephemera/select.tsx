"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";

const type = { fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" };

// Portal into the nearest data-paper container so the menu keeps its paper theme.
function usePaperContainer() {
  const anchor = React.useRef<HTMLSpanElement>(null);
  const [container, setContainer] = React.useState<HTMLElement | undefined>();
  React.useEffect(() => {
    const el = anchor.current?.closest<HTMLElement>("[data-paper]");
    setContainer(el && el !== document.documentElement ? el : undefined);
  }, []);
  return [anchor, container] as const;
}

/** A card-catalogue drawer of options. */
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({ className = "", style, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={`group flex h-10 w-full cursor-pointer items-center justify-between gap-2 border-0 border-b-[1.5px] border-(--rule) bg-transparent px-0.5 pb-1 pt-2 text-left text-[15px] text-(--ink) outline-none transition-colors focus-visible:border-(--pen) disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-(--danger) data-[placeholder]:text-(--ink-faint) data-[state=open]:border-(--pen) [&>span]:truncate ${className}`}
      style={{ ...type, ...style }}
      {...props}
    >
      {children}
      {/* no asChild inside registry files: the shadcn CLI rewrites it to `render` in Base UI projects */}
      <SelectPrimitive.Icon className="shrink-0 text-[12px] text-(--ink-muted) transition-transform group-data-[state=open]:rotate-180">
        ▼
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className = "",
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const [anchor, container] = usePaperContainer();
  return (
    <>
      <span ref={anchor} hidden />
      <SelectPrimitive.Portal container={container}>
        <SelectPrimitive.Content
          position={position}
          sideOffset={6}
          data-paper-motion
          className={`paper relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto rounded-[3px] border border-(--edge) bg-(--paper-raised) text-(--ink) shadow-[0_14px_30px_-12px_rgb(0_0_0/.45)] data-[state=open]:animate-[paper-pop-in_.16s_ease-out] ${
            position === "popper" ? "w-(--radix-select-trigger-width)" : ""
          } ${className}`}
          {...props}
        >
          <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </>
  );
}

export function SelectItem({ className = "", style, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={`relative flex w-full cursor-pointer select-none items-center border-b border-dashed border-(--edge) py-2 pl-8 pr-3 text-[14px] outline-none last:border-b-0 data-[disabled]:pointer-events-none data-[highlighted]:bg-(--paper-sunk) data-[disabled]:opacity-45 ${className}`}
      style={{ ...type, ...style }}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <svg viewBox="0 0 26 26" className="size-4 overflow-visible text-(--pen)" aria-hidden>
            <path d="M5 14 C 7 15.5, 9 18, 10.5 20.5 C 13 14, 17 8, 23 2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectLabel({ className = "", style, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={`px-3 pb-1 pt-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-(--ink-muted) ${className}`}
      style={{ ...type, ...style }}
      {...props}
    />
  );
}

export function SelectSeparator({ className = "", ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={`-mx-1 my-1 h-px bg-(--margin) ${className}`} {...props} />;
}
