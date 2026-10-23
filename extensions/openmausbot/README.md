# OpenMausBot extension resources

This directory is the canonical source for OpenMausBot extensions, not a staging or review queue. Submit changes through pull requests directly to these directories:
- `bots/<id>/extension.json` follows `schemas/openmausbot-bot.schema.json`.
- `plugins/<id>/extension.json` follows `schemas/openmausbot-plugin.schema.json`.
- All paths in `entrypoints` are relative to the extension directory and must resolve to committed files.
- Bots declare plugin dependencies in `plugins`; dependency IDs must match contributed OpenMausBot plugins, including optional dependencies.
- List supporting Skill files in `entrypoints.assets`. Attachment paths must remain inside the extension directory, resolve to files, and match any declared size or SHA-256 hash.
- Community manifests may omit `official` or set it to `false`.

The repository publishes one current state for each extension. Update an existing directory in place and use Git history for audit and rollback.

There are no submitted OpenMausBot extensions yet. The `bots/` and `plugins/` directories remain empty until real extensions are contributed; do not add placeholder marketplace entries.
