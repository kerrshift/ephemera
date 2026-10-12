import * as React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "note" | "danger" | "success";
  /** Shown in the margin, e.g. an icon or a short word. */
  icon?: React.ReactNode;
}

const marks = { note: "NB", danger: "!!", success: "OK" } as const;

/** A memo with a margin note. */
export function Alert({ variant = "note", icon, className = "", children, ...props }: AlertProps) {
  const color = variant === "danger" ? "var(--danger)" : variant === "success" ? "#2d7a3e" : "var(--pen)";
  return (
    <div
      role="alert"
      className={`paper relative rounded-[3px] border border-(--edge) bg-(--paper-raised) py-4 pl-14 pr-5 text-(--ink) shadow-[0_6px_14px_-8px_rgb(0_0_0/.3)] ${className}`}
      {...props}
    >
      <span aria-hidden className="absolute inset-y-0 left-10 w-px bg-(--margin)" />
      <span
        aria-hidden
        className="absolute left-0 top-4 flex w-10 justify-center text-[13px] font-bold tracking-[0.06em] [&_svg]:size-4"
        style={{ color, fontFamily: "var(--font-type, 'Courier New', monospace)" }}
      >
        {icon ?? marks[variant]}
      </span>
      {children}
    </div>
  );
}

export function AlertTitle({ className = "", style, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={`text-[12px] font-bold uppercase tracking-[0.18em] ${className}`}
      style={{ fontFamily: "var(--font-type, 'Courier New', monospace)", ...style }}
      {...props}
    />
  );
}

export function AlertDescription({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mt-1 text-[14.5px] leading-relaxed text-(--ink-muted) ${className}`} {...props} />;
}
