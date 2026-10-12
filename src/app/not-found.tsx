import type { Metadata } from "next";
import Link from "next/link";
import { RubberStamp } from "@/registry/ephemera/rubber-stamp";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <div data-paper="cream" className="paper relative w-full max-w-md rounded-[4px] px-8 py-12 shadow-[0_20px_50px_-20px_rgb(0_0_0/.45)]">
        <p className="text-[12px] uppercase tracking-[0.25em] text-(--ink-muted)" style={{ fontFamily: "var(--font-type)" }}>
          Error 404
        </p>
        <h1 className="mt-3 font-head text-[40px] font-bold leading-none tracking-[-0.04em] text-(--ink)">No such address</h1>
        <p className="mt-4 text-(--ink-muted)">We looked in every drawer. This page doesn&rsquo;t exist, or it moved.</p>
        <RubberStamp ink="red" sub="address unknown" rotate={-10} className="mt-8">
          Return to sender
        </RubberStamp>
      </div>
      <Link
        href="/"
        className="mt-10 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-px"
      >
        Back to the home page
      </Link>
    </section>
  );
}
