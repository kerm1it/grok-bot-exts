import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = resolve(import.meta.dirname, "..");
const schemasDirectory = join(root, "schemas");
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

for (const name of readdirSync(schemasDirectory).filter((name) => name.endsWith(".json"))) {
  ajv.addSchema(JSON.parse(readFileSync(join(schemasDirectory, name), "utf8")));
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
}

console.log(`Validated ${catalog.entries.length} catalog entries against the root schemas.`);
