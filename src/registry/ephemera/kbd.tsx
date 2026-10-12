import * as React from "react";

/** A round typewriter key. */
export function Kbd({ className = "", style, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={`inline-flex h-[26px] min-w-[26px] items-center justify-center rounded-full border-[1.5px] border-(--ink) bg-(--paper-raised) px-1.5 text-[11px] font-bold uppercase leading-none text-(--ink) ${className}`}
      style={{
        fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)",
        boxShadow: "inset 0 0 0 2px var(--paper-raised), inset 0 0 0 3px var(--edge), 0 2px 0 var(--ink)",
        ...style,
      }}
      {...props}
    />
  );
}

export function KbdGroup({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center gap-1 ${className}`} {...props} />;
}
