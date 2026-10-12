import * as React from "react";

export interface WaxSealProps extends React.SVGAttributes<SVGSVGElement> {
  /** Initials or a short mark, 1–3 characters looks best. */
  children?: React.ReactNode;
  color?: string;
  size?: number;
  /** Changes the shape of the wax drip. */
  seed?: number;
}

function blob(seed: number, cx: number, cy: number, r: number) {
  const n = 14;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + 0.07 * Math.sin(i * 2.3 + seed) + 0.05 * Math.cos(i * 5.1 + seed * 1.7);
    pts.push([cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k]);
  }
  const mid = (p: [number, number], q: [number, number]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const m0 = mid(pts[n - 1], pts[0]);
  let d = `M ${m0[0].toFixed(2)} ${m0[1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const m = mid(p, pts[(i + 1) % n]);
    d += ` Q ${p[0].toFixed(2)} ${p[1].toFixed(2)} ${m[0].toFixed(2)} ${m[1].toFixed(2)}`;
  }
  return d + " Z";
}

export function WaxSeal({ children = "E", color = "#8e1b1f", size = 72, seed = 3, ...props }: WaxSealProps) {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Wax seal" {...props}>
      <defs>
        <radialGradient id={`${id}-g`} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </radialGradient>
        <filter id={`${id}-s`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity=".35" />
        </filter>
      </defs>
      <g filter={`url(#${id}-s)`}>
        <path d={blob(seed, 50, 50, 44)} fill={color} />
        <path d={blob(seed, 50, 50, 44)} fill={`url(#${id}-g)`} />
      </g>
      <circle cx="50" cy="50" r="30" fill={color} />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#000" strokeOpacity=".3" strokeWidth="2.5" />
      <circle cx="50" cy="51" r="30" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="1" strokeDasharray="1.5 2.5" />
      <text
        x="50"
        y="51"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="24"
        fontStyle="italic"
        fontWeight="700"
        fill="#000"
        fillOpacity=".38"
        style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
      >
        {children}
      </text>
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="24"
        fontStyle="italic"
        fontWeight="700"
        fill="#fff"
        fillOpacity=".18"
        style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
      >
        {children}
      </text>
    </svg>
  );
}
