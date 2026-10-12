/** Single source of truth for URLs and copy used in metadata, structured data and links. */
export const site = {
  name: "Ephemera",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ephemera.kerrshift.com").replace(/\/$/, ""),
  repo: "https://github.com/kerrshift/ephemera",
  title: "Ephemera — Paper UI Design System for React & shadcn/ui",
  tagline: "A design system printed on paper.",
  description:
    "Ephemera is a free, open-source paper UI design system for React. Paper-style, skeuomorphic components that look like real stationery — typewriter buttons, ruled inputs, folder tabs, ledger tables, label-maker badges, letter dialogs and receipt toasts — with six paper themes. shadcn/ui compatible, built on Radix and Tailwind CSS.",
  /** Other names people search for; used as schema.org alternateName. */
  alternateNames: [
    "Ephemera UI",
    "Ephemera design system",
    "Paper UI",
    "Paper design system",
    "Paper UI kit",
    "Paper UX components",
  ],
  keywords: [
    "paper UI",
    "paper UX",
    "paper design system",
    "paper UI kit",
    "paper UI components",
    "paper style UI",
    "paper texture UI",
    "skeuomorphic UI",
    "skeuomorphic design system",
    "stationery UI",
    "notebook UI",
    "retro paper UI",
    "tactile UI",
    "design system",
    "React design system",
    "React component library",
    "React UI components",
    "shadcn",
    "shadcn/ui",
    "shadcn registry",
    "shadcn theme",
    "Tailwind CSS components",
    "Radix UI",
    "UI library",
    "open source design system",
    "Next.js components",
  ],
  org: {
    name: "KerrShift",
    url: "https://kerrshift.com",
    description: "An applied intelligence lab building instruments for autonomous software.",
  },
  /** The creator. Exposed to search engines and AI tools (metadata, JSON-LD, llms.txt), never rendered on the page. */
  creator: {
    name: "Sahil Gangurde",
    url: "https://lostmartian.in",
    github: "https://github.com/lostmartian",
  },
} as const;

/** schema.org Person for the creator, referenced by @id from every page's structured data. */
export const creatorPerson = {
  "@type": "Person",
  "@id": `${site.creator.url}/#person`,
  name: site.creator.name,
  url: site.creator.url,
  sameAs: [site.creator.url, site.creator.github],
} as const;

export const orgEntity = {
  "@type": "Organization",
  "@id": `${site.org.url}/#organization`,
  name: site.org.name,
  url: site.org.url,
  description: site.org.description,
} as const;
