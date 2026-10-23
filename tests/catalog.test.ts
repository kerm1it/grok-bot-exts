import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { entries, entryPath, officialEntries } from "@/lib/catalog";

describe("catalog", () => {
  it("has unique stable IDs", () => {
    expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
  });

  it("orders official entries before community entries", () => {
    const firstCommunity = entries.findIndex((entry) => !entry.official);
    expect(firstCommunity).toBeGreaterThan(0);
    expect(entries.slice(0, firstCommunity).every((entry) => entry.official)).toBe(true);
    expect(officialEntries().every((entry) => entry.official)).toBe(true);
  });

  it("generates locale-stable routes", () => {
    const entry = entries[0];
    expect(entryPath(entry, "en")).toMatch(/^\/extensions\//);
    expect(entryPath(entry, "zh")).toBe(`/zh${entryPath(entry, "en")}`);
  });

  it("keeps native resources for every Grok catalog entry", () => {
    for (const entry of entries.filter((item) => item.platform === "grok-bot")) {
      const id = entry.id.slice(entry.id.indexOf(":") + 1);
      const directory = resolve("extensions/grok-bot", `${entry.kind}s`, id);
      const files =
        entry.kind === "bot"
          ? ["manifest.json", "listing.json", "recipe.json", "template.json"]
          : ["plugin.json"];
      for (const file of files) {
        expect(existsSync(resolve(directory, file)), `${entry.id}/${file}`).toBe(true);
      }
      if (entry.kind === "bot") {
        expect(entry.repositoryUrl).toBe(
          `https://github.com/kerm1it/grok-bot-exts/tree/main/extensions/grok-bot/bots/${encodeURIComponent(id)}`,
        );
      }
    }
  });
});
