"use client";

import * as React from "react";

const INKS = {
  red: "#c0262d",
  blue: "#1f4fa3",
  green: "#2d7a3e",
  black: "#26241f",
  purple: "#6b2fa0",
} as const;

export interface RubberStampProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Small line under the main text, e.g. a date */
  sub?: React.ReactNode;
  ink?: keyof typeof INKS | (string & {});
  rotate?: number;
  shape?: "box" | "round";
  /** Thud onto the page when scrolled into view. */
  animate?: boolean;
}

// speckled ink: noise thresholded into an alpha mask
const GRUNGE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -4 0 0 0 3.2'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>\") 0 0 / 300px 300px";

const CSS = `
@keyframes eph-thud {
  0% { opacity: 0; transform: rotate(var(--eph-r)) scale(2.2); }
  55% { opacity: 1; transform: rotate(var(--eph-r)) scale(.94); }
  72% { transform: rotate(var(--eph-r)) scale(1.03); }
  100% { opacity: 1; transform: rotate(var(--eph-r)) scale(1); }
}
.eph-stamp-wait { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .eph-stamp-wait { opacity: 1; }
  .eph-stamp { animation: none !important; }
}
`;

function useInView<T extends Element>() {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setInView(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

export function RubberStamp({
  children,
  sub,
  ink = "red",
  rotate = -8,
  shape = "box",
  animate = true,
  className = "",
  style,
  ...props
}: RubberStampProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const color = INKS[ink as keyof typeof INKS] ?? ink;
  const round = shape === "round";

  return (
    <div
      ref={ref}
      className={`eph-stamp inline-flex select-none items-center justify-center ${animate && !inView ? "eph-stamp-wait" : ""} ${className}`}
      style={
        {
          "--eph-r": `${rotate}deg`,
          transform: `rotate(${rotate}deg)`,
          color,
          mixBlendMode: "multiply",
          mask: GRUNGE,
          WebkitMask: GRUNGE,
          animation: animate && inView ? "eph-thud .45s cubic-bezier(.2,.7,.3,1) both" : undefined,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <style href="eph-rubber-stamp" precedence="default">
        {CSS}
      </style>
      <div
        className={`flex flex-col items-center justify-center ${round ? "rounded-full p-[5px]" : "rounded-[6px] p-[4px]"}`}
        style={{ border: "4px solid currentColor" }}
      >
        <div
          className={`flex flex-col items-center justify-center ${round ? "aspect-square rounded-full px-5" : "rounded-[3px] px-4 py-1.5"}`}
          style={{ border: "1.5px solid currentColor" }}
        >
          <span
            className="whitespace-nowrap text-[30px] font-black uppercase leading-none tracking-[0.08em]"
            style={{ fontFamily: "var(--font-stamp, Impact, 'Arial Narrow Bold', sans-serif)" }}
          >
            {children}
          </span>
          {sub && (
            <span
              className="mt-1 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-type, ui-monospace, monospace)" }}
            >
              {sub}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
