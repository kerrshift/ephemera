# Security Policy

## Supported versions

Ephemera is distributed as source through its shadcn registry, so fixes ship to the latest version on
[ephemera.kerrshift.com](https://ephemera.kerrshift.com). Re-run `npx shadcn@latest add` to pick them up.

## Reporting a vulnerability

Please **don't open a public issue** for security problems.

Report privately through GitHub instead:
[Security → Report a vulnerability](https://github.com/kerrshift/ephemera/security/advisories/new).

Include what you found, how to reproduce it and the impact you expect. We'll acknowledge your report within
3 business days, keep you updated while we work on a fix, and credit you in the advisory unless you'd rather stay
anonymous.

## Scope

Things we especially want to hear about:

- Components that could enable XSS or injection when given untrusted props
- Problems in the registry files (`/r/*.json`) or the build script that generates them
- Anything in this repository's CI or release setup that could let someone tamper with what users install
