/** Single source of truth for URLs and copy used in metadata, structured data and links. */
export const site = {
  name: "Ephemera",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ephemera.kerrshift.com").replace(/\/$/, ""),
  repo: "https://github.com/kerrshift/ephemera",
  title: "Ephemera — a paper design system for React",
  tagline: "A design system printed on paper.",
  description:
    "Ephemera is a free, open-source paper design system for React. shadcn/ui-compatible components styled as stationery: typewriter buttons, ruled inputs, folder tabs, ledger tables, label-maker badges, letter dialogs and receipt toasts, with six paper themes. Built on Radix and Tailwind CSS.",
  keywords: [
    "design system",
    "React components",
    "shadcn",
    "shadcn/ui",
    "shadcn registry",
    "Tailwind CSS",
    "Radix UI",
    "UI library",
    "component library",
    "paper UI",
    "skeuomorphic",
    "stationery",
    "open source",
    "Next.js",
  ],
  org: {
    name: "KerrShift",
    url: "https://kerrshift.com",
    description: "An applied intelligence lab building instruments for autonomous software.",
  },
} as const;
