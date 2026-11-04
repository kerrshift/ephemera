import type * as React from "react";
import Link from "next/link";
import { docs, getDoc, sections, type Doc } from "@/lib/docs";
import { InstallCommand } from "@/components/site";
import { DeskPieces, CardPreview } from "@/components/desk";
import { PaperFan, PaperPicker, PaperProvider, PaperSheet, Showcase } from "@/components/paper-demos";
import { JsonLd } from "@/components/json-ld";
import { creatorPerson, orgEntity, site } from "@/lib/site";
import { faq } from "@/lib/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ephemera/accordion";

const coreCount = docs.filter((d) => d.group === "core").length;
const extrasCount = docs.filter((d) => d.group === "extras").length;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    orgEntity,
    creatorPerson,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      alternateName: [...site.alternateNames],
      url: site.url,
      description: site.description,
      creator: { "@id": creatorPerson["@id"] },
      publisher: { "@id": orgEntity["@id"] },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${site.url}/#software`,
      name: `${site.name} — Paper UI Design System`,
      alternateName: [...site.alternateNames],
      description: site.description,
      url: site.url,
      codeRepository: site.repo,
      license: "https://opensource.org/licenses/MIT",
      programmingLanguage: ["TypeScript", "React", "CSS"],
      runtimePlatform: "Web browser",
      applicationCategory: "DeveloperApplication",
      keywords: site.keywords.join(", "),
      isAccessibleForFree: true,
      version: "0.1.0",
      about: [
        { "@type": "Thing", name: "Paper UI" },
        { "@type": "Thing", name: "Design system" },
        { "@type": "Thing", name: "Skeuomorphic design" },
        { "@type": "Thing", name: "shadcn/ui" },
      ],
      hasPart: docs.map((d) => ({
        "@type": "SoftwareSourceCode",
        name: `${d.title} (${site.name})`,
        url: `${site.url}/components/${d.slug}`,
        description: d.description,
      })),
      creator: { "@id": creatorPerson["@id"] },
      author: { "@id": creatorPerson["@id"] },
      publisher: { "@id": orgEntity["@id"] },
      maintainer: { "@id": orgEntity["@id"] },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

function Grid({ items }: { items: Doc[] }) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d) => (
        <div
          key={d.slug}
          className="group relative overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_0_rgb(0_0_0/.03)] transition-[transform,box-shadow,border-color] duration-200 focus-within:ring-2 focus-within:ring-accent hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_18px_40px_-22px_rgb(0_0_0/.45)]"
        >
          <div className="mat flex h-[220px] items-center justify-center overflow-hidden" aria-hidden>
            <div className="pointer-events-none transition-transform duration-300 group-hover:scale-[1.03]" inert>
              <CardPreview slug={d.slug} />
            </div>
          </div>
          <div className="px-5 pb-5 pt-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-head text-[17px] font-bold tracking-[-0.01em]">
                {/* stretched link: the whole card is clickable without nesting the preview inside an <a> */}
                <Link href={`/components/${d.slug}`} className="outline-none after:absolute after:inset-0 after:content-['']">
                  {d.title}
                </Link>
              </h3>
              <span aria-hidden className="text-muted transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-accent">
                →
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted">{d.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const type = { fontFamily: "var(--font-type)" };

function SectionHeader({
  id,
  eyebrow,
  title,
  children,
  aside,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div id={id} className="flex min-w-0 scroll-mt-24 flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent" style={type}>
          {eyebrow}
        </p>
        <h2 className="mt-3 font-head text-[40px] font-bold leading-[0.95] tracking-[-0.04em] sm:text-[52px]">{title}</h2>
        {children && <p className="mt-4 text-[16.5px] leading-relaxed text-muted">{children}</p>}
      </div>
      {aside}
    </div>
  );
}

function GroupHeader({ title, count, blurb }: { title: string; count: number; blurb: string }) {
  return (
    <div className="mt-16 flex items-baseline gap-3 border-b border-line pb-3">
      <h3 className="font-head text-[22px] font-bold tracking-[-0.02em]">{title}</h3>
      <span className="rounded-full border border-line px-2 py-0.5 text-[11px] tabular-nums text-muted" style={type}>
        {count}
      </span>
      <p className="ml-auto hidden text-sm text-muted sm:block">{blurb}</p>
    </div>
  );
}

const blurbs: Record<string, string> = {
  Forms: "Typewriter keys, ruled lines and ink.",
  Layout: "Index cards, folders and ledger paper.",
  Overlays: "Letters, folders, slips and sticky notes.",
  Display: "Stamps, tape, punch cards and pencil.",
};

const features = [
  {
    title: "Same API as shadcn/ui",
    body: "Identical component names and props. Swap one component at a time, or re-skin the ones you already have.",
    icon: "M4 7h16M4 12h16M4 17h10",
  },
  {
    title: "Six papers, one attribute",
    body: "Cream, Kraft, Ledger, Blueprint, Newsprint and Carbon. Set data-paper on any element and nest them freely.",
    icon: "M6 4h9l3 3v13H6zM15 4v3h3",
  },
  {
    title: "Accessible by default",
    body: "Built on Radix primitives: keyboard navigation, focus management, screen readers and reduced motion.",
    icon: "M12 4a2 2 0 1 0 0 .01M5 8l7 1 7-1M12 9v5l-3 6M12 14l3 6",
  },
  {
    title: "One-command install",
    body: "npx shadcn add @ephemera/all brings the theme, fonts and every component. AI tools can read llms.txt.",
    icon: "M5 7l4 4-4 4M11 17h8",
  },
];

export default function Home() {
  const theme = docs.find((d) => d.group === "theme")!;
  const extras = docs.filter((d) => d.group === "extras");

  return (
    <>
      <JsonLd data={structuredData} />
      <PaperProvider>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
            <div>
              <a
                href="https://ui.shadcn.com/docs/directory"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-card py-1 pl-1.5 pr-3 text-[13px] text-muted shadow-[0_1px_0_rgb(0_0_0/.04)] transition-colors hover:border-ink/30 hover:text-ink"
              >
                <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-ink">New</span>
                <span className="hidden sm:inline">Listed in the shadcn registry as</span>
                <span className="sm:hidden">In the shadcn registry:</span>
                <span className="font-medium text-ink">@ephemera</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <h1 className="mt-6 font-head text-[44px] font-bold leading-[0.92] tracking-[-0.045em] sm:text-[80px] lg:text-[72px] xl:text-[80px]">
                A design system printed on <span className="marker">paper.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[17.5px] leading-relaxed text-muted">
                Buttons that press like typewriter keys, inputs on ruled lines, folder tabs, label-maker badges and dialogs
                that arrive like letters. A paper UI design system for React and shadcn/ui.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/components/paper-theme"
                  className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink shadow-[3px_3px_0_var(--ink)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[4px_4px_0_var(--ink)] active:translate-y-0.5 active:shadow-[1px_1px_0_var(--ink)]"
                >
                  Get started
                </Link>
                <Link href="#core" className="rounded-md border border-ink/80 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-card">
                  Browse components
                </Link>
              </div>
              <InstallCommand name="all" className="mt-8 max-w-xl" />
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {[
                  [coreCount, "core components"],
                  [extrasCount, "extras"],
                  [6, "paper types"],
                  [5, "fonts"],
                ].map(([n, label]) => (
                  <div key={label} className="flex items-baseline gap-2">
                    <dt className="font-head text-[26px] font-bold tabular-nums tracking-[-0.03em]">{n}</dt>
                    <dd className="text-sm text-muted">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative hidden lg:block">
              <PaperFan />
              <p className="-mt-2 text-center text-[20px] text-muted" style={{ fontFamily: "var(--font-hand)" }}>
                pick a paper, the demo below follows ↓
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mat rounded-[28px] px-3 py-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/.5)] sm:px-10 sm:py-10">
            <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <span className="text-[20px] text-white/70" style={{ fontFamily: "var(--font-hand)" }}>
                a real app, built only from Ephemera
              </span>
              <PaperPicker dark />
            </div>
            <PaperSheet className="p-4 sm:p-10">
              <Showcase />
            </PaperSheet>
          </div>
          <p className="mt-4 text-center text-sm text-muted">
            Everything above is clickable: the tabs, checkbox, preview dialog and send toast.
          </p>
        </section>
      </PaperProvider>

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="bg-card p-6">
              <svg viewBox="0 0 24 24" className="size-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={f.icon} />
              </svg>
              <h3 className="mt-4 font-head text-[17px] font-bold tracking-[-0.01em]">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
        <SectionHeader
          id="core"
          eyebrow="The system"
          title="Core components"
          aside={<InstallCommand name="all" className="w-full min-w-0 md:w-[420px]" />}
        >
          {coreCount} everyday pieces of an interface, built on Radix for keyboard and screen reader support, with the same
          APIs as shadcn/ui.
        </SectionHeader>

        <div className="group relative mt-10 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-[0_24px_50px_-28px_rgb(0_0_0/.5)] lg:grid-cols-[1.1fr_1fr]">
          <div className="mat flex h-[260px] items-center justify-center lg:h-auto lg:min-h-[300px]" aria-hidden>
            <div className="pointer-events-none scale-90 sm:scale-110" inert>
              <CardPreview slug={theme.slug} />
            </div>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent" style={type}>
              Start here
            </p>
            <h3 className="mt-3 font-head text-[30px] font-bold leading-none tracking-[-0.03em]">
              <Link href={`/components/${theme.slug}`} className="outline-none after:absolute after:inset-0 after:content-['']">
                {theme.title}
              </Link>
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              Six paper types as CSS variables, five fonts, grain and ruled-line utilities. The shadcn CLI merges it into
              your global CSS, and it re-skins the shadcn components you already have.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              Read the theme docs <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </div>
        </div>

        {sections.map((sec) => (
          <div key={sec.title}>
            <GroupHeader title={sec.title} count={sec.slugs.length} blurb={blurbs[sec.title] ?? ""} />
            <Grid items={sec.slugs.map((s) => getDoc(s)!).filter(Boolean)} />
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
        <SectionHeader id="extras" eyebrow="For the moments that should feel special" title="Extras">
          Receipts that print, tickets that tear, Polaroids that develop. Drop them into confirmations, invites and recaps.
          Each one is a single self-contained file.
        </SectionHeader>
      </section>
      <section className="mx-auto mt-10 max-w-[1240px] px-4 sm:px-6">
        <div className="mat relative overflow-hidden rounded-[28px] px-4 py-12 shadow-[0_30px_60px_-30px_rgb(0_0_0/.5)] md:h-[760px] md:p-0">
          <div className="flex flex-col items-center gap-14 md:block">
            <DeskPieces />
          </div>
          <p
            className="pointer-events-none absolute bottom-4 right-5 hidden text-[20px] text-white/55 md:block"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            go on, move things around · tear the ticket · open the envelope
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <Grid items={extras} />
      </section>

      <section id="faq" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-28 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHeader eyebrow="Questions" title="About paper UI">
              Ephemera is a paper UI design system: {coreCount} core components and {extrasCount} extras for React and
              shadcn/ui, styled after real stationery.
            </SectionHeader>
          </div>
          <div data-paper="cream" className="paper self-start rounded-[6px] px-6 py-2 shadow-[0_18px_40px_-20px_rgb(0_0_0/.4)]">
            <Accordion type="single" collapsible defaultValue="faq-0">
              {faq.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger>
                    <h3>{f.q}</h3>
                  </AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
        <div className="mat relative overflow-hidden rounded-[28px] px-6 py-14 text-center shadow-[0_30px_60px_-30px_rgb(0_0_0/.5)] sm:px-12 sm:py-20">
          <h2 className="font-head text-[44px] font-bold leading-[0.95] tracking-[-0.045em] text-white sm:text-[64px]">
            Start printing.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-white/70">
            One command installs the paper theme, its fonts and every core component into your shadcn project.
          </p>
          <InstallCommand name="all" onDark className="mx-auto mt-8 max-w-xl text-left" />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/components/paper-theme"
              className="rounded-md bg-[#fbf8f1] px-5 py-2.5 text-sm font-semibold text-[#0f1013] shadow-[3px_3px_0_var(--highlight)] transition-transform hover:-translate-y-px"
            >
              Read the docs
            </Link>
            <a
              href={site.repo}
              className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
