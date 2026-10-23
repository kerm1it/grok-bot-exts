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

Platform-native files remain the source of truth. `extensions/grok-bot/bots/` retains full public recipes and templates with Profile, Skills, Memory, Routines, and plugin references. `extensions/grok-bot/plugins/` retains complete public plugin records with component descriptors and upstream source references; it does not mirror upstream implementation repositories. OpenMausBot extensions may store Skills with supporting files, references, scripts, and assets. The normalized catalog is rebuilt from these files.

All JSON Schemas live in `schemas/`. `catalog.schema.json` is the public build contract. Platform schemas validate future pull-request submissions and imported source snapshots.

## Resource layout and contribution lifecycle

```text
extensions/
  grok-bot/
    bots/<share-id>/
    plugins/<plugin-id>/
  openmausbot/
    bots/<id>/
    plugins/<id>/
schemas/
src/data/catalog.json
```

The hierarchy distinguishes platform first and extension kind second, never import method or submission status. Imported and community-authored resources use the same canonical `extensions/` root. A contribution is a pull request against an extension directory, not a second copy waiting in another directory. CI validates the proposed files; merging updates the one current resource and triggers the production pipeline.

Grok exports retain their existing native file structure. OpenMausBot uses `extension.json` plus real referenced files, including Skill attachments. Both adapters normalize their platform-specific inputs into the shared catalog; this unifies storage without forcing the two formats to be identical. Generated catalog and search indexes are derived artifacts, not independently maintained inputs. There are currently no OpenMausBot submissions, so its empty catalog state is intentional. A missing platform root is an error rather than silently producing an empty catalog.

## Build and delivery

Astro generates a fully static site. The build emits localized HTML detail routes and compact locale-specific search indexes. Native extension resources are committed to Git. Fetch scripts, logs, failed exports, and redundant temporary snapshots are excluded from Git. Raw resource files are not copied into the production artifact; the site links to their GitHub directory for inspection.

GitHub is the source of truth. Continuous integration validates schemas and catalog data, type-checks the site, runs unit and end-to-end tests, and builds the production artifact. After verification succeeds on a push to `main`, a separate GitHub Actions job deploys that same `dist/` artifact to Cloudflare Workers Static Assets. Pull requests have no deployment job. The deployment token has Individual Workers Editor access to `bot-extensions` only; Cloudflare Workers Builds is intentionally not connected.

## Trust and ordering

Official status is derived from controlled source metadata, never from contributor input. Browsing order is deterministic:

1. official entries;
2. verified entries;
3. recently updated community entries;
4. stable name and ID tie-breakers.

The UI always shows platform, kind, publisher, and provenance before any outbound action.

## Future path

The file-native model leaves room for signed artifacts, automated ingestion, web submissions, installation flows, and richer dependency analysis. Those features can be added without changing the public identity of an entry or introducing public multi-version management.

