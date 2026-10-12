import Link from "next/link";
import { docs, getDoc, sections, type Doc } from "@/lib/docs";
import { InstallCommand } from "@/components/site";
import { DeskPieces, CardPreview } from "@/components/desk";
import { PaperPicker, PaperProvider, PaperSheet, Showcase } from "@/components/paper-demos";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.org.url}/#organization`,
      name: site.org.name,
      url: site.org.url,
      description: site.org.description,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      description: site.description,
      publisher: { "@id": `${site.org.url}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareSourceCode",
      name: site.name,
      description: site.description,
      url: site.url,
      codeRepository: site.repo,
      license: "https://opensource.org/licenses/MIT",
      programmingLanguage: ["TypeScript", "React", "CSS"],
      runtimePlatform: "Web browser",
      keywords: site.keywords.join(", "),
      author: { "@id": `${site.org.url}/#organization` },
    },
  ],
};

function Grid({ items }: { items: Doc[] }) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d) => (
        <div
          key={d.slug}
          className="group relative overflow-hidden rounded-xl border border-line bg-card transition-transform focus-within:ring-2 focus-within:ring-accent hover:-translate-y-0.5"
        >
          <div className="mat flex h-[220px] items-center justify-center overflow-hidden" aria-hidden>
            <div className="pointer-events-none" inert>
              <CardPreview slug={d.slug} />
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {/* stretched link: the whole card is clickable without nesting the preview inside an <a> */}
                <Link href={`/components/${d.slug}`} className="outline-none after:absolute after:inset-0 after:content-['']">
                  {d.title}
                </Link>
              </h3>
              <span className="text-muted transition-transform group-hover:translate-x-0.5">→</span>
            </div>
            <p className="mt-1 text-sm leading-snug text-muted">{d.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const eyebrow = "text-[12px] uppercase tracking-[0.25em] text-accent";
const type = { fontFamily: "var(--font-type)" };

export default function Home() {
  const theme = docs.filter((d) => d.group === "theme");
  const extras = docs.filter((d) => d.group === "extras");

  return (
    <>
      <JsonLd data={structuredData} />
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pt-16">
        <p className={eyebrow} style={type}>
          Free · open source · shadcn compatible
        </p>
        <h1 className="mt-5 max-w-4xl font-head text-[46px] font-bold leading-[0.93] tracking-[-0.045em] sm:text-[88px]">
          A design system printed on <span className="marker">paper.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
          Buttons that press like typewriter keys, inputs on ruled lines, folder tabs, label-maker badges and dialogs that
          arrive like letters. Six paper types, one attribute to switch between them, and it re-skins the shadcn
          components you already have.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/components/paper-theme" className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink shadow-[3px_3px_0_var(--ink)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[4px_4px_0_var(--ink)] active:translate-y-0.5 active:shadow-[1px_1px_0_var(--ink)]">
            Get started
          </Link>
          <Link href="#core" className="rounded-md border border-ink/80 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-card">
            Browse components
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <PaperProvider>
          <div className="mat rounded-2xl px-3 py-6 sm:px-10 sm:py-10">
            <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <span className="text-[20px] text-white/70" style={{ fontFamily: "var(--font-hand)" }}>
                pick a paper →
              </span>
              <PaperPicker dark />
            </div>
            <PaperSheet className="p-4 sm:p-10">
              <Showcase />
            </PaperSheet>
          </div>
        </PaperProvider>
        <p className="mt-3 text-center text-sm text-muted">
          Everything above is real and clickable: the tabs, checkbox, preview dialog and send toast.
        </p>
      </section>

      <section id="core" className="mx-auto max-w-6xl scroll-mt-6 px-4 pt-24 sm:px-6">
        <p className={eyebrow} style={type}>
          The system
        </p>
        <h2 className="mt-3 font-head text-[44px] font-bold leading-none tracking-[-0.04em]">Core</h2>
        <p className="mt-3 max-w-xl text-muted">
          {docs.filter((d) => d.group === "core").length} everyday pieces of an interface, built on Radix for keyboard
          and screen reader support. Same APIs as shadcn/ui, so you can swap them in one at a time.
        </p>
        <div className="mt-8 grid gap-4 rounded-xl border border-line bg-card p-5 sm:p-6">
          <p className="text-sm text-muted">Install the theme and every core component in one go:</p>
          <InstallCommand name="all" />
          <p className="text-sm text-muted">Or start with just the theme and add pieces as you need them:</p>
          <InstallCommand name="paper-theme" />
        </div>
        <Grid items={theme} />
        {sections.map((sec) => (
          <div key={sec.title} className="mt-14">
            <h3 className="text-[12px] uppercase tracking-[0.25em] text-muted" style={type}>
              {sec.title} · {sec.slugs.length}
            </h3>
            <Grid items={sec.slugs.map((s) => getDoc(s)!).filter(Boolean)} />
          </div>
        ))}
      </section>

      <section id="extras" className="mx-auto max-w-6xl scroll-mt-6 px-4 pt-24 sm:px-6">
        <p className={eyebrow} style={type}>
          For the moments that should feel special
        </p>
        <h2 className="mt-3 font-head text-[44px] font-bold leading-none tracking-[-0.04em]">Extras</h2>
        <p className="mt-3 max-w-xl text-muted">
          Receipts that print, tickets that tear, Polaroids that develop. Drop them into confirmations, invites and
          recaps.
        </p>
      </section>
      <section className="mx-auto mt-8 max-w-[1240px] px-4 sm:px-6">
        <div className="mat relative overflow-hidden rounded-2xl px-4 py-12 md:h-[760px] md:p-0">
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
    </>
  );
}
