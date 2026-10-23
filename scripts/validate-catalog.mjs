import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readContributions } from "./contributions.mjs";

const root = resolve(import.meta.dirname, "..");
const contributions = readContributions(join(root, "extensions/openmausbot"));
const schemasDirectory = join(root, "schemas");
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

for (const name of readdirSync(schemasDirectory).filter((name) => name.endsWith(".json"))) {
  ajv.addSchema(JSON.parse(readFileSync(join(schemasDirectory, name), "utf8")));
}

const nativeIds = new Set();
for (const kind of ["bot", "plugin"]) {
  const directory = join(root, "extensions/grok-bot", `${kind}s`);
  const check = ajv.getSchema(`https://bot-extensions.dev/schemas/grok-${kind}.schema.json`);
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const base = join(directory, entry.name);
    const native =
      kind === "bot"
        ? Object.fromEntries(
            ["manifest", "listing", "recipe", "template"].map((name) => [
              name,
              JSON.parse(readFileSync(join(base, `${name}.json`), "utf8")),
            ]),
          )
        : JSON.parse(readFileSync(join(base, "plugin.json"), "utf8"));
    if (!check(native))
      throw new Error(`Invalid native ${kind} ${entry.name}: ${ajv.errorsText(check.errors)}`);
    const id = kind === "bot" ? native.manifest.shareId : native.id;
    if (id !== entry.name) throw new Error(`Native ID/directory mismatch: ${entry.name}`);
    nativeIds.add(`${kind === "bot" ? "grok-bot" : "grok-plugin"}:${id}`);
    if (kind === "bot") {
      for (const name of ["listing.json", "recipe.json", "template.json"]) {
        const expected = native.manifest.files?.[name];
        const content = readFileSync(join(base, name));
        if (
          expected?.sha256 &&
          createHash("sha256").update(content).digest("hex") !== expected.sha256
        ) {
          throw new Error(`Native checksum mismatch: ${entry.name}/${name}`);
        }
      }
    }
  }
}

const catalog = JSON.parse(readFileSync(join(root, "src/data/catalog.json"), "utf8"));
const validate = ajv.getSchema("https://bot-extensions.dev/schemas/catalog.schema.json");
if (!validate(catalog)) {
  console.error(validate.errors);
  process.exit(1);
}

const ids = new Set();
for (const entry of catalog.entries) {
  if (ids.has(entry.id)) throw new Error(`Duplicate catalog ID: ${entry.id}`);
  ids.add(entry.id);
  if (entry.platform === "grok-bot" && !nativeIds.delete(entry.id)) {
    throw new Error(`Missing native Grok resource: ${entry.id}`);
  }
}
if (nativeIds.size)
  throw new Error(`Unindexed native Grok resources: ${[...nativeIds].join(", ")}`);

console.log(`Validated ${catalog.entries.length} catalog entries against the root schemas.`);
console.log(`Validated ${contributions.length} file-native OpenMausBot contributions.`);
