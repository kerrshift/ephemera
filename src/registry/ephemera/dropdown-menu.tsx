"use client";

import * as React from "react";
import { DropdownMenu as MenuPrimitive } from "radix-ui";

const type = { fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" };

function usePaperContainer() {
  const anchor = React.useRef<HTMLSpanElement>(null);
  const [container, setContainer] = React.useState<HTMLElement | undefined>();
  React.useEffect(() => {
    const el = anchor.current?.closest<HTMLElement>("[data-paper]");
    setContainer(el && el !== document.documentElement ? el : undefined);
  }, []);
  return [anchor, container] as const;
}

/** A typed menu on an index card. */
export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export const DropdownMenuGroup = MenuPrimitive.Group;
export const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;
export const DropdownMenuSub = MenuPrimitive.Sub;

const surface =
  "paper z-50 min-w-[12rem] overflow-hidden rounded-[3px] border border-(--edge) bg-(--paper-raised) p-1 text-(--ink) shadow-[0_14px_30px_-12px_rgb(0_0_0/.45)] data-[state=open]:animate-[paper-pop-in_.14s_ease-out]";

const item =
  "group/item relative flex cursor-pointer select-none items-center gap-2 rounded-[2px] py-2 pl-7 pr-3 text-[13.5px] outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-(--paper-sunk) data-[disabled]:opacity-45 [&_svg]:size-4";

export function DropdownMenuContent({ className = "", sideOffset = 6, ...props }: React.ComponentProps<typeof MenuPrimitive.Content>) {
  const [anchor, container] = usePaperContainer();
  return (
    <>
      <span ref={anchor} hidden />
      <MenuPrimitive.Portal container={container}>
        <MenuPrimitive.Content sideOffset={sideOffset} data-paper-motion className={`${surface} origin-(--radix-dropdown-menu-content-transform-origin) ${className}`} {...props} />
      </MenuPrimitive.Portal>
    </>
  );
}

export function DropdownMenuItem({
  className = "",
  style,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Item> & { variant?: "default" | "danger" }) {
  return (
    <MenuPrimitive.Item
      className={`${item} ${variant === "danger" ? "text-(--danger)" : ""} ${className}`}
      style={{ ...type, ...style }}
      {...props}
    >
      {/* pen mark on the highlighted line */}
      <span aria-hidden className="absolute left-2 text-(--pen) opacity-0 transition-opacity group-data-[highlighted]/item:opacity-100">
        ›
      </span>
      {children}
    </MenuPrimitive.Item>
  );
}

const Tick = () => (
  <svg viewBox="0 0 26 26" className="overflow-visible text-(--pen)" aria-hidden>
    <path d="M5 14 C 7 15.5, 9 18, 10.5 20.5 C 13 14, 17 8, 23 2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export function DropdownMenuCheckboxItem({ className = "", style, children, ...props }: React.ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem className={`${item} ${className}`} style={{ ...type, ...style }} {...props}>
      <span className="absolute left-1.5 flex size-4 items-center justify-center">
        <MenuPrimitive.ItemIndicator>
          <Tick />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({ className = "", style, children, ...props }: React.ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem className={`${item} ${className}`} style={{ ...type, ...style }} {...props}>
      <span className="absolute left-2 flex size-3 items-center justify-center">
        <MenuPrimitive.ItemIndicator>
          <span className="block size-2 bg-(--pen)" style={{ borderRadius: "55% 45% 50% 50% / 45% 55% 48% 52%" }} />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

export function DropdownMenuLabel({ className = "", style, ...props }: React.ComponentProps<typeof MenuPrimitive.Label>) {
  return (
    <MenuPrimitive.Label
      className={`px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-(--ink-muted) ${className}`}
      style={{ ...type, ...style }}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({ className = "", ...props }: React.ComponentProps<typeof MenuPrimitive.Separator>) {
  return <MenuPrimitive.Separator className={`-mx-1 my-1 border-t border-dashed border-(--edge) ${className}`} {...props} />;
}

export function DropdownMenuShortcut({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={`ml-auto pl-4 text-[11px] tracking-[0.1em] text-(--ink-faint) ${className}`} {...props} />;
}

export function DropdownMenuSubTrigger({ className = "", style, children, ...props }: React.ComponentProps<typeof MenuPrimitive.SubTrigger>) {
  return (
    <MenuPrimitive.SubTrigger className={`${item} data-[state=open]:bg-(--paper-sunk) ${className}`} style={{ ...type, ...style }} {...props}>
      {children}
      <span aria-hidden className="ml-auto pl-4 text-(--ink-muted)">
        ›
      </span>
    </MenuPrimitive.SubTrigger>
  );
}

export function DropdownMenuSubContent({ className = "", ...props }: React.ComponentProps<typeof MenuPrimitive.SubContent>) {
  const [anchor, container] = usePaperContainer();
  return (
    <>
      <span ref={anchor} hidden />
      <MenuPrimitive.Portal container={container}>
        <MenuPrimitive.SubContent data-paper-motion className={`${surface} ${className}`} {...props} />
      </MenuPrimitive.Portal>
    </>
  );
}
