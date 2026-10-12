// Builds the shadcn registry (public/r/*.json), an "all" bundle, and public/llms.txt from registry.json.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const registry = JSON.parse(readFileSync("registry.json", "utf8"));
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? registry.homepage).replace(/\/$/, "");
const local = new Set(registry.items.map((i) => i.name));
mkdirSync("public/r", { recursive: true });

// Dependencies on our own items become full URLs, so they resolve without any components.json setup.
const resolveDeps = (deps) => deps?.map((d) => (local.has(d) ? `${site}/r/${d}.json` : d));

/**
 * Turns paper.css into the registry `css` object, which the shadcn CLI merges into the user's global CSS.
 * A small parser is enough for our own stylesheet: it understands comments, quoted strings, parentheses and
 * nested blocks (@layer, @keyframes, @media).
 */
function cssToObject(source) {
  const src = source.replace(/\/\*[\s\S]*?\*\//g, "");
  let i = 0;
  const block = () => {
    const obj = {};
    let buf = "";
    let quote = null;
    let paren = 0;
    const flush = () => {
      const text = buf.trim();
      buf = "";
      if (!text) return;
      const colon = text.indexOf(":");
      obj[text.slice(0, colon).trim()] = text.slice(colon + 1).trim().replace(/\s+/g, " ");
    };
    while (i < src.length) {
      const c = src[i++];
      if (quote) {
        buf += c;
        if (c === quote) quote = null;
      } else if (c === '"' || c === "'") {
        quote = c;
        buf += c;
      } else if (c === "(" || c === ")") {
        paren += c === "(" ? 1 : -1;
        buf += c;
      } else if (paren > 0) {
        buf += c;
      } else if (c === "{") {
        const key = buf.trim().replace(/\s+/g, " ");
        buf = "";
        obj[key] = { ...(obj[key] ?? {}), ...block() };
      } else if (c === "}") {
        flush();
        return obj;
      } else if (c === ";") {
        flush();
      } else {
        buf += c;
      }
    }
    flush();
    return obj;
  };
  return block();
}

for (const item of registry.items) {
  const out = { $schema: "https://ui.shadcn.com/schema/registry-item.json", ...item };
  if (item.registryDependencies) out.registryDependencies = resolveDeps(item.registryDependencies);

  if (item.type === "registry:theme") {
    // The theme ships as CSS merged into the user's stylesheet, not as a file to import by hand.
    out.css = cssToObject(readFileSync(item.files[0].path, "utf8"));
    delete out.files;
  } else if (item.files) {
    out.files = item.files.map((f) => ({
      ...f,
      path: f.path.replace("src/registry/ephemera/", "ui/"),
      content: readFileSync(f.path, "utf8"),
    }));
  }
  writeFileSync(`public/r/${item.name}.json`, JSON.stringify(out, null, 2));
}

// `npx shadcn add <site>/r/all.json` installs the theme, fonts and every core component
const core = registry.items.filter((i) => !i.categories?.includes("extras") && !i.categories?.includes("font"));
writeFileSync(
  "public/r/all.json",
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: "all",
      type: "registry:block",
      title: "Ephemera (everything)",
      description: "The paper theme, its fonts and every core component.",
      registryDependencies: core.map((i) => `${site}/r/${i.name}.json`),
    },
    null,
    2,
  ),
);

// The public index: same items, dependencies as URLs, and no file contents (required by the shadcn directory).
writeFileSync(
  "public/r/registry.json",
  JSON.stringify(
    {
      ...registry,
      items: registry.items.map((i) => ({
        ...i,
        ...(i.registryDependencies ? { registryDependencies: resolveDeps(i.registryDependencies) } : {}),
        ...(i.type === "registry:theme" ? { files: undefined } : {}),
      })),
    },
    null,
    2,
  ),
);

// llms.txt: a plain index so AI coding tools can discover and install components
const line = (i) => `- [${i.title}](${site}/components/${i.name}): ${i.description} Install: \`npx shadcn@latest add ${site}/r/${i.name}.json\``;
const group = (cat) => registry.items.filter((i) => i.categories?.includes(cat)).map(line).join("\n");
writeFileSync(
  "public/llms.txt",
  `# Ephemera: the paper UI design system for React

> A paper UI design system for React. shadcn/ui-compatible components (same APIs) styled as stationery: typewriter buttons, ruled inputs, folder tabs, ledger tables, label-maker badges, letter dialogs and receipt toasts. Built on Radix and Tailwind CSS v4. MIT licensed.

Setup:
1. \`npx shadcn@latest add ${site}/r/all.json\` installs the paper theme (merged into your global CSS), its five fonts and every core component. Or install single items, e.g. \`npx shadcn@latest add ${site}/r/button.json\`.
2. Put \`data-paper="cream"\` on <html> (or any element). Paper types: cream, kraft, ledger, blueprint, newsprint, carbon.
3. Short names via the shadcn registry directory (or a "@ephemera" entry in components.json registries): \`npx shadcn@latest add @ephemera/button\`.

Theme variables: --paper, --paper-raised, --paper-sunk, --ink, --ink-muted, --ink-faint, --pen, --pen-ink, --edge, --rule, --margin, --danger. Utility classes: .paper (grain), .paper-ruled (notebook lines). The theme also sets the standard shadcn variables (--background, --primary, --border…). Fonts: --font-display (Fraunces), --font-receipt (IBM Plex Mono), --font-type (Courier Prime), --font-hand (Caveat), --font-stamp (Anton).

Each component's JSON (${site}/r/<name>.json) contains its full source. Complete documentation in one file: ${site}/llms-full.txt

Also known as: Paper UI, paper design system, paper UI kit, paper UX components, skeuomorphic stationery UI.
Created by Sahil Gangurde (https://lostmartian.in, https://github.com/lostmartian). Published by KerrShift (https://kerrshift.com). Source: https://github.com/kerrshift/ephemera. License: MIT.

## Theme
${group("theme")}

## Fonts
${group("font")}

## Core components
${group("core")}

## Extras
${group("extras")}
`,
);

console.log(`registry: wrote ${registry.items.length} items + all.json + llms.txt (${site})`);
