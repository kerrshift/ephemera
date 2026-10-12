import * as React from "react";
import { Slot } from "radix-ui";

const type = { fontFamily: "var(--font-type, 'Courier New', ui-monospace, monospace)" };

/** A typed file path: Drawer › Folder › Letter */
export function Breadcrumb(props: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="breadcrumb" {...props} />;
}

export function BreadcrumbList({ className = "", style, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={`flex flex-wrap items-center gap-2 text-[12.5px] uppercase tracking-[0.12em] text-(--ink-muted) ${className}`}
      style={{ ...type, ...style }}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className = "", ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={`inline-flex items-center gap-2 ${className}`} {...props} />;
}

export function BreadcrumbLink({
  asChild,
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      className={`underline decoration-(--ink-faint) decoration-dashed underline-offset-4 transition-colors hover:text-(--ink) hover:decoration-(--pen) hover:decoration-solid ${className}`}
      {...props}
    />
  );
}

export function BreadcrumbPage({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span role="link" aria-disabled="true" aria-current="page" className={`font-bold text-(--ink) ${className}`} {...props} />;
}

export function BreadcrumbSeparator({ children, className = "", ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li role="presentation" aria-hidden className={`text-(--ink-faint) ${className}`} {...props}>
      {children ?? "›"}
    </li>
  );
}
