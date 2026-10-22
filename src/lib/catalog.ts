import catalogData from "@/data/catalog.json";
import type { Catalog, CatalogEntry, Locale } from "./types";

export const catalog = catalogData as Catalog;
export const entries = catalog.entries;

export function localized(value: { en: string; zh?: string }, locale: Locale): string {
  return value[locale] || value.en;
}

export function entryIdSegment(entry: CatalogEntry): string {
  return entry.id.slice(entry.id.indexOf(":") + 1);
}

export function entryPath(entry: CatalogEntry, locale: Locale): string {
  const prefix = locale === "zh" ? "/zh" : "";
  return `${prefix}/extensions/${entry.platform}/${entry.kind}/${encodeURIComponent(entryIdSegment(entry))}/`;
}

export function getEntry(platform: string, kind: string, id: string): CatalogEntry | undefined {
  return entries.find(
    (entry) => entry.platform === platform && entry.kind === kind && entryIdSegment(entry) === id,
  );
}

export function officialEntries(limit = 8): CatalogEntry[] {
  return entries.filter((entry) => entry.official).slice(0, limit);
}

export function categoryCounts(): Array<{ category: string; count: number }> {
  const counts = new Map<string, number>();
  for (const entry of entries) counts.set(entry.category, (counts.get(entry.category) || 0) + 1);
  return [...counts]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export function platformCount(
  platform: CatalogEntry["platform"],
  kind?: CatalogEntry["kind"],
): number {
  return entries.filter((entry) => entry.platform === platform && (!kind || entry.kind === kind))
    .length;
}
