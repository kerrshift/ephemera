import { ImageResponse } from "next/og";

// prerendered to a file at build time (static export)
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f3ef" }}>
        <div style={{ position: "relative", display: "flex", width: 110, height: 110 }}>
          <div style={{ position: "absolute", left: 10, top: 10, width: 100, height: 100, borderRadius: 18, background: "#ffe94d", transform: "rotate(-6deg)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 100, height: 100, borderRadius: 18, background: "#2a3cf5", transform: "rotate(-6deg)" }} />
        </div>
      </div>
    ),
    size,
  );
}
