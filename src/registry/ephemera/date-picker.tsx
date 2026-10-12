"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Calendar } from "./calendar";

function usePaperContainer() {
  const anchor = React.useRef<HTMLSpanElement>(null);
  const [container, setContainer] = React.useState<HTMLElement | undefined>();
  React.useEffect(() => {
    const el = anchor.current?.closest<HTMLElement>("[data-paper]");
    setContainer(el && el !== document.documentElement ? el : undefined);
  }, []);
  return [anchor, container] as const;
}

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  locale?: string;
  disabled?: (date: Date) => boolean;
  id?: string;
  className?: string;
}

/** A ruled-line field that opens a desk calendar. */
export function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = "Pick a date",
  locale = "en-US",
  disabled,
  id,
  className = "",
}: DatePickerProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [anchor, container] = usePaperContainer();
  const date = value ?? inner;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <span ref={anchor} hidden />
      <PopoverPrimitive.Trigger
        id={id}
        className={`flex h-10 w-full cursor-pointer items-center justify-between gap-2 border-0 border-b-[1.5px] border-(--rule) bg-transparent px-0.5 pb-1 pt-2 text-left text-[15px] outline-none transition-colors focus-visible:border-(--pen) data-[state=open]:border-(--pen) ${
          date ? "text-(--ink)" : "text-(--ink-faint)"
        } ${className}`}
        style={{ fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" }}
      >
        {date ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(date) : placeholder}
        <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-(--ink-muted)" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
          <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal container={container}>
        <PopoverPrimitive.Content align="start" sideOffset={8} data-paper-motion className="z-50 outline-none data-[state=open]:animate-[paper-pop-in_.16s_ease-out]">
          <Calendar
            selected={date}
            locale={locale}
            disabled={disabled}
            onSelect={(d) => {
              setInner(d);
              onChange?.(d);
              setOpen(false);
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
