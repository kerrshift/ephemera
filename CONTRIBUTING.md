# Contributing to Ephemera

Thanks for helping. Ephemera is small and opinionated, so a little context up front saves everyone time.

## Ways to help

- **Report a bug** with the [bug report form](https://github.com/kerrshift/ephemera/issues/new?template=bug_report.yml).
- **Suggest a component** with the [component request form](https://github.com/kerrshift/ephemera/issues/new?template=component_request.yml).
  Tell us which real-world paper object it should feel like.
- **Improve the docs**: typos, clearer examples, better props descriptions.
- **Send a pull request.** For anything bigger than a small fix, open an issue first so we can agree on the approach.

## Setup

You need Node.js 20.9 or newer (`.nvmrc` pins 22) and npm.

```bash
git clone https://github.com/kerrshift/ephemera.git
cd ephemera
npm install
npm run dev
```

Before you push, make sure these pass. CI runs the same checks:

```bash
npm run typecheck
npm run build
```

## Design principles

1. **Every component is a real paper object.** Before writing code, name the thing it imitates: a ledger, a folder tab,
   a receipt slip. If it has no paper equivalent, it probably doesn't belong.
2. **Same API as shadcn/ui.** Core components keep shadcn's component names and props so people can swap them in one
   at a time.
3. **Themeable by default.** Core components use only the theme variables (`--paper`, `--paper-raised`, `--paper-sunk`,
   `--ink`, `--ink-muted`, `--ink-faint`, `--pen`, `--pen-ink`, `--edge`, `--rule`, `--margin`, `--danger`) and must
   look right on all six paper types.
4. **Accessible.** Use Radix primitives for anything interactive. Keyboard focus must be visible and motion should
   respect `prefers-reduced-motion` (add `data-paper-motion` to animated elements).
5. **Copy-paste friendly.** One file per component where possible, no dependencies beyond React, Tailwind and
   `radix-ui`. Extras must be fully self-contained.

## Adding a component

1. Create `src/registry/ephemera/<name>.tsx`.
   - Add `"use client"` if it uses state, effects or Radix.
   - Don't use `asChild` inside the component file itself: the shadcn CLI rewrites it to `render` in Base UI projects.
   - Don't call `new Date()` or read the browser while rendering. Do it in an effect so prerendering works.
   - Popups should open inside the nearest `[data-paper]` container (copy the `usePaperContainer` helper from
     `select.tsx`).
2. Add it to `registry.json` with `categories: ["core"]` or `["extras"]`, plus `dependencies: ["radix-ui"]` if needed.
3. Document it:
   - usage and props in `src/lib/docs-more.ts`
   - a live demo in `src/components/more-demos.tsx` (core) or `src/components/demos.tsx` (extras)
   - a grid preview in `MorePreview` (core) or `CardPreview` (extras)
   - for core, its section in `sections` in `src/lib/docs.ts`
4. Run `npm run dev`, open `/components/<name>` and check every paper type, light and dark site themes, keyboard use
   and a narrow phone-width window.
5. Optional but appreciated: install it into a fresh shadcn project with
   `npx shadcn@latest add http://localhost:3000/r/<name>.json` and make sure it builds.

## Pull requests

- Keep each pull request focused on one change.
- Use [Conventional Commits](https://www.conventionalcommits.org) for titles, for example
  `feat(select): add searchable variant` or `fix(slider): align thumb with value`. Pull requests are squash-merged,
  so the title becomes the commit message.
- Include before/after screenshots for visual changes.
- Add a line to the "Unreleased" section of [CHANGELOG.md](CHANGELOG.md) for anything users will notice.

## Code of Conduct

By taking part you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
