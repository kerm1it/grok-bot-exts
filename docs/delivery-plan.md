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
- Automatically deploy the verified static artifact after successful main-branch CI, using a token limited to the existing `bot-extensions` Worker.
- Unify both platforms under `extensions/<platform>/bots|plugins/`, remove the separate contribution storage area, and update the architecture and product design documents.

## Release controls

- Pull requests run verification only; production deployment runs only after successful verification of a push to `main`.
- The production environment accepts only the `main` branch.
- Production smoke checks verify both locales, the sitemap, and missing-page behavior.
- Rotate the single-Worker token before January 21, 2027; see `docs/deployment.md`.

## Verification evidence

- Initial GitHub CI: https://github.com/kerm1it/grok-bot-exts/actions/runs/39821509762 (passed).
- Catalog validation: 5,786 entries; no OpenMausBot contributions submitted yet.
- Unit suite: 12 tests passed, including contribution validation, missing-root detection, native-resource coverage, explicit deployment-script invocation, and production-origin configuration regressions.
- Astro check: zero errors, warnings, or hints.
- Biome: passed.
- Production build: 11,577 pages.
- Local browser suite: English/Chinese navigation, search, filters, details, empty states, mobile overflow, and accessibility checks.
- Cloudflare OAuth login and initial deployment succeeded.
- Production URL: https://bot-extensions.kermitlx.workers.dev.
- Deployed browser suite: 9 passed, 1 desktop-only skip for a mobile-only assertion.
- Production origin configured in Astro canonical URLs, sitemap, and robots metadata.
- Production HTTP verification: English and Chinese home pages, sitemap, and robots return 200 with the production origin; an unknown route returns 404.
- Native resource publication: commit `7bf0fff6`; the complete GitHub tree confirms 21,300 bot files and 461 plugin records.
- Resource-backed production deployment: `1044b3e5-e290-4b5d-b772-7348a48ff2ad`; deployed browser suite passed again.
- First complete automatic release: https://github.com/kerm1it/grok-bot-exts/actions/runs/39950705249 (verification, deployment, and production smoke checks passed).
- Automatically deployed Cloudflare version: `ccba22a8-2bf9-4018-8368-c2f56d6521d0`.
- Unified-layout release: https://github.com/kerm1it/grok-bot-exts/actions/runs/39951482127 (verification and automatic deployment passed); the remote tree contains no legacy contribution directory.

Automatic deployment uses GitHub Actions, not Cloudflare Workers Builds. The account-owned token is limited to Individual Workers Editor for `bot-extensions` and expires on January 21, 2027. Every subsequent main-branch change, including resource-layout updates, passes through the same verified-artifact deployment pipeline.
