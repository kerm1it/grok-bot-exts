import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { readContributions } from "./contributions.mjs";

const root = resolve(import.meta.dirname, "..");
const catalogPath = join(root, "src/data/catalog.json");
const searchDirectory = join(root, "public/data");
const grokRoot = join(root, "extensions/grok-bot");
const botSource = join(grokRoot, "bots");
const pluginSource = join(grokRoot, "plugins");
const openMausRoot = join(root, "extensions/openmausbot");
const contributions = readContributions(openMausRoot);

const accents = ["#d24b32", "#1f6f78", "#6555a3", "#33705a", "#a45a24", "#315b86"];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value)}\n`);
}

function text(value, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function slugify(value, fallback) {
  const slug = text(value, fallback)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || fallback;
}

function compact(items) {
  return items.filter(Boolean);
}

function unique(items) {
  return [...new Set(items.map((item) => text(item)).filter(Boolean))];
}

function isoDate(...values) {
  for (const value of values) {
    if (!value) continue;
    const date = new Date(value);
    if (!Number.isNaN(date.valueOf())) return date.toISOString();
  }
  return "2026-10-01T00:00:00.000Z";
}

function accentFor(id) {
  const byte = createHash("sha256").update(id).digest()[0];
  return accents[byte % accents.length];
}

function capability(type, item, index) {
  if (typeof item === "string") return { type, name: text(item, `${type} ${index + 1}`) };
  const name = text(item?.name, text(item?.slug, `${type} ${index + 1}`));
  const description = text(item?.description);
  return description ? { type, name, description } : { type, name };
}

function capabilityGroup(type, name, items) {
  const count = Array.isArray(items) ? items.length : 0;
  return count ? { type, name, count } : null;
}

function normalizeGrokBots() {
  if (!existsSync(botSource)) return [];
  const entries = [];
  for (const folder of readdirSync(botSource, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    const base = join(botSource, folder.name);
    const required = ["manifest.json", "listing.json", "recipe.json", "template.json"];
    if (!required.every((name) => existsSync(join(base, name)))) continue;

    const manifest = readJson(join(base, "manifest.json"));
    const listing = readJson(join(base, "listing.json"));
    const recipe = readJson(join(base, "recipe.json"));
    const id = text(manifest.shareId, text(listing.bot_id, folder.name));
    const name = text(listing.name, text(recipe.profile?.name, "Untitled bot"));
    const profileDescription = text(recipe.profile?.description, text(listing.summary));
    const summary = text(listing.summary, profileDescription.slice(0, 220));
    const official = !text(listing.sourceCatalog) || listing.category === "From Grok Bot Team";
    const author = text(listing.author?.name, official ? "Grok Bot Team" : "Community");
    const skills = Array.isArray(recipe.skills) ? recipe.skills : [];
    const memory = Array.isArray(recipe.memory) ? recipe.memory : [];
    const routines = Array.isArray(recipe.routines) ? recipe.routines : [];
    const plugins = Array.isArray(recipe.plugins) ? recipe.plugins : [];

    entries.push({
      id: `grok-bot:${id}`,
      slug: slugify(listing.slug, `bot-${slugify(id, "entry")}`),
      platform: "grok-bot",
      kind: "bot",
      name: { en: name, zh: name },
      summary: { en: summary, zh: text(listing.summary_zh, summary) },
      description: {
        en: profileDescription || summary,
        zh: text(listing.summary_zh, profileDescription || summary),
      },
      publisher: {
        name: author,
        ...(listing.author?.url ? { url: listing.author.url } : {}),
      },
      official,
      verified: Boolean(listing.verified || official),
      category: slugify(listing.category, "other"),
      tags: unique([...(listing.tags || []), official ? "official" : "community"]),
      updatedAt: isoDate(listing.updated, manifest.exportedAt),
      sourceUrl: text(listing.shareUrl, `https://x.ai/bot/${id}`),
      repositoryUrl: `https://github.com/kerm1it/grok-bot-exts/tree/main/extensions/grok-bot/bots/${encodeURIComponent(folder.name)}`,
      sourceLabel: official ? "Grok Bot official catalog" : "Awesome Grok Bot catalog",
      capabilities: compact([
        ...skills.map((item, index) => capability("skill", item, index)),
        capabilityGroup("memory", "Memory entries", memory),
        ...routines.map((item, index) => capability("routine", item, index)),
        capabilityGroup("plugin", "Plugin references", plugins),
      ]),
      dependencies: plugins.map((plugin, index) => ({
        id: text(plugin?.pluginId, text(plugin?.id, `unresolved-${index + 1}`)),
        name: text(plugin?.name, `Plugin ${index + 1}`),
        kind: "plugin",
        optional: false,
      })),
      attachments: [],
      accent: accentFor(id),
    });
  }
  return entries;
}

function normalizeGrokPlugins() {
  if (!existsSync(pluginSource)) return [];
  const provenance = readJson(join(grokRoot, "provenance.json"));
  const plugins = readdirSync(pluginSource, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readJson(join(pluginSource, entry.name, "plugin.json")));
  return plugins.map((plugin) => {
    const id = text(plugin.id, plugin.name);
    const name = text(plugin.displayName, text(plugin.name, "Untitled plugin"));
    const description = text(plugin.description, `${name} plugin`);
    const publisher = text(
      plugin.publisher?.displayName,
      text(plugin.publisher?.name, "Community"),
    );
    const components = [
      ["skill", "Skills", plugin.skills],
      ["command", "Commands", plugin.commands],
      ["hook", "Hooks", plugin.hooks],
      ["rule", "Rules", plugin.rules],
      ["subagent", "Subagents", plugin.subagents],
      ["mcp-server", "MCP servers", plugin.mcpServers],
    ];
    const capabilities = components.flatMap(([type, label, items]) => {
      if (!Array.isArray(items)) return [];
      return items.length <= 12
        ? items.map((item, index) => capability(type, item, index))
        : [capabilityGroup(type, label, items)];
    });

    const publisherData = { name: publisher };
    if (plugin.publisher?.websiteUrl) publisherData.url = plugin.publisher.websiteUrl;
    if (plugin.logoUrl || plugin.publisher?.logoUrl) {
      publisherData.logoUrl = plugin.logoUrl || plugin.publisher.logoUrl;
    }

    return {
      id: `grok-plugin:${id}`,
      slug: slugify(plugin.name, `plugin-${slugify(id, "entry")}`),
      platform: "grok-bot",
      kind: "plugin",
      name: { en: name, zh: name },
      summary: { en: description, zh: description },
      description: { en: description, zh: description },
      publisher: publisherData,
      official: false,
      verified: Boolean(plugin.isPublished),
      category: slugify(plugin.curatedCategoryKeys?.[0], "developer-tools"),
      tags: unique([...(plugin.tags || []), ...(plugin.curatedCategoryKeys || []), "plugin"]),
      updatedAt: isoDate(plugin.updatedAt, provenance.pluginCatalogExportedAt),
      sourceUrl: text(plugin.repositoryUrl, plugin.gitUrl),
      repositoryUrl: text(plugin.repositoryUrl, plugin.gitUrl),
      sourceLabel: "Cursor public plugin catalog",
      capabilities: compact(capabilities),
      dependencies: [],
      attachments: [],
      accent: accentFor(id),
    };
  });
}

function walkOpenMaus(kind) {
  return contributions
    .filter((record) => record.kind === kind)
    .map(({ base, manifest, references }) => {
      const id = manifest.id;
      const name = manifest.name || { en: id };
      const summary = manifest.summary || { en: name.en };
      return {
        id: `openmausbot-${kind}:${id}`,
        slug: slugify(id, `${kind}-entry`),
        platform: "openmausbot",
        kind,
        name,
        summary,
        description: manifest.description || summary,
        publisher: manifest.publisher,
        official: false,
        verified: false,
        category: slugify(manifest.category, "other"),
        tags: unique(manifest.tags || []),
        updatedAt: isoDate(manifest.updatedAt),
        sourceUrl: text(
          manifest.sourceUrl,
          `https://github.com/kerm1it/grok-bot-exts/tree/main/${relative(root, base)}`,
        ),
        ...(manifest.repositoryUrl ? { repositoryUrl: manifest.repositoryUrl } : {}),
        sourceLabel: "OpenMausBot community contribution",
        capabilities: references.map((reference, index) =>
          capability(
            reference.type === "skills"
              ? "skill"
              : reference.type === "routines"
                ? "routine"
                : "attachment",
            { name: basename(reference.file.path), description: reference.type },
            index,
          ),
        ),
        dependencies: (manifest.plugins || []).map((plugin) => ({
          id: plugin.id,
          name: plugin.name || plugin.id,
          kind: "plugin",
          optional: Boolean(plugin.optional),
        })),
        attachments: references.map(({ file }) => file),
        accent: accentFor(id),
      };
    });
}

function sortEntries(a, b) {
  return (
    Number(b.official) - Number(a.official) ||
    Number(b.verified) - Number(a.verified) ||
    b.updatedAt.localeCompare(a.updatedAt) ||
    a.name.en.localeCompare(b.name.en) ||
    a.id.localeCompare(b.id)
  );
}

const importedGrok = [...normalizeGrokBots(), ...normalizeGrokPlugins()];
const entries = [...importedGrok, ...walkOpenMaus("bot"), ...walkOpenMaus("plugin")].sort(
  sortEntries,
);

const seen = new Set();
for (const entry of entries) {
  if (seen.has(entry.id)) throw new Error(`Duplicate catalog ID: ${entry.id}`);
  seen.add(entry.id);
}

const previous = existsSync(catalogPath) ? readJson(catalogPath) : null;
const generatedAt =
  previous && JSON.stringify(previous.entries) === JSON.stringify(entries)
    ? previous.generatedAt
    : new Date().toISOString();
writeJson(catalogPath, { schemaVersion: 1, generatedAt, entries });

for (const locale of ["en", "zh"]) {
  const search = entries.map((entry) => ({
    id: entry.id,
    slug: entry.slug,
    platform: entry.platform,
    kind: entry.kind,
    name: entry.name[locale] || entry.name.en,
    summary: (entry.summary[locale] || entry.summary.en).slice(0, 280),
    publisher: entry.publisher.name,
    official: entry.official,
    verified: entry.verified,
    category: entry.category,
    tags: entry.tags,
    updatedAt: entry.updatedAt,
    accent: entry.accent,
    capabilities: entry.capabilities.length,
    dependencies: entry.dependencies.length,
  }));
  writeJson(join(searchDirectory, `catalog.${locale}.json`), search);
}

console.log(
  `Prepared ${entries.length} catalog entries (${importedGrok.length} imported Grok entries).`,
);
