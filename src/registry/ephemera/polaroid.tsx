"use client";

import * as React from "react";

export interface PolaroidProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  caption?: React.ReactNode;
  rotate?: number;
  tape?: boolean;
  /** Develop from a murky brown into the full photo when scrolled into view. Click to shake it again. */
  develop?: boolean;
  /** Develop time in ms. */
  duration?: number;
  width?: number;
  /** Custom content instead of an image. */
  children?: React.ReactNode;
}

const CSS = `
@keyframes eph-develop-img {
  0% { filter: sepia(.9) saturate(.2) brightness(.35) contrast(.55) blur(1.5px); }
  60% { filter: sepia(.35) saturate(.7) brightness(.85) contrast(.85) blur(.3px); }
  100% { filter: none; }
}
@keyframes eph-develop-veil { 0% { opacity: 1; } 100% { opacity: 0; } }
@keyframes eph-shake {
  0%,100% { transform: none; }
  20% { transform: rotate(-3deg) translateX(-6px); }
  40% { transform: rotate(3deg) translateX(6px); }
  60% { transform: rotate(-2deg) translateX(-4px); }
  80% { transform: rotate(1deg) translateX(2px); }
}
.eph-undeveloped img, .eph-undeveloped .eph-media { filter: sepia(.9) saturate(.2) brightness(.35) contrast(.55) blur(1.5px); }
@media (prefers-reduced-motion: reduce) {
  .eph-undeveloped img, .eph-undeveloped .eph-media { filter: none; }
  .eph-polaroid * { animation: none !important; }
  .eph-veil { display: none; }
}
`;

const TAPE =
  "conic-gradient(from 45deg at left, #0000, #000 1deg 89deg, #0000 90deg) left / 51% 8px repeat-y, conic-gradient(from -135deg at right, #0000, #000 1deg 89deg, #0000 90deg) right / 51% 8px repeat-y";

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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

export function Polaroid({
  src,
  alt = "",
  caption,
  rotate = -2,
  tape = false,
  develop = true,
  duration = 4000,
  width = 260,
  children,
  className = "",
  style,
  onClick,
  ...props
}: PolaroidProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [shakes, setShakes] = React.useState(0);
  const running = develop && inView;
  const anim = (name: string) => (running ? `${name} ${duration}ms cubic-bezier(.3,.1,.3,1) both` : undefined);

  return (
    <div
      ref={ref}
      className={`eph-polaroid relative inline-block align-top ${develop && !inView ? "eph-undeveloped" : ""} ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, width, maxWidth: "100%", ...style }}
      onClick={(e) => {
        if (develop) setShakes((s) => s + 1);
        onClick?.(e);
      }}
      {...props}
    >
      <style href="eph-polaroid" precedence="default">
        {CSS}
      </style>
      {/* keyed so a click restarts the shake and the develop animation */}
      <div key={shakes} style={{ animation: shakes ? "eph-shake .5s ease-in-out" : undefined }}>
      <div
        className="p-[7%] pb-0"
        style={{
          background: "linear-gradient(160deg, #fffefb, #f3f1ea)",
          boxShadow: "0 1px 1px rgb(0 0 0 / .12), 0 10px 22px -6px rgb(0 0 0 / .28), inset 0 0 0 1px rgb(0 0 0 / .03)",
        }}
      >
        <div className="relative aspect-square overflow-hidden" style={{ background: "#2b2620" }}>
          {children ? (
            <div className="eph-media absolute inset-0" style={{ animation: anim("eph-develop-img") }}>
              {children}
            </div>
          ) : (
            src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ animation: anim("eph-develop-img") }}
              />
            )
          )}
          {develop && (
            <div
              className="eph-veil pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #3a3d36, #2c2a25)",
                mixBlendMode: "multiply",
                opacity: inView ? undefined : 1,
                animation: running ? `eph-develop-veil ${duration * 0.8}ms ease-out both` : undefined,
              }}
            />
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 0 1px rgb(0 0 0 / .15), inset 0 0 24px rgb(0 0 0 / .18)" }}
          />
        </div>
        <div
          className="flex min-h-[64px] items-center justify-center px-2 py-3 text-center text-[24px] leading-tight"
          style={{ fontFamily: "var(--font-hand, 'Bradley Hand', 'Segoe Print', cursive)", color: "#2b2a5a" }}
        >
          {caption}
        </div>
      </div>
      </div>
      {tape && (
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-7 w-24"
          style={{
            transform: "translate(-50%, -45%) rotate(-4deg)",
            background: "linear-gradient(180deg, rgb(238 226 196 / .78), rgb(226 212 178 / .72))",
            mask: TAPE,
            WebkitMask: TAPE,
          }}
        />
      )}
    </div>
  );
}
