import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

const host = new URL(site.url).host;

/** Shared social card: a sheet of paper on a green cutting mat. */
export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#24453a",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.13) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      >
        <div
          style={{
            width: 1040,
            height: 470,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            background: "#fbf8f1",
            borderRadius: 6,
            transform: "rotate(-1.2deg)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
            color: "#0f1013",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: 6, background: "#2a3cf5", transform: "rotate(-6deg)", boxShadow: "4px 4px 0 #ffe94d" }} />
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1.5 }}>ephemera</div>
            <div style={{ marginLeft: "auto", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: "#2a3cf5" }}>{eyebrow}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: title.length > 22 ? 76 : 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
              <span style={{ background: "#ffe94d", padding: "0 12px", marginLeft: -12 }}>{title}</span>
            </div>
            <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.35, color: "#4a4d55", maxWidth: 900 }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#6d7079", borderTop: "2px dashed #d6d1c4", paddingTop: 22 }}>
            <span>Free & open source · shadcn compatible</span>
            <span>{host}</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
