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
});
