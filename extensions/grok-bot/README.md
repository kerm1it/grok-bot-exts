# Grok Bot extension resources

This directory contains the current public resources used to build the catalog, not just the website search index.

- `bots/<share-id>/recipe.json`: full Profile, Skills, Memory, Routines, and plugin references as provided by the public bot template.
- `bots/<share-id>/template.json`: the original public template response, preserving fields outside the recipe.
- `bots/<share-id>/listing.json`: discovery metadata, attribution, and source links.
- `bots/<share-id>/manifest.json`: source identity, export time, and file checksums.
- `plugins/<plugin-id>/plugin.json`: the complete public plugin record, including component descriptors, publisher, repository, and source snapshot reference where available.
- `provenance.json`: plugin catalog origin, capture time, and known limitations.

Plugin records do not contain mirrored upstream repository source code. `sourceDownload` and component `sourceUrl` fields point to the original implementation. The upstream owners retain their licenses and attribution; inclusion in this catalog does not relicense their work.

Keep one current copy per extension. Update files in place, preserve upstream attribution, and run `pnpm prepare:catalog` and `pnpm validate`. All native records are checked against the matching schemas in the root `schemas/` directory. Bot file checksums are verified before publication.

Fetch scripts, failed-export records, logs, older catalog snapshots, and temporary files are intentionally excluded.
