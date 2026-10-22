# OpenMausBot contributions

OpenMausBot bots and plugins are file-native contributions:
- `bots/<id>/extension.json` follows `schemas/openmausbot-bot.schema.json`.
- `plugins/<id>/extension.json` follows `schemas/openmausbot-plugin.schema.json`.
- All paths in `entrypoints` are relative to the extension directory and must resolve to committed files.
- Bots declare plugin dependencies in `plugins`; dependency IDs must match contributed or recognized OpenMausBot plugins.

The repository publishes one current state for each extension. Update an existing directory in place and use Git history for audit and rollback.
