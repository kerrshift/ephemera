import type * as React from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import { docs, exportName, exportsOf, getDoc, groupOf, navGroups } from "@/lib/docs";
import { CopyButton, Demo, InstallCommand } from "@/components/site";
import { JsonLd } from "@/components/json-ld";
import { creatorPerson, orgEntity, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/components/[slug]">): Promise<Metadata> {
  const doc = getDoc((await params).slug);
  if (!doc) return {};
  // e.g. "Paper Slider Component for React & shadcn/ui"
  const title = doc.group === "theme" ? "Paper Theme for shadcn/ui & Tailwind" : `Paper ${doc.title} Component for React & shadcn/ui`;
  const description =
    doc.group === "theme"
      ? `${doc.description} The theme behind Ephemera, a free, open-source paper UI design system for React and shadcn/ui.`
      : `${doc.description} A paper-style ${doc.title.toLowerCase()} from Ephemera, the free, open-source paper UI design system for React and shadcn/ui, built with Tailwind CSS${doc.group === "core" ? " and Radix" : ""}.`;
  const url = `/components/${doc.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${title} — ${site.name}`, description, siteName: site.name },
    twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
  };
}

async function highlight(code: string, lang: "tsx" | "css" = "tsx") {
  return codeToHtml(code, { lang, themes: { light: "github-light", dark: "github-dark-dimmed" }, defaultColor: false });
}

async function source(file: string) {
  return readFile(path.join(process.cwd(), "src", "registry", "ephemera", path.basename(file)), "utf8");
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group mt-14 scroll-mt-24 font-head text-[22px] font-bold tracking-[-0.02em]">
      <a href={`#${id}`} className="outline-none">
        {children}
        <span aria-hidden className="ml-2 text-muted opacity-0 transition-opacity group-hover:opacity-100">#</span>
      </a>
    </h2>
  );
}

function SideNav({ current, columns = false }: { current: string; columns?: boolean }) {
  return (
    <div className={columns ? "grid grid-cols-2 gap-x-4 gap-y-5" : "space-y-6"}>
      {navGroups.map((g) => (
        <div key={g.title}>
          <p className="mb-2 px-2 text-[11px] uppercase tracking-[0.2em] text-muted" style={{ fontFamily: "var(--font-type)" }}>
            {g.title}
          </p>
          <ul className="space-y-px text-sm">
            {g.items.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/components/${d.slug}`}
                  aria-current={d.slug === current ? "page" : undefined}
                  className={`block rounded-md px-2 py-1.5 transition-colors ${
                    d.slug === current
                      ? "bg-card font-medium text-ink shadow-[inset_2px_0_0_var(--brand),0_0_0_1px_var(--line)]"
                      : "text-muted hover:bg-card/60 hover:text-ink"
                  }`}
                >
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ html, raw, title }: { html: string; raw: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[var(--code-bg)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="text-xs text-muted" style={{ fontFamily: "var(--font-receipt)" }}>
          {title}
        </span>
        <CopyButton text={raw} />
      </div>
      <div className="code max-h-[560px] overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default async function ComponentPage({ params }: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const isTheme = doc.group === "theme";
  const names = exportsOf[slug] ?? [exportName(slug), ...(slug === "envelope" ? ["WaxSeal"] : [])];
  const usage = isTheme ? doc.usage : `import { ${names.join(", ")} } from "@/components/ui/${slug}";\n\n${doc.usage}`;
  const src = await source(doc.file);
  const fileName = isTheme ? "styles/paper.css" : `components/ui/${slug}.tsx`;
  const [usageHtml, srcHtml] = await Promise.all([highlight(usage), highlight(src, isTheme ? "css" : "tsx")]);

  const i = docs.findIndex((d) => d.slug === slug);
  const prev = docs[(i - 1 + docs.length) % docs.length];
  const next = docs[(i + 1) % docs.length];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      orgEntity,
      creatorPerson,
      {
        "@type": "TechArticle",
        "@id": `${site.url}/components/${doc.slug}#article`,
        headline: `${doc.title} — paper ${doc.group === "theme" ? "theme" : "component"} for React`,
        description: doc.description,
        url: `${site.url}/components/${doc.slug}`,
        image: `${site.url}/components/${doc.slug}/opengraph-image`,
        inLanguage: "en",
        keywords: [`paper ${doc.title.toLowerCase()}`, `${doc.title} component`, ...site.keywords.slice(0, 8)].join(", "),
        about: { "@type": "SoftwareSourceCode", name: `${doc.title} (${site.name})`, codeRepository: site.repo, programmingLanguage: "TypeScript" },
        isPartOf: { "@id": `${site.url}/#website` },
        author: { "@id": creatorPerson["@id"] },
        publisher: { "@id": orgEntity["@id"] },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: site.url },
          { "@type": "ListItem", position: 2, name: doc.title, item: `${site.url}/components/${doc.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[190px_minmax(0,1fr)]">
      <JsonLd data={structuredData} />
      <aside className="hidden lg:block">
        {/* sits under the 64px sticky header and exactly fills the rest of the screen, so every link is reachable */}
        <nav aria-label="Components" className="sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain pb-10 pt-8 pr-2 [scrollbar-width:thin]">
          <SideNav current={slug} />
        </nav>
      </aside>

      <article className="min-w-0 pt-8">
        <details key={slug} className="group mb-6 rounded-xl border border-line bg-card lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            <span>
              <span className="text-muted">Browse components</span> · {doc.title}
            </span>
            <svg aria-hidden viewBox="0 0 16 16" className="size-4 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4 6 4 4 4-4" />
            </svg>
          </summary>
          <div className="max-h-[60dvh] overflow-y-auto border-t border-line px-4 py-4">
            <SideNav current={slug} columns />
          </div>
        </details>

        <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-muted" style={{ fontFamily: "var(--font-type)" }}>
          <Link href="/" className="hover:text-ink">Docs</Link>
          <span aria-hidden>/</span>
          <span className="text-accent">{groupOf(slug)}</span>
        </p>
        <h1 className="mt-3 font-head text-[44px] font-bold leading-[0.95] tracking-[-0.04em] sm:text-[60px]">{doc.title}</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">{doc.description}</p>

        <Demo slug={slug} replay={doc.group === "extras"} className="mat mt-8 flex min-h-[420px] items-center overflow-hidden rounded-2xl px-4 py-14 sm:px-10" />

        <SectionTitle id="install">Install</SectionTitle>
        <div className="mt-3 space-y-2">
          <InstallCommand name={slug} />
          <InstallCommand name={slug} url />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {doc.group === "theme"
            ? "The CLI merges the theme into your global CSS and installs the five fonts, so there's nothing to import by hand."
            : doc.group === "core"
              ? "Installs the component, its Radix dependency and the paper theme if you don't have it yet."
              : "A single self-contained file that needs only React and Tailwind."}{" "}
          Prefer copying? The full source is <a href="#source" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">below</a>.
        </p>

        <SectionTitle id="usage">Usage</SectionTitle>
        <div className="mt-3">
          <CodeBlock html={usageHtml} raw={usage} title={isTheme ? "setup" : "example.tsx"} />
        </div>
        {doc.notes && <p className="mt-3 text-sm text-muted">{doc.notes}</p>}

        <SectionTitle id="props">Props</SectionTitle>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-card text-muted">
              <tr>
                <th className="px-4 py-2.5 font-medium">Prop</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 font-medium">Default</th>
                <th className="px-4 py-2.5 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {doc.props.map((p) => (
                <tr key={p.name} className="border-t border-line align-top">
                  <td className="px-4 py-2.5 font-medium" style={{ fontFamily: "var(--font-receipt)", fontSize: 12.5 }}>
                    {p.name}
                  </td>
                  <td className="px-4 py-2.5 text-muted" style={{ fontFamily: "var(--font-receipt)", fontSize: 12 }}>
                    {p.type}
                  </td>
                  <td className="px-4 py-2.5 text-muted" style={{ fontFamily: "var(--font-receipt)", fontSize: 12 }}>
                    {p.default ?? "—"}
                  </td>
                  <td className="px-4 py-2.5">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">Any other props are passed to the root element.</p>

        <SectionTitle id="fonts">Fonts</SectionTitle>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Installed automatically with the paper theme: Fraunces (<code className="text-ink">--font-display</code>), IBM Plex
          Mono (<code className="text-ink">--font-receipt</code>), Courier Prime (<code className="text-ink">--font-type</code>),
          Caveat (<code className="text-ink">--font-hand</code>) and Anton (<code className="text-ink">--font-stamp</code>).
          Override any of those variables to use your own fonts.
        </p>

        <SectionTitle id="source">Source</SectionTitle>
        <div className="mt-3">
          <CodeBlock html={srcHtml} raw={src} title={fileName} />
        </div>

        <nav aria-label="More components" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
          <Link href={`/components/${prev.slug}`} className="group rounded-xl border border-line bg-card px-5 py-4 transition-colors hover:border-ink/30">
            <span className="text-xs text-muted">← Previous</span>
            <span className="mt-1 block font-medium group-hover:text-accent">{prev.title}</span>
          </Link>
          <Link href={`/components/${next.slug}`} className="group rounded-xl border border-line bg-card px-5 py-4 text-right transition-colors hover:border-ink/30">
            <span className="text-xs text-muted">Next →</span>
            <span className="mt-1 block font-medium group-hover:text-accent">{next.title}</span>
          </Link>
        </nav>
      </article>
    </div>
  );
}
