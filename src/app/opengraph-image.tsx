import { ogImage, ogSize } from "@/lib/og";
import { docs } from "@/lib/docs";

// prerendered to a file at build time (static export)
export const dynamic = "force-static";

export const alt = "Ephemera — a paper design system for React";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const core = docs.filter((d) => d.group === "core").length;
  return ogImage({
    eyebrow: "Design system",
    title: "Printed on paper.",
    subtitle: `${core} React components styled as stationery, with six paper themes. Built on Radix and Tailwind CSS.`,
  });
}
