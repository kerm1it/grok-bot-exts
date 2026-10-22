# Marketplace architecture

## Scope

Bot Extensions is a bilingual, browse-only catalog for Grok Bot and OpenMausBot bots and plugins. It publishes one current version of each entry. Git history provides the audit trail; the public model does not expose version history.

The first release deliberately excludes accounts, ratings, comments, browser uploads, installation, artifact distribution, and presets. Contributions arrive as pull requests and are validated before merge.

## Content model

Every published entry is normalized to a shared catalog shape:

- stable ID and slug;
- platform (`grok-bot` or `openmausbot`);
- kind (`bot` or `plugin`);
- localized name, summary, and description;
- publisher, official status, category, and tags;
- source and repository links;
- capabilities, dependencies, and attachment metadata;
- one current update timestamp.

Platform-native files remain the source of truth. Grok Bot recipes may carry Profile, Skills, Memory, Routines, and plugin references. OpenMausBot extensions may store Skills with supporting files, references, scripts, and assets. The normalized catalog exposes these differences without flattening away their meaning.

All JSON Schemas live in `schemas/`. `catalog.schema.json` is the public build contract. Platform schemas validate future pull-request submissions and imported source snapshots.

## Build and delivery

Astro generates a fully static site. The build emits localized HTML detail routes and compact locale-specific search indexes. Source exports, fetch scripts, logs, and temporary snapshots are excluded from Git and from the production artifact.

GitHub is the source of truth. Continuous integration validates schemas and catalog data, type-checks the site, runs unit and end-to-end tests, and builds the production artifact. Cloudflare Workers Static Assets deploys the `dist/` directory from the main branch.

## Trust and ordering

Official status is derived from controlled source metadata, never from contributor input. Browsing order is deterministic:

1. official entries;
2. verified entries;
3. recently updated community entries;
4. stable name and ID tie-breakers.

The UI always shows platform, kind, publisher, and provenance before any outbound action.

## Future path

The file-native model leaves room for signed artifacts, automated ingestion, web submissions, installation flows, and richer dependency analysis. Those features can be added without changing the public identity of an entry or introducing public multi-version management.

