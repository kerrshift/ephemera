// Builds the shadcn registry (public/r/*.json), an "all" bundle, and public/llms.txt from registry.json.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const registry = JSON.parse(readFileSync("registry.json", "utf8"));
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? registry.homepage).replace(/\/$/, "");
mkdirSync("public/r", { recursive: true });

for (const item of registry.items) {
  const out = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files: item.files.map((f) => ({
      ...f,
      path: f.path.replace("src/registry/ephemera/", "ui/"),
      content: readFileSync(f.path, "utf8"),
    })),
  };
  writeFileSync(`public/r/${item.name}.json`, JSON.stringify(out, null, 2));
}

// `npx shadcn add <site>/r/all.json` installs the theme and every core component
const core = registry.items.filter((i) => !i.categories?.includes("extras"));
writeFileSync(
  "public/r/all.json",
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: "all",
      type: "registry:block",
      title: "Ephemera (everything)",
      description: "The paper theme and every core component.",
      registryDependencies: core.map((i) => `${site}/r/${i.name}.json`),
    },
    null,
    2,
  ),
);
writeFileSync("public/r/registry.json", JSON.stringify(registry, null, 2));

// llms.txt: a plain index so AI coding tools can discover and install components
const line = (i) => `- [${i.title}](${site}/components/${i.name}): ${i.description} Install: \`npx shadcn@latest add ${site}/r/${i.name}.json\``;
const group = (cat) => registry.items.filter((i) => i.categories?.includes(cat)).map(line).join("\n");
writeFileSync(
  "public/llms.txt",
  `# Ephemera: the paper UI design system for React

> A paper UI design system for React. shadcn/ui-compatible components (same APIs) styled as stationery: typewriter buttons, ruled inputs, folder tabs, ledger tables, label-maker badges, letter dialogs and receipt toasts. Built on Radix and Tailwind CSS v4. MIT licensed.

Setup:
1. \`npx shadcn@latest add ${site}/r/paper-theme.json\`, then \`@import\` the installed styles/paper.css in your global CSS.
2. Put \`data-paper="cream"\` on <html> (or any element). Paper types: cream, kraft, ledger, blueprint, newsprint, carbon.
3. Add components, or everything at once: \`npx shadcn@latest add ${site}/r/all.json\`.

Theme variables: --paper, --paper-raised, --paper-sunk, --ink, --ink-muted, --ink-faint, --pen, --pen-ink, --edge, --rule, --margin, --danger. Utility classes: .paper (grain), .paper-ruled (notebook lines). The theme also sets the standard shadcn variables (--background, --primary, --border…).

Each component's JSON (${site}/r/<name>.json) contains its full source. Complete documentation in one file: ${site}/llms-full.txt

Also known as: Paper UI, paper design system, paper UI kit, paper UX components, skeuomorphic stationery UI.
Created by Sahil Gangurde (https://lostmartian.in, https://github.com/lostmartian). Published by KerrShift (https://kerrshift.com). Source: https://github.com/kerrshift/ephemera. License: MIT.

## Theme
${group("theme")}

## Core components
${group("core")}

## Extras
${group("extras")}
`,
);

console.log(`registry: wrote ${registry.items.length} items + all.json + llms.txt (${site})`);
