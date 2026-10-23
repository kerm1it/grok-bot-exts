# Bot Extensions

An inspectable, bilingual marketplace for **Grok Bot** and **OpenMausBot** extensions.

Bot Extensions puts bots and plugins in one searchable catalog without hiding the differences between their ecosystems. Every record shows its platform, publisher, provenance, capabilities, dependencies, and current source before sending visitors elsewhere.

[Browse the marketplace](https://bot-extensions.kermitlx.workers.dev) · [中文说明](README.zh-CN.md) · [Architecture](docs/marketplace-architecture.md) · [Contributing](CONTRIBUTING.md)

## What is included

- 5,000+ normalized Grok Bot records and the current plugin catalog
- English and Simplified Chinese routes
- official-first ordering with deterministic trust signals
- search and filters for platform, type, category, publisher, and provenance
- file-native OpenMausBot schemas for bots, plugins, Skills, and attachments
- static Astro output for Cloudflare Workers Static Assets
- JSON Schema validation, type checks, unit tests, and browser tests in CI

The first release is intentionally browse-only. It does not provide accounts, ratings, installation, artifact distribution, uploads, presets, or public version history.

## Run locally

```bash
corepack enable
pnpm install
pnpm validate
pnpm dev
```

Build the production artifact with `pnpm build`. Run `pnpm test` for unit coverage and `pnpm test:e2e` after installing Playwright Chromium.

## Content workflow

The published catalog lives in `src/data/catalog.json` and is validated against schemas in `schemas/`. Full Grok Bot recipes and templates, plus complete public plugin records, are committed under [`extensions/grok-bot/`](extensions/grok-bot/). Plugin implementation repositories remain upstream and are linked from each record. Fetch scripts, failed exports, logs, and redundant catalog snapshots are excluded. OpenMausBot contributions live under `contributions/openmausbot/` and keep Skill references, scripts, assets, and other attachments as real files.

There is one current state per extension. Update it in place through a pull request; Git preserves the history.

## Deploy

The repository is ready for Cloudflare Workers Builds:

- build command: `pnpm build`
- deploy command: `pnpm deploy`
- output directory: `dist`
- production branch: `main`

`wrangler.jsonc` contains the static-assets configuration. GitHub Actions runs the complete validation and browser suite for every pull request and main-branch update.

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests should contain only the extension files, normalized catalog changes when applicable, and relevant tests or documentation—never raw export logs, temporary snapshots, credentials, or scraping output.

