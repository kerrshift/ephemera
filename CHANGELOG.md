# Changelog

All notable changes to Ephemera are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org).

## [Unreleased]

### Fixed

- Dialog, Sheet, Popover, Tooltip, Dropdown Menu, Select and Date Picker now render in a layer on `<body>` that copies
  the nearest `data-paper` theme, so sticky headers and other stacked content can no longer cover them.
- Docs: the sidebar fits under the sticky header and scrolls to the last item; phones get a "Browse components" menu.

### Changed

- New landing page: paper fan that drives the live demo, one-line `@ephemera/all` install, feature overview and a
  featured Paper Theme card.
- Demo images are local illustrations instead of a third-party image host.
- Upgraded Next.js to 16.4.5 (security release).

## [0.1.0] - 2026-10-12

First public release.

### Added

- Paper Theme with six paper types (Cream, Kraft, Ledger, Blueprint, Newsprint, Carbon), `.paper` and `.paper-ruled`
  utilities, and a bridge to the standard shadcn/ui variables.
- 28 core components: Button, Input, Checkbox, Radio Group, Switch, Select, Slider, Date Picker, Card, Tabs,
  Accordion, Separator, Table, Dialog, Sheet, Popover, Tooltip, Dropdown Menu, Toast, Badge, Avatar, Alert, Progress,
  Skeleton, Kbd, Calendar, Breadcrumb and Pagination.
- 9 extras: Receipt, Ticket, Boarding Pass, Polaroid, Postage Stamp, Rubber Stamp, Envelope, Wax Seal and Sticky Note.
- shadcn registry with an `all.json` bundle, and `llms.txt` for AI coding tools.
- Documentation site with live demos, props tables and source for every component.

[Unreleased]: https://github.com/kerrshift/ephemera/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/kerrshift/ephemera/releases/tag/v0.1.0
