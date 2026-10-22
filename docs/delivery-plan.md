# First release delivery plan

## Objective

Ship a bilingual, static marketplace for Grok Bot and OpenMausBot bots and plugins, with official-first browsing, file-native contributions, centralized schemas, GitHub CI, and automatic Cloudflare deployment.

## Completed

- Normalize 5,325 Grok bots and 461 plugins into the current catalog.
- Implement English and Chinese home, directory, search, filters, and detail routes.
- Preserve platform, type, publisher, provenance, capabilities, and dependency information.
- Centralize JSON Schemas in `schemas/`.
- Validate OpenMausBot manifests, attachment paths, optional integrity metadata, and plugin dependencies.
- Regenerate contribution data during every production build.
- Document pull-request contributions and provide English and Chinese READMEs.
- Exclude raw exports, fetch tooling, credentials, build output, and review artifacts from Git.
- Push the implementation to `kerm1it/grok-bot-exts` and run GitHub CI.

## Remaining release gates

1. Complete the pending Cloudflare authorization or use an existing authorized Git integration.
2. Connect the repository and configure automatic production deployment from `main`.
3. Verify the first Cloudflare build and record its production URL.
4. Set canonical URLs, sitemap origin, and robots sitemap URL to the actual production origin.
5. Check deployed English and Chinese routes, search, filters, details, assets, and missing-page behavior.
6. Verify a subsequent Git push triggers deployment and the latest CI passes.

## Verification evidence

- Initial GitHub CI: https://github.com/kerm1it/grok-bot-exts/actions/runs/39821509762 (passed).
- Catalog validation: 5,786 entries; no OpenMausBot contributions submitted yet.
- Unit suite: 8 tests passed, including contribution validation regressions.
- Astro check: zero errors, warnings, or hints.
- Biome: passed.
- Production build: 11,577 pages.
- Local browser suite: English/Chinese navigation, search, filters, details, empty states, mobile overflow, and accessibility checks.

Cloudflare publication and online verification remain incomplete until supported by a successful deployment and live checks. Local tests do not establish production availability.
