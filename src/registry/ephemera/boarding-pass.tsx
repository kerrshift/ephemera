import * as React from "react";

type Place = { code: string; city: string };

export interface BoardingPassProps extends React.HTMLAttributes<HTMLDivElement> {
  from: Place;
  to: Place;
  passenger: string;
  airline?: string;
  flight?: string;
  date?: string;
  boarding?: string;
  gate?: string;
  seat?: string;
  group?: string;
  accent?: string;
}

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const R = 12;
const notches = (x: string) =>
  `radial-gradient(circle at ${x} 0, #0000 ${R}px, #000 ${R + 0.5}px) top / 100% 51% no-repeat, radial-gradient(circle at ${x} 100%, #0000 ${R}px, #000 ${R + 0.5}px) bottom / 100% 51% no-repeat`;

function Barcode({ value, height }: { value: string; height: number }) {
  let h = 2166136261;
  let x = 0;
  const rects: React.ReactNode[] = [];
  for (let i = 0; i < value.length * 4 + 20; i++) {
    h ^= value.charCodeAt(i % value.length) + i;
    h = Math.imul(h, 16777619) >>> 0;
    const w = (h % 3) + 1;
    if (i % 2 === 0) rects.push(<rect key={i} x={x} y={0} width={w} height={height} />);
    x += w;
  }
  return (
    <svg viewBox={`0 0 ${x} ${height}`} preserveAspectRatio="none" width="100%" height={height} fill="currentColor" aria-hidden>
      {rects}
    </svg>
  );
}

const mono = { fontFamily: "var(--font-type, ui-monospace, monospace)" };

function Field({ label, value, big }: { label: string; value?: string; big?: boolean }) {
  if (!value) return null;
  return (
    <div className="min-w-0">
      <div className="text-[9px] uppercase tracking-[0.22em] opacity-55" style={mono}>
        {label}
      </div>
      <div className={`truncate font-semibold ${big ? "text-[20px]" : "text-[14px]"}`}>{value}</div>
    </div>
  );
}

export function BoardingPass({
  from,
  to,
  passenger,
  airline = "EPHEMERA AIR",
  flight = "EP 204",
  date = "12 OCT",
  boarding = "09:40",
  gate = "B12",
  seat = "14A",
  group = "2",
  accent = "#1f3b57",
  className = "",
  style,
  ...props
}: BoardingPassProps) {
  const surface: React.CSSProperties = { background: `${NOISE}, #fbfaf6`, color: "#1d2329" };

  return (
    <div
      className={`flex w-full max-w-[600px] ${className}`}
      style={{ filter: "drop-shadow(0 8px 14px rgb(0 0 0 / .15)) drop-shadow(0 1px 1px rgb(0 0 0 / .12))", ...style }}
      {...props}
    >
      <div
        className="min-w-0 flex-1 overflow-hidden rounded-l-[12px]"
        style={{ ...surface, mask: notches("100%"), WebkitMask: notches("100%") }}
      >
        <div className="flex items-center justify-between px-5 py-2.5 text-white" style={{ background: accent }}>
          <span className="text-[12px] font-bold tracking-[0.25em]" style={mono}>
            {airline}
          </span>
          <span className="text-[10px] tracking-[0.3em] opacity-80" style={mono}>
            BOARDING PASS
          </span>
        </div>
        <div className="px-5 pb-5 pt-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[44px] font-bold leading-none tracking-tight" style={{ fontFamily: "var(--font-display, Georgia, serif)" }}>
                {from.code}
              </div>
              <div className="mt-1 truncate text-[11px] uppercase tracking-[0.15em] opacity-60" style={mono}>
                {from.city}
              </div>
            </div>
            <div className="mb-5 flex flex-1 items-center gap-1.5 opacity-70" style={{ color: accent }}>
              <div className="h-px flex-1 border-t border-dashed border-current" />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="rotate(90 12 12)" />
              </svg>
              <div className="h-px flex-1 border-t border-dashed border-current" />
            </div>
            <div className="min-w-0 text-right">
              <div className="text-[44px] font-bold leading-none tracking-tight" style={{ fontFamily: "var(--font-display, Georgia, serif)" }}>
                {to.code}
              </div>
              <div className="mt-1 truncate text-[11px] uppercase tracking-[0.15em] opacity-60" style={mono}>
                {to.city}
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-4">
            <div className="col-span-2">
              <Field label="Passenger" value={passenger.toUpperCase()} />
            </div>
            <Field label="Flight" value={flight} />
            <Field label="Date" value={date} />
            <Field label="Boarding" value={boarding} big />
            <Field label="Gate" value={gate} big />
            <Field label="Seat" value={seat} big />
            <Field label="Group" value={group} big />
          </div>
        </div>
      </div>
      <div
        className="relative flex w-[30%] min-w-[120px] shrink-0 flex-col overflow-hidden rounded-r-[12px]"
        style={{ ...surface, mask: notches("0"), WebkitMask: notches("0") }}
      >
        <div
          className="absolute inset-y-3 left-0 w-[2px]"
          style={{ background: `radial-gradient(circle, ${accent}66 1px, transparent 1.5px) 0 0 / 2px 7px repeat-y` }}
        />
        <div className="py-2.5 text-center text-[10px] font-bold tracking-[0.25em] text-white" style={{ ...mono, background: accent }}>
          {flight}
        </div>
        <div className="flex flex-1 flex-col justify-between gap-3 px-4 pb-4 pt-3">
          <div className="text-[18px] font-bold tracking-tight" style={{ fontFamily: "var(--font-display, Georgia, serif)" }}>
            {from.code} → {to.code}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Seat" value={seat} />
            <Field label="Gate" value={gate} />
          </div>
          <div>
            <Barcode value={`${passenger}${flight}${seat}`} height={36} />
          </div>
        </div>
      </div>
    </div>
  );
}
