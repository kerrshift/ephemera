import * as React from "react";

const type = { fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" };

/** Ledger paper: ruled rows, a red margin after the first column, double rules for totals. */
export function Table({ className = "", ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="paper relative w-full overflow-x-auto rounded-[3px] border border-(--edge) bg-(--paper-raised) shadow-[0_8px_18px_-10px_rgb(0_0_0/.3)]">
      <table className={`w-full border-collapse text-[14px] text-(--ink) ${className}`} {...props} />
    </div>
  );
}

export function TableHeader({ className = "", ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={`border-b-[3px] border-double border-(--margin) ${className}`} {...props} />;
}

export function TableBody({ className = "", ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={`[&>tr:last-child]:border-b-0 ${className}`} {...props} />;
}

export function TableFooter({ className = "", ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={`border-t-[3px] border-double border-(--ink) font-bold [&>tr]:border-b-0 ${className}`}
      {...props}
    />
  );
}

export function TableRow({ className = "", ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`border-b border-(--rule) transition-colors hover:bg-[color-mix(in_srgb,var(--pen)_5%,transparent)] data-[state=selected]:bg-[color-mix(in_srgb,var(--pen)_9%,transparent)] [&>*:first-child]:border-r [&>*:first-child]:border-(--margin) ${className}`}
      {...props}
    />
  );
}

export function TableHead({
  className = "",
  style,
  numeric,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <th
      className={`h-10 whitespace-nowrap px-4 align-middle text-[10.5px] font-bold uppercase tracking-[0.18em] text-(--ink-muted) ${numeric ? "text-right" : "text-left"} ${className}`}
      style={{ ...type, ...style }}
      {...props}
    />
  );
}

export function TableCell({
  className = "",
  style,
  numeric,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <td
      className={`h-11 px-4 align-middle ${numeric ? "whitespace-nowrap text-right tabular-nums" : ""} ${className}`}
      style={numeric ? { ...type, ...style } : style}
      {...props}
    />
  );
}

export function TableCaption({ className = "", style, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={`caption-bottom px-4 py-3 text-left text-[18px] text-(--ink-muted) ${className}`}
      style={{ fontFamily: "var(--font-hand, 'Bradley Hand', cursive)", ...style }}
      {...props}
    />
  );
}
