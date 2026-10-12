import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Index-card style: a red rule under the header and blue lines below. */
  ruled?: boolean;
}

/** An index card. */
export function Card({ ruled = false, className = "", ...props }: CardProps) {
  return (
    <div
      data-ruled={ruled || undefined}
      className={`paper group/card flex flex-col rounded-[3px] border border-(--edge) bg-(--paper-raised) text-(--ink) shadow-[0_1px_1px_rgb(0_0_0/.08),0_8px_18px_-8px_rgb(0_0_0/.28)] ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col gap-1 px-6 pb-4 pt-5 group-data-[ruled]/card:border-b-2 group-data-[ruled]/card:border-(--margin) ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className = "", style, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-[22px] font-semibold leading-tight tracking-tight ${className}`}
      style={{ fontFamily: "var(--font-display, Georgia, serif)", ...style }}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-[14px] leading-snug text-(--ink-muted) ${className}`} {...props} />;
}

export function CardContent({ className = "", style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex-1 px-6 py-4 group-data-[ruled]/card:bg-[repeating-linear-gradient(transparent_0_27px,var(--rule)_27px_28px)] group-data-[ruled]/card:leading-[28px] ${className}`}
      style={style}
      {...props}
    />
  );
}

export function CardFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex items-center gap-3 px-6 pb-5 pt-2 ${className}`} {...props} />;
}
