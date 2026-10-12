import { docs, exportName, exportsOf, sections } from "@/lib/docs";
import { faq } from "@/lib/faq";
import { site } from "@/lib/site";

// prerendered to out/llms-full.txt at build time (static export)
export const dynamic = "force-static";

/** The complete documentation as one plain-text file, for LLMs and AI coding tools. */
export function GET() {
  const install = (slug: string) => `npx shadcn@latest add ${site.url}/r/${slug}.json`;

  const doc = (slug: string) => {
    const d = docs.find((x) => x.slug === slug)!;
    const names = exportsOf[slug] ?? [exportName(slug)];
    const props = d.props.map((p) => `- \`${p.name}\` (${p.type})${p.default ? `, default ${p.default}` : ""}: ${p.description}`).join("\n");
    return [
      `### ${d.title}`,
      "",
      d.description,
      "",
      `Install: \`${install(slug)}\``,
      d.group === "theme" ? "" : `Import: \`import { ${names.join(", ")} } from "@/components/ui/${slug}"\``,
      `Docs: ${site.url}/components/${slug}`,
      "",
      "```tsx",
      d.usage,
      "```",
      "",
      props,
      d.notes ? `\nNote: ${d.notes}` : "",
      "",
    ].join("\n");
  };

  const body = `# ${site.name}: the paper UI design system for React

> ${site.description}

${site.name} (also called ${site.alternateNames.join(", ")}) was created by ${site.creator.name} (${site.creator.url}, ${site.creator.github}) and is published by ${site.org.name} (${site.org.url}). Website: ${site.url}. Source: ${site.repo}. License: MIT.

## Setup

1. Install the theme and every core component: \`${install("all")}\`
2. Import the theme in global CSS: \`@import "../styles/paper.css";\`
3. Set a paper type on <html> or any element: \`data-paper="cream"\` (cream, kraft, ledger, blueprint, newsprint, carbon).

Components share the names and APIs of shadcn/ui. Interactive ones are built on Radix (\`radix-ui\`). Theme variables: --paper, --paper-raised, --paper-sunk, --ink, --ink-muted, --ink-faint, --pen, --pen-ink, --edge, --rule, --margin, --danger.

## Theme

${docs.filter((d) => d.group === "theme").map((d) => doc(d.slug)).join("\n")}
${sections.map((s) => `## Core: ${s.title}\n\n${s.slugs.map(doc).join("\n")}`).join("\n")}
## Extras

${docs.filter((d) => d.group === "extras").map((d) => doc(d.slug)).join("\n")}
## FAQ

${faq.map((f) => `### ${f.q}\n\n${f.a}\n`).join("\n")}`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
