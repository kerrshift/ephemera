import { ogImage, ogSize } from "@/lib/og";
import { docs, getDoc } from "@/lib/docs";

// prerendered to a file at build time (static export)
export const dynamic = "force-static";

export const alt = "Preview card for an Ephemera paper component";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const doc = getDoc((await params).slug);
  return ogImage({
    eyebrow: doc?.group === "theme" ? "Theme" : doc?.group === "extras" ? "Extra" : "Component",
    title: doc?.title ?? "Ephemera",
    subtitle: doc?.description ?? "",
  });
}
