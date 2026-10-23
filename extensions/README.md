# Extension resources

All accepted extension resources live here, regardless of how they were obtained. Pull requests are the contribution workflow, not a separate storage area.

```text
extensions/
  grok-bot/
    bots/<share-id>/
    plugins/<plugin-id>/
  openmausbot/
    bots/<id>/
    plugins/<id>/
schemas/
```

Each platform retains its native format. Grok Bot directories preserve public recipes, templates, listings, manifests, and plugin records. OpenMausBot directories use `extension.json` manifests with real Skill, reference, script, and asset files. All validation schemas remain in the repository-root `schemas/` directory.

Only one current copy of an extension is published. Edit its directory in place through a pull request. Builds normalize both platforms into `src/data/catalog.json` and the localized search indexes; generated files are not a separate source of truth.

See each platform's README and the root `CONTRIBUTING.md` for validation and submission requirements. Fetch workspaces, credentials, logs, and failed exports do not belong here.
