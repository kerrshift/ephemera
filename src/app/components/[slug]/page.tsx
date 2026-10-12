import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import { docs, exportName, exportsOf, getDoc, sections } from "@/lib/docs";
import { CopyButton, Demo, InstallCommand } from "@/components/site";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/components/[slug]">): Promise<Metadata> {
  const doc = getDoc((await params).slug);
  if (!doc) return {};
  const kind = doc.group === "theme" ? "theme" : "component";
  const title = doc.group === "theme" ? doc.title : `${doc.title} component`;
  const description = `${doc.description} A free, open-source paper-styled ${kind} for React and shadcn/ui, built with Tailwind CSS.`;
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

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: site.url },
      { "@type": "ListItem", position: 2, name: doc.title, item: `${site.url}/components/${doc.slug}` },
    ],
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-6 sm:px-6 lg:grid-cols-[180px_minmax(0,1fr)]">
      <JsonLd data={breadcrumbs} />
      <aside className="hidden lg:block">
        <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto pb-6">
          {[
            { title: "Start here", items: docs.filter((d) => d.group === "theme") },
            ...sections.map((sec) => ({ title: sec.title, items: sec.slugs.map((x) => getDoc(x)!).filter(Boolean) })),
            { title: "Extras", items: docs.filter((d) => d.group === "extras") },
          ].map((g) => (
            <div key={g.title} className="mb-5">
              <p className="mb-1.5 text-[11px] uppercase tracking-[0.2em] text-muted" style={{ fontFamily: "var(--font-type)" }}>
                {g.title}
              </p>
              <ul className="space-y-0.5 text-sm">
                {g.items.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/components/${d.slug}`}
                      className={`block rounded-md px-2 py-1 transition-colors ${
                        d.slug === slug ? "bg-card font-medium text-ink shadow-[inset_2px_0_0_var(--brand)]" : "text-muted hover:text-ink"
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
      </aside>

      <article className="min-w-0">
        <h1 className="font-head text-[44px] font-bold leading-none tracking-[-0.04em] sm:text-[60px]">{doc.title}</h1>
        <p className="mt-3 max-w-2xl text-[17px] text-muted">{doc.description}</p>

        <Demo slug={slug} replay={doc.group === "extras"} className="mat mt-8 flex min-h-[420px] items-center overflow-hidden rounded-2xl px-4 py-14 sm:px-10" />

        <h2 className="mt-12 text-lg font-semibold">Install</h2>
        <div className="mt-3">
          <InstallCommand name={slug} />
        </div>
        <p className="mt-3 text-sm text-muted">
          Or copy the source below into <code className="text-ink">{fileName}</code>.{" "}
          {doc.group === "core"
            ? "Core components need the Paper Theme and Radix where noted."
            : doc.group === "extras"
              ? "It needs React and Tailwind, nothing else."
              : "Then import it in your global CSS."}
        </p>

        <h2 className="mt-12 text-lg font-semibold">Usage</h2>
        <div className="mt-3">
          <CodeBlock html={usageHtml} raw={usage} title={isTheme ? "setup" : "example.tsx"} />
        </div>
        {doc.notes && <p className="mt-3 text-sm text-muted">{doc.notes}</p>}

        <h2 className="mt-12 text-lg font-semibold">Props</h2>
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

        <h2 className="mt-12 text-lg font-semibold">Fonts</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Components read optional CSS variables and fall back to system fonts:{" "}
          <code className="text-ink">--font-display</code>, <code className="text-ink">--font-receipt</code>,{" "}
          <code className="text-ink">--font-type</code>, <code className="text-ink">--font-hand</code> and{" "}
          <code className="text-ink">--font-stamp</code>. This site uses Fraunces, IBM Plex Mono, Courier Prime, Caveat and
          Anton.
        </p>

        <h2 className="mt-12 text-lg font-semibold">Source</h2>
        <div className="mt-3">
          <CodeBlock html={srcHtml} raw={src} title={fileName} />
        </div>

        <nav className="mt-14 flex justify-between gap-4 border-t border-line pt-6 text-sm">
          <Link href={`/components/${prev.slug}`} className="text-muted hover:text-ink">
            ← {prev.title}
          </Link>
          <Link href={`/components/${next.slug}`} className="text-muted hover:text-ink">
            {next.title} →
          </Link>
        </nav>
      </article>
    </div>
  );
}
