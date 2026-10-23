# Contributing

Bot Extensions uses pull requests as its only contribution channel in the first release.

## Before opening a pull request

1. Keep one current state for each extension. Update an existing directory instead of adding a versioned copy.
2. Put OpenMausBot bots in `contributions/openmausbot/bots/<id>/` and plugins in `contributions/openmausbot/plugins/<id>/`.
3. Name the manifest `extension.json` and follow the matching schema in `schemas/`.
4. Keep every `entrypoints` path relative to the extension directory. Commit the referenced Skill, script, reference, and asset files.
5. A bot dependency must identify a plugin and mark whether it is optional.
6. Do not self-declare a community entry as official. Official status is assigned from controlled source provenance.

## Required checks

```bash
pnpm install
pnpm run prepare:catalog
pnpm validate
pnpm check
pnpm lint
pnpm test
pnpm build
```

The catalog preparation script rebuilds Grok entries from the committed resources in `extensions/grok-bot/` and OpenMausBot entries from their file-native contribution directories. Every production build validates native records, manifests, referenced files, and plugin dependencies before generating the site.

## Keep pull requests clean

Do not commit credentials, raw scraper output, export logs, process IDs, temporary downloads, local review screenshots, `node_modules`, or build output. Explain the extension's purpose, source, permissions, and dependencies in the pull request description.

