"use client";

import * as React from "react";

export interface TicketProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  eyebrow?: string;
  details?: { label: string; value: string }[];
  admit?: string;
  serial?: string;
  /** Accent color for the side band and stub. */
  accent?: string;
  paper?: string;
  /** Let people drag the stub to tear it off. */
  tearable?: boolean;
  onTear?: () => void;
  /** Custom main body. Replaces title/eyebrow/details. */
  children?: React.ReactNode;
}

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const R = 13; // notch radius
const notches = (side: "left" | "right") => {
  const x = side === "right" ? "100%" : "0";
  return `radial-gradient(circle at ${x} 0, #0000 ${R}px, #000 ${R + 0.5}px) top / 100% 51% no-repeat, radial-gradient(circle at ${x} 100%, #0000 ${R}px, #000 ${R + 0.5}px) bottom / 100% 51% no-repeat`;
};

const TEAR_AT = 90;

export function Ticket({
  title,
  eyebrow,
  details,
  admit = "ADMIT ONE",
  serial = "Nº 004217",
  accent = "#c2410c",
  paper = "#f4ead5",
  tearable = true,
  onTear,
  children,
  className = "",
  style,
  ...props
}: TicketProps) {
  const [dx, setDx] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [torn, setTorn] = React.useState(false);
  const start = React.useRef(0);

  const tear = React.useCallback(() => {
    setTorn(true);
    onTear?.();
  }, [onTear]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!tearable || torn) return;
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = e.clientX;
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const d = Math.max(0, e.clientX - start.current);
    if (d > TEAR_AT) {
      setDragging(false);
      tear();
    } else setDx(d);
  };
  const onPointerUp = () => {
    setDragging(false);
    if (!torn) setDx(0);
  };

  // resistance: the stub strains before it gives
  const pull = dx * 0.32;
  const stubTransform = torn
    ? "translate(70px, 160px) rotate(24deg)"
    : `translateX(${pull}px) rotate(${pull * 0.12}deg)`;

  const surface: React.CSSProperties = {
    background: `${NOISE}, ${paper}`,
    color: "#2a2520",
  };

  return (
    <div
      className={`relative flex w-full max-w-[560px] select-none ${className}`}
      style={{ filter: "drop-shadow(0 8px 14px rgb(0 0 0 / .16)) drop-shadow(0 1px 1px rgb(0 0 0 / .15))", ...style }}
      {...props}
    >
      {/* main */}
      <div
        className="relative flex min-h-[190px] flex-1 overflow-hidden rounded-l-[10px]"
        style={{ ...surface, mask: notches("right"), WebkitMask: notches("right") }}
      >
        <div
          className="flex w-9 shrink-0 items-center justify-center"
          style={{ background: accent, color: paper }}
        >
          <span
            className="whitespace-nowrap text-[11px] font-bold tracking-[0.35em]"
            style={{ transform: "rotate(-90deg)", fontFamily: "var(--font-type, ui-monospace, monospace)" }}
          >
            {admit}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between p-5 pr-6">
          {children ?? (
            <>
              <div>
                {eyebrow && (
                  <div
                    className="text-[11px] uppercase tracking-[0.25em]"
                    style={{ color: accent, fontFamily: "var(--font-type, ui-monospace, monospace)" }}
                  >
                    {eyebrow}
                  </div>
                )}
                <div
                  className="mt-1 text-[30px] leading-[1.05]"
                  style={{ fontFamily: "var(--font-display, Georgia, serif)", fontWeight: 600 }}
                >
                  {title}
                </div>
              </div>
              {details && (
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {details.map((d) => (
                    <div key={d.label}>
                      <div
                        className="text-[9.5px] uppercase tracking-[0.2em] opacity-60"
                        style={{ fontFamily: "var(--font-type, ui-monospace, monospace)" }}
                      >
                        {d.label}
                      </div>
                      <div className="text-[14px] font-semibold">{d.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* stub */}
      <div
        role={tearable ? "button" : undefined}
        tabIndex={tearable && !torn ? 0 : undefined}
        aria-label={tearable ? "Tear off stub" : undefined}
        data-no-drag
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (tearable && !torn && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            tear();
          }
        }}
        className={`group relative flex w-[26%] min-w-[104px] shrink-0 flex-col items-center justify-between rounded-r-[10px] px-2 py-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          tearable && !torn ? "cursor-grab touch-none active:cursor-grabbing" : ""
        }`}
        style={{
          ...surface,
          mask: notches("left"),
          WebkitMask: notches("left"),
          transform: stubTransform,
          transformOrigin: "0% 100%",
          opacity: torn ? 0 : 1,
          transition: dragging
            ? "none"
            : torn
              ? "transform .8s cubic-bezier(.5,0,.75,0), opacity .5s .3s"
              : "transform .45s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* perforation */}
        <div
          className="absolute inset-y-3 left-0 w-[2px]"
          style={{ background: `radial-gradient(circle, ${accent}88 1px, transparent 1.5px) 0 0 / 2px 7px repeat-y` }}
        />
        <div
          className="text-[10px] font-bold tracking-[0.3em]"
          style={{ color: accent, fontFamily: "var(--font-type, ui-monospace, monospace)" }}
        >
          {admit.split(" ")[0]}
        </div>
        <div
          className="whitespace-nowrap text-[13px] tracking-[0.15em]"
          style={{ transform: "rotate(-90deg)", fontFamily: "var(--font-type, ui-monospace, monospace)" }}
        >
          {serial}
        </div>
        <div
          className="text-[9px] uppercase tracking-[0.2em] opacity-50 transition-opacity group-hover:opacity-90"
          style={{ fontFamily: "var(--font-type, ui-monospace, monospace)" }}
        >
          {tearable ? "tear →" : "stub"}
        </div>
      </div>
    </div>
  );
}
