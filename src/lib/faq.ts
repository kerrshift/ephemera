/** Rendered on the home page and emitted as schema.org FAQPage, so search engines and AI tools can quote it. */
export const faq = [
  {
    q: "What is Ephemera?",
    a: "Ephemera is a free, open-source paper UI design system for React. Its components look like real stationery — typewriter-key buttons, inputs on ruled lines, folder tabs, ledger tables, label-maker badges, dialogs that arrive like letters and toasts that print like receipts — and it ships six paper themes.",
  },
  {
    q: "What is a paper UI design system?",
    a: "A paper UI (or paper UX) design system styles an interface after physical paper and stationery: paper textures and grain, ruled lines, stamps, perforations, ink colors and typewriter type. It's a tactile, skeuomorphic alternative to flat, generic UI. Ephemera turns that look into reusable, accessible React components.",
  },
  {
    q: "Does Ephemera work with shadcn/ui?",
    a: "Yes. Ephemera is a shadcn registry and its core components use the same names and APIs as shadcn/ui, so you can install them with the shadcn CLI and swap them in one at a time. The paper theme also sets the standard shadcn CSS variables, so components you already have pick up the paper colors.",
  },
  {
    q: "How do I install it?",
    a: "Run `npx shadcn@latest add https://ephemera.kerrshift.com/r/all.json` to add the theme and every core component, or add components one at a time, such as `/r/button.json`. Then import the theme CSS and set data-paper=\"cream\" (or kraft, ledger, blueprint, newsprint, carbon) on your html element.",
  },
  {
    q: "Is Ephemera free and open source?",
    a: "Yes. Ephemera is MIT licensed and free for personal and commercial use. The source is on GitHub at github.com/kerrshift/ephemera.",
  },
  {
    q: "Is it accessible?",
    a: "Interactive components are built on Radix primitives, so keyboard navigation, focus management and screen reader support are built in. Animations respect prefers-reduced-motion.",
  },
  {
    q: "Which paper themes are included?",
    a: "Six: Cream, Kraft, Ledger, Blueprint, Newsprint and Carbon (a dark theme). Switch with one attribute, data-paper, on any element, and nest themes freely.",
  },
  {
    q: "Can AI coding tools use Ephemera?",
    a: "Yes. /llms.txt lists every component with its install command, /llms-full.txt contains the full documentation, and each registry file under /r/ contains the complete component source, so coding agents can discover and install components on their own.",
  },
];
