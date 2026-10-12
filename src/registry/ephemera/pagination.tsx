import * as React from "react";

const type = { fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" };

/** Page numbers like the corner of a notebook; the current page is circled in pen. */
export function Pagination({ className = "", ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav role="navigation" aria-label="pagination" className={`flex w-full justify-center ${className}`} {...props} />;
}

export function PaginationContent({ className = "", ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={`flex items-center gap-1 ${className}`} {...props} />;
}

export function PaginationItem(props: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li {...props} />;
}

export function PaginationLink({
  isActive,
  className = "",
  style,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={`relative inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-full px-2 text-[14px] tabular-nums text-(--ink) outline-none transition-colors hover:bg-(--paper-sunk) focus-visible:ring-2 focus-visible:ring-(--pen) ${
        isActive ? "font-bold" : "text-(--ink-muted)"
      } ${className}`}
      style={{ ...type, ...style }}
      {...props}
    >
      {children}
      {isActive && (
        <svg viewBox="0 0 40 40" aria-hidden className="pointer-events-none absolute -inset-0.5 overflow-visible text-(--pen)">
          <path
            d="M 22 5 C 9 4, 3 13, 5 23 C 7 33, 20 37, 29 33 C 37 29, 38 17, 32 10 C 27 5, 18 4, 12 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </a>
  );
}

export function PaginationPrevious({ className = "", children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <PaginationLink aria-label="Go to previous page" className={`gap-1 px-3 text-[11.5px] uppercase tracking-[0.14em] ${className}`} {...props}>
      ‹ {children ?? "Prev"}
    </PaginationLink>
  );
}

export function PaginationNext({ className = "", children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <PaginationLink aria-label="Go to next page" className={`gap-1 px-3 text-[11.5px] uppercase tracking-[0.14em] ${className}`} {...props}>
      {children ?? "Next"} ›
    </PaginationLink>
  );
}

export function PaginationEllipsis({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span aria-hidden className={`inline-flex h-9 w-9 items-center justify-center text-(--ink-faint) ${className}`} style={type} {...props}>
      …
    </span>
  );
}
