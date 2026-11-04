"use client";

import * as React from "react";
import { demos } from "./demos";
import { site } from "@/lib/site";

let topZ = 10;

/** A piece of paper on the desk you can pick up and move (desktop only). */
export function Draggable({
  x,
  y,
  rotate = 0,
  children,
  className = "",
}: {
  x: string;
  y: string;
  rotate?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [z, setZ] = React.useState(1);
  const [lifted, setLifted] = React.useState(false);
  const drag = React.useRef<{ sx: number; sy: number; ox: number; oy: number; id: number; moved: boolean } | null>(null);
  const justDragged = React.useRef(false);

  return (
    <div
      className={`touch-auto select-none md:absolute md:left-[var(--x)] md:top-[var(--y)] md:touch-none ${className}`}
      style={
        {
          "--x": x,
          "--y": y,
          translate: `${pos.x}px ${pos.y}px`,
          rotate: `${rotate}deg`,
          scale: lifted ? "1.03" : "1",
          zIndex: z,
          cursor: lifted ? "grabbing" : undefined,
          transition: "scale .15s ease, filter .15s ease",
          filter: lifted ? "drop-shadow(0 18px 18px rgb(0 0 0 / .25))" : undefined,
        } as React.CSSProperties
      }
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
        if (!window.matchMedia("(min-width: 768px)").matches) return;
        drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y, id: e.pointerId, moved: false };
        setZ(++topZ);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.sx;
        const dy = e.clientY - d.sy;
        if (!d.moved) {
          if (Math.hypot(dx, dy) < 5) return;
          d.moved = true;
          e.currentTarget.setPointerCapture(d.id);
          setLifted(true);
        }
        setPos({ x: d.ox + dx, y: d.oy + dy });
      }}
      onPointerUp={() => {
        justDragged.current = !!drag.current?.moved;
        drag.current = null;
        setLifted(false);
      }}
      onClickCapture={(e) => {
        if (justDragged.current) {
          e.stopPropagation();
          e.preventDefault();
          justDragged.current = false;
        }
      }}
    >
      {children}
    </div>
  );
}

export function CopyButton({ text, label = "Copy", className = "" }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        } catch {}
      }}
      aria-live="polite"
      className={`shrink-0 cursor-pointer rounded-md border px-2.5 py-1 text-xs transition-colors ${
        className || "border-line bg-card text-muted hover:text-ink"
      }`}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}

/** Copyable `npx shadcn add` line: the @ephemera short name by default, or the full registry URL. */
export function InstallCommand({
  name,
  url = false,
  onDark = false,
  className = "",
}: {
  name: string;
  url?: boolean;
  /** For use on the green mat or other dark surfaces, in either site theme. */
  onDark?: boolean;
  className?: string;
}) {
  const target = url ? `${site.url}/r/${name}.json` : `@ephemera/${name}`;
  const cmd = `npx shadcn@latest add ${target}`;
  return (
    <div
      className={`group flex items-center gap-3 rounded-lg border py-2 pl-4 pr-2 ${
        onDark ? "border-white/15 bg-black/35 text-white backdrop-blur" : "border-line bg-[var(--code-bg)]"
      } ${className}`}
    >
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-[13px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ fontFamily: "var(--font-receipt)" }}>
        <span className={`select-none ${onDark ? "text-white/50" : "text-muted"}`}>$ </span>
        npx shadcn@latest add <span className={onDark ? "text-[#ffe94d]" : "text-accent"}>{target}</span>
      </code>
      <CopyButton
        text={cmd}
        className={onDark ? "border-white/20 bg-white/10 text-white/80 hover:text-white" : ""}
      />
    </div>
  );
}

export function Demo({ slug, replay = true, className = "" }: { slug: string; replay?: boolean; className?: string }) {
  const [n, setN] = React.useState(0);
  const render = demos[slug];
  return (
    <div className={`relative ${className}`}>
      <div key={n} className="flex w-full items-center justify-center">
        {render?.()}
      </div>
      {replay && (
        <button
          type="button"
          onClick={() => setN((v) => v + 1)}
          className="absolute right-3 top-3 rounded-md bg-black/25 px-2.5 py-1 text-xs text-white/85 backdrop-blur transition-colors hover:bg-black/40"
        >
          ↻ Replay
        </button>
      )}
    </div>
  );
}
