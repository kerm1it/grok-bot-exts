# First release delivery plan

## Objective

Ship a bilingual, static marketplace for Grok Bot and OpenMausBot bots and plugins, with official-first browsing, file-native contributions, centralized schemas, GitHub CI, and automatic Cloudflare deployment.

## Completed

- Normalize 5,325 Grok bots and 461 plugins into the current catalog.
- Preserve 5,325 complete Grok bot exports and 461 original plugin records in `extensions/grok-bot/`; regenerate the catalog from those committed resources.
- Validate native resource schemas, directory identities, bot file checksums, and catalog coverage during CI.
- Implement English and Chinese home, directory, search, filters, and detail routes.
- Preserve platform, type, publisher, provenance, capabilities, and dependency information.
- Centralize JSON Schemas in `schemas/`.
- Validate OpenMausBot manifests, attachment paths, optional integrity metadata, and plugin dependencies.
- Regenerate contribution data during every production build.
- Document pull-request contributions and provide English and Chinese READMEs.
- Exclude import workspaces, failed exports, fetch tooling, credentials, build output, and review artifacts from Git; keep the current public extension resources.
- Push the implementation to `kerm1it/grok-bot-exts` and run GitHub CI.

## Remaining release gates

1. Connect the repository and configure automatic production deployment from `main`.
2. Verify a subsequent Git push triggers deployment and the latest CI passes.
3. Finish verification of the production canonical URLs, sitemap, and missing-page behavior after the origin update deploys.

## Verification evidence

- Initial GitHub CI: https://github.com/kerm1it/grok-bot-exts/actions/runs/39821509762 (passed).
- Catalog validation: 5,786 entries; no OpenMausBot contributions submitted yet.
- Unit suite: 8 tests passed, including contribution validation regressions.
- Astro check: zero errors, warnings, or hints.
- Biome: passed.
- Production build: 11,577 pages.
- Local browser suite: English/Chinese navigation, search, filters, details, empty states, mobile overflow, and accessibility checks.
- Cloudflare OAuth login and initial deployment succeeded.
- Production URL: https://bot-extensions.kermitlx.workers.dev.
- Deployed browser suite: 9 passed, 1 desktop-only skip for a mobile-only assertion.
- Production origin configured in Astro canonical URLs, sitemap, and robots metadata.

Automatic GitHub deployment remains a release gate. The initial production deployment was performed with Wrangler from the local checkout.
