import * as React from "react";

const COLORS = {
  yellow: ["#fff3a3", "#fbe77c"],
  pink: ["#ffd1dc", "#fbbccb"],
  blue: ["#cfe8ff", "#b8dcfb"],
  green: ["#d6f5c7", "#c1ecae"],
  orange: ["#ffdcb3", "#fcc994"],
} as const;

export interface StickyNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
  rotate?: number;
  /** Hold it down with a strip of tape or a push pin. */
  attach?: "none" | "tape" | "pin";
  size?: number;
}

const TAPE =
  "conic-gradient(from 45deg at left, #0000, #000 1deg 89deg, #0000 90deg) left / 51% 8px repeat-y, conic-gradient(from -135deg at right, #0000, #000 1deg 89deg, #0000 90deg) right / 51% 8px repeat-y";

export function StickyNote({
  children,
  color = "yellow",
  rotate = 2,
  attach = "none",
  size = 220,
  className = "",
  style,
  ...props
}: StickyNoteProps) {
  const [light, dark] = COLORS[color];
  return (
    <div
      className={`relative isolate inline-block align-top ${className}`}
      style={{ width: size, maxWidth: "100%", transform: `rotate(${rotate}deg)`, ...style }}
      {...props}
    >
      {/* curled-corner shadow */}
      <div
        aria-hidden
        className="absolute bottom-[6px] right-[6px] -z-10 h-[30%] w-[45%]"
        style={{ boxShadow: "8px 12px 14px rgb(0 0 0 / .28)", transform: "rotate(4deg) skewX(8deg)" }}
      />
      <div
        className="aspect-square p-[11%] pt-[14%] text-[22px] leading-[1.25]"
        style={{
          background: `linear-gradient(180deg, ${dark} 0, ${light} 13%, ${light} 70%, color-mix(in srgb, ${light} 85%, #fff) 100%)`,
          boxShadow: "0 1px 2px rgb(0 0 0 / .12), 0 4px 8px -2px rgb(0 0 0 / .14)",
          borderBottomRightRadius: "38px 6px",
          color: "#2a2a4a",
          fontFamily: "var(--font-hand, 'Bradley Hand', 'Segoe Print', cursive)",
        }}
      >
        {children}
      </div>
      {attach === "tape" && (
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-7 w-[46%]"
          style={{
            transform: "translate(-50%, -50%) rotate(-3deg)",
            background: "linear-gradient(180deg, rgb(240 232 210 / .75), rgb(228 218 190 / .7))",
            mask: TAPE,
            WebkitMask: TAPE,
          }}
        />
      )}
      {attach === "pin" && (
        <div aria-hidden className="absolute left-1/2 top-[7%] -translate-x-1/2">
          <div
            className="h-5 w-5 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 30%, #ff8a8a, #d1262f 55%, #8c1218)",
              boxShadow: "2px 4px 5px rgb(0 0 0 / .35)",
            }}
          />
        </div>
      )}
    </div>
  );
}
