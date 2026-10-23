import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schemaRoot = resolve(import.meta.dirname, "../schemas");
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
for (const file of readdirSync(schemaRoot).filter((name) => name.endsWith(".json"))) {
  ajv.addSchema(JSON.parse(readFileSync(join(schemaRoot, file), "utf8")));
}

export function readContributions(root) {
  if (!existsSync(root)) throw new Error(`Missing extension root: ${root}`);
  const records = [];
  for (const kind of ["bot", "plugin"]) {
    const directory = join(root, `${kind}s`);
    if (!existsSync(directory)) continue;
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) throw new Error(`Symlinked extension: ${entry.name}`);
      if (!entry.isDirectory()) continue;
      const base = join(directory, entry.name);
      const manifestPath = join(base, "extension.json");
      if (!existsSync(manifestPath)) throw new Error(`Missing manifest: ${manifestPath}`);
      const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
      const validate = ajv.getSchema(
        `https://bot-extensions.dev/schemas/openmausbot-${kind}.schema.json`,
      );
      if (!validate(manifest)) {
        throw new Error(`Invalid ${manifestPath}: ${ajv.errorsText(validate.errors)}`);
      }
      if (manifest.id !== entry.name) throw new Error(`Directory must match ID: ${manifest.id}`);
      const references = Object.entries(manifest.entrypoints).flatMap(([type, value]) =>
        (Array.isArray(value) ? value : [value]).map((file) => ({ type, file })),
      );
      for (const { file } of references) {
        if (file.path.includes("\\") || /^[a-z]:/i.test(file.path)) {
          throw new Error(`Invalid attachment path: ${file.path}`);
        }
        const target = realpathSync(join(base, file.path));
        const local = relative(realpathSync(base), target);
        if (isAbsolute(local) || local === ".." || local.startsWith(`..${sep}`)) {
          throw new Error(`Attachment escapes extension: ${file.path}`);
        }
        if (!statSync(target).isFile()) throw new Error(`Attachment is not a file: ${file.path}`);
        const content = readFileSync(target);
        if (file.size !== undefined && file.size !== content.length) {
          throw new Error(`Attachment size mismatch: ${file.path}`);
        }
        if (file.sha256 && file.sha256 !== createHash("sha256").update(content).digest("hex")) {
          throw new Error(`Attachment hash mismatch: ${file.path}`);
        }
      }
      records.push({ kind, base, manifest, references });
    }
  }
  const plugins = new Set(
    records.filter((record) => record.kind === "plugin").map((record) => record.manifest.id),
  );
  for (const { manifest } of records) {
    for (const plugin of manifest.plugins || []) {
      if (!plugins.has(plugin.id)) throw new Error(`Unknown plugin ${plugin.id} in ${manifest.id}`);
    }
  }
  return records;
}
