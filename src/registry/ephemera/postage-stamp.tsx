import * as React from "react";

export interface PostageStampProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  /** Denomination, e.g. "42¢" */
  value?: string;
  /** Small text along the bottom, e.g. a country or brand */
  label?: string;
  /** Frame color behind the artwork */
  frame?: string;
  /** Add a cancellation postmark. Pass an object to customise its text. */
  postmark?: boolean | { city?: string; date?: string };
  rotate?: number;
  width?: number;
  /** Custom artwork instead of an image */
  children?: React.ReactNode;
}

const r = 5; // perforation hole radius
const PERF = `radial-gradient(${r}px, #0000 98%, #000) round ${-1.5 * r}px ${-1.5 * r}px / ${3 * r}px ${3 * r}px, linear-gradient(#000 0 0) no-repeat 50% / calc(100% - ${3 * r}px) calc(100% - ${3 * r}px)`;

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Postmark({ city, date, id }: { city: string; date: string; id: string }) {
  return (
    <svg viewBox="0 0 220 100" className="h-full w-full" aria-hidden>
      <defs>
        <path id={`${id}-arc`} d="M 22 50 A 28 28 0 1 1 78 50 A 28 28 0 1 1 22 50" />
        <filter id={`${id}-ink`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="t" />
          <feColorMatrix in="t" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.5 0 0 0 1.9" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
      </defs>
      <g fill="none" stroke="currentColor" filter={`url(#${id}-ink)`}>
        <circle cx="50" cy="50" r="40" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="22" strokeWidth="1.2" />
        <text fill="currentColor" stroke="none" fontSize="10" letterSpacing="2" fontFamily="var(--font-type, ui-monospace, monospace)">
          <textPath href={`#${id}-arc`}>{city.toUpperCase()} · {city.toUpperCase()} ·</textPath>
        </text>
        <text x="50" y="54" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontFamily="var(--font-type, ui-monospace, monospace)">
          {date}
        </text>
        {[30, 42, 54, 66].map((y) => (
          <path key={y} d={`M 96 ${y} q 15 -7 30 0 t 30 0 t 30 0 t 30 0`} strokeWidth="2.6" />
        ))}
      </g>
    </svg>
  );
}

export function PostageStamp({
  src,
  alt = "",
  value = "42¢",
  label = "EPHEMERA POST",
  frame = "#f7f1e3",
  postmark = false,
  rotate = 0,
  width = 160,
  children,
  className = "",
  style,
  ...props
}: PostageStampProps) {
  const id = React.useId().replace(/:/g, "");
  const pm = typeof postmark === "object" ? postmark : {};

  return (
    <div
      className={`relative inline-block align-top ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, width, maxWidth: "100%", ...style }}
      {...props}
    >
      <div style={{ filter: "drop-shadow(0 3px 5px rgb(0 0 0 / .18)) drop-shadow(0 0 .5px rgb(0 0 0 / .3))" }}>
        <div style={{ padding: 2 * r, background: `${NOISE}, #fdfbf5`, mask: PERF, WebkitMask: PERF }}>
          <div className="relative p-[7px]" style={{ background: frame }}>
            <div className="relative aspect-[4/5] overflow-hidden" style={{ background: "#d9cdb4" }}>
              {children ??
                (src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={alt} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
                ))}
              <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgb(0 0 0 / .12)" }} />
            </div>
            <div className="mt-1.5 flex items-baseline justify-between gap-2" style={{ color: "#3a3226" }}>
              <span
                className="truncate text-[8.5px] tracking-[0.18em]"
                style={{ fontFamily: "var(--font-type, ui-monospace, monospace)" }}
              >
                {label}
              </span>
              <span className="text-[20px] font-bold leading-none" style={{ fontFamily: "var(--font-display, Georgia, serif)" }}>
                {value}
              </span>
            </div>
          </div>
        </div>
      </div>
      {postmark && (
        <div
          className="pointer-events-none absolute"
          style={{
            width: "135%",
            aspectRatio: "220 / 100",
            top: "18%",
            left: "-42%",
            transform: "rotate(-12deg)",
            color: "rgb(30 30 45 / .72)",
            mixBlendMode: "multiply",
          }}
        >
          <Postmark id={id} city={pm.city ?? "Paris"} date={pm.date ?? "12 OCT 26"} />
        </div>
      )}
    </div>
  );
}
