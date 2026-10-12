"use client";

import * as React from "react";

export type ReceiptItem = { name: string; price: number; qty?: number };

export interface ReceiptProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
  items: ReceiptItem[];
  currency?: string;
  /** e.g. 0.08 for 8% tax */
  taxRate?: number;
  footer?: string;
  /** Barcode value. Pass false to hide. */
  barcode?: string | false;
  /** Animate the receipt printing line by line when it scrolls into view. */
  print?: boolean;
  width?: number;
}

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const ZIGZAG =
  "conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) top / 12px 51% repeat-x, conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) bottom / 12px 51% repeat-x";

const CSS = `
@keyframes eph-receipt-print { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
.eph-receipt-hidden { clip-path: inset(0 0 100% 0); }
@media (prefers-reduced-motion: reduce) {
  .eph-receipt-hidden { clip-path: none; }
  .eph-receipt-printing { animation: none !important; }
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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

export function Barcode({ value, height = 44 }: { value: string; height?: number }) {
  const bars = React.useMemo(() => {
    let h = 2166136261;
    const widths: number[] = [];
    for (let i = 0; i < value.length * 5 + 24; i++) {
      h ^= value.charCodeAt(i % value.length) + i;
      h = Math.imul(h, 16777619) >>> 0;
      widths.push((h % 3) + 1);
    }
    return widths;
  }, [value]);

  let x = 0;
  const rects: React.ReactNode[] = [];
  bars.forEach((w, i) => {
    if (i % 2 === 0) rects.push(<rect key={i} x={x} y={0} width={w} height={height} />);
    x += w;
  });

  return (
    <svg
      viewBox={`0 0 ${x} ${height}`}
      preserveAspectRatio="none"
      width="100%"
      height={height}
      fill="currentColor"
      aria-hidden
    >
      {rects}
    </svg>
  );
}

const money = (n: number, c: string) => `${c}${n.toFixed(2)}`;

export function Receipt({
  title = "EPHEMERA GOODS CO.",
  subtitle,
  meta,
  items,
  currency = "$",
  taxRate = 0,
  footer = "THANK YOU, COME AGAIN",
  barcode = "0000-EPHEMERA",
  print = true,
  width = 300,
  className = "",
  style,
  ...props
}: ReceiptProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const subtotal = items.reduce((s, i) => s + i.price * (i.qty ?? 1), 0);
  const tax = subtotal * taxRate;
  const lines = items.length + (meta?.length ?? 0) + 12;

  const rule = <div className="my-2 border-t border-dashed border-current opacity-60" />;

  return (
    <div
      ref={ref}
      className={`inline-block align-top ${className}`}
      style={{ filter: "drop-shadow(0 6px 10px rgb(0 0 0 / .14)) drop-shadow(0 1px 1px rgb(0 0 0 / .12))", ...style }}
      {...props}
    >
      <style href="eph-receipt" precedence="default">
        {CSS}
      </style>
      <div
        className={print ? (inView ? "eph-receipt-printing" : "eph-receipt-hidden") : undefined}
        style={{
          width,
          maxWidth: "100%",
          padding: "28px 22px",
          color: "#2e2d2a",
          background: `${NOISE}, linear-gradient(180deg, #fdfcf8, #f6f3ea)`,
          mask: ZIGZAG,
          WebkitMask: ZIGZAG,
          fontFamily: "var(--font-receipt, ui-monospace, 'SFMono-Regular', Menlo, monospace)",
          fontSize: 12.5,
          lineHeight: 1.55,
          letterSpacing: "0.02em",
          textShadow: "0 0 0.4px rgb(0 0 0 / .5)",
          animation: print && inView ? `eph-receipt-print ${Math.min(lines * 0.12, 3.2)}s steps(${lines * 2}) both` : undefined,
        }}
      >
        <div className="text-center">
          <div className="text-[15px] font-bold tracking-[0.12em]">{title}</div>
          {subtitle && <div className="whitespace-pre-line opacity-80">{subtitle}</div>}
        </div>
        {meta && meta.length > 0 && (
          <>
            {rule}
            {meta.map((m) => (
              <div key={m.label} className="flex justify-between gap-4">
                <span>{m.label}</span>
                <span>{m.value}</span>
              </div>
            ))}
          </>
        )}
        {rule}
        {items.map((item, i) => (
          <div key={i} className="flex justify-between gap-3">
            <span className="min-w-0">
              {(item.qty ?? 1) > 1 && <span className="opacity-70">{item.qty} × </span>}
              {item.name.toUpperCase()}
            </span>
            <span className="shrink-0 tabular-nums">{money(item.price * (item.qty ?? 1), currency)}</span>
          </div>
        ))}
        {rule}
        {taxRate > 0 && (
          <>
            <div className="flex justify-between">
              <span>SUBTOTAL</span>
              <span className="tabular-nums">{money(subtotal, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span>TAX {(taxRate * 100).toFixed(taxRate * 100 % 1 ? 1 : 0)}%</span>
              <span className="tabular-nums">{money(tax, currency)}</span>
            </div>
          </>
        )}
        <div className="mt-1 flex justify-between text-[16px] font-bold">
          <span>TOTAL</span>
          <span className="tabular-nums">{money(subtotal + tax, currency)}</span>
        </div>
        {rule}
        {footer && <div className="mt-3 text-center tracking-[0.15em]">{footer}</div>}
        {barcode !== false && (
          <div className="mt-4">
            <Barcode value={barcode} />
            <div className="mt-1 text-center text-[10px] tracking-[0.3em] opacity-80">{barcode}</div>
          </div>
        )}
      </div>
    </div>
  );
}
