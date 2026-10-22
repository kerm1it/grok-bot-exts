# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Astro, TypeScript, static generation, and Cloudflare Workers Static Assets. GitHub is the source of truth and pull requests are the contribution workflow.

## Users

The primary users are people looking for reusable Grok Bot or OpenMausBot capabilities. They need to search, filter, compare provenance, inspect what an extension contains, and understand dependencies before following the source.

Extension authors and repository maintainers are the secondary users. They need a predictable file format, validation errors that are actionable, and a reviewable pull request workflow.

## Product Purpose

The product is a bilingual catalog for browsing Grok Bot and OpenMausBot bots and plugins. Success means a visitor can identify a relevant extension, understand who published it and what it contains, and reach its source without guessing about platform, trust, or dependencies.

## Positioning

The catalog unifies two bot ecosystems while preserving their differences. It shows official and community entries together, derives trust from controlled sources rather than self-declaration, and exposes capability counts and dependency relationships instead of presenting extensions as opaque cards.

## Operating Context

Catalog content is maintained in GitHub. Existing Grok Bot exports are normalized at build time; new OpenMausBot entries use file-native directories that can include Skill attachments. Contributors submit changes through pull requests. Cloudflare builds and serves the static site from the main branch.

## Capabilities and Constraints

- The catalog contains Grok Bot bots, Grok Bot plugins, OpenMausBot bots, and OpenMausBot plugins.
- The interface supports English and Simplified Chinese. Stable routes and IDs do not change with locale.
- Official entries rank before featured and community entries.
- Each extension has one current state. Git history provides audit and rollback; there is no public multi-version model.
- OpenMausBot bots may depend on OpenMausBot plugins and may contain file-based Skills, references, scripts, assets, Memory, Routines, and optional Playbooks.
- Presets are not a marketplace type.
- The first release is browse-only. It has no account system, ratings, comments, web upload, installation, artifact distribution, database, or runtime API.
- Submitted data and generated catalog output are validated against schemas stored in the root `schemas/` directory.
- The production artifact must remain within Cloudflare static asset limits and must not publish the raw export tree.
- Repository documentation, plans, schemas, source code, and comments are written in English. The project provides separate English and Chinese README files.

## Brand Commitments

The permanent product name and domain are open decisions. Until they are chosen, use the neutral working label “Bot Extensions.” The voice is direct, technically credible, welcoming to community authors, and free of hype. Grok Bot and OpenMausBot remain visible as peer platforms rather than being visually collapsed into one product.

## Evidence on Hand

- The local snapshot contains more than five thousand complete Grok Bot exports with profiles, Skills, Memory, Routines, and plugin references.
- `plugins/plugin-catalog-complete.json` contains the current Grok plugin catalog and component metadata.
- The architecture and accepted scope are recorded in `docs/marketplace-architecture.md`.
- There are no verified download counts, ratings, customer logos, testimonials, or usage claims. The interface must not fabricate them.

## Product Principles

1. Make provenance visible before promotion.
2. Let real catalog structure drive the interface.
3. Keep contribution rules deterministic and reviewable.
4. Preserve platform differences behind a consistent browsing model.
5. Build the smallest static system that leaves a clean path to future installation.

## Accessibility & Inclusion

The site targets WCAG 2.2 AA. All primary workflows must support keyboard navigation, visible focus, reduced motion, sufficient contrast, semantic headings, and screen-reader-friendly search and filter status. Chinese and English content must remain readable under long names, missing translations, and mixed-language metadata.
