import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { readContributions } from "../scripts/contributions.mjs";

const roots: string[] = [];
function fixture() {
  const root = mkdtempSync(join(tmpdir(), "marketplace-contributions-"));
  roots.push(root);
  const base = join(root, "plugins", "sample");
  mkdirSync(base, { recursive: true });
  writeFileSync(join(base, "SKILL.md"), "# Sample\n");
  writeFileSync(join(base, "reference.txt"), "Supporting material\n");
  const manifest = {
    schemaVersion: 1,
    id: "sample",
    name: { en: "Sample" },
    summary: { en: "A test contribution" },
    publisher: { name: "Contributor" },
    category: "research",
    tags: [],
    entrypoints: { skills: [{ path: "SKILL.md" }], assets: [{ path: "reference.txt" }] },
  };
  const save = (value: unknown = manifest) =>
    writeFileSync(join(base, "extension.json"), JSON.stringify(value));
  save();
  return { root, base, manifest, save };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("file-native contributions", () => {
  it("rejects a missing extension root instead of silently dropping a platform", () => {
    const { root } = fixture();
    expect(() => readContributions(join(root, "missing"))).toThrow(/Missing extension root/);
  });

  it("loads a Skill and supporting attachment", () => {
    const { root } = fixture();
    expect(readContributions(root)[0].references).toHaveLength(2);
  });

  it("rejects a contributor claiming official provenance", () => {
    const { root, manifest, save } = fixture();
    save({ ...manifest, official: true });
    expect(() => readContributions(root)).toThrow(/Invalid/);
  });

  it("rejects missing files and path traversal", () => {
    const { root, manifest, save } = fixture();
    manifest.entrypoints.assets[0].path = "missing.txt";
    save();
    expect(() => readContributions(root)).toThrow();
    manifest.entrypoints.assets[0].path = "../outside.txt";
    save();
    expect(() => readContributions(root)).toThrow(/Invalid/);
  });

  it("rejects symlink escapes and incorrect attachment integrity", () => {
    const { root, base, manifest, save } = fixture();
    writeFileSync(join(root, "outside.txt"), "outside");
    symlinkSync(join(root, "outside.txt"), join(base, "linked.txt"));
    manifest.entrypoints.assets[0].path = "linked.txt";
    save();
    expect(() => readContributions(root)).toThrow(/escapes/);
    save({ ...manifest, entrypoints: { skills: [{ path: "SKILL.md", size: 0 }] } });
    expect(() => readContributions(root)).toThrow(/size mismatch/);
  });

  it("resolves bot dependencies to contributed plugins", () => {
    const { root, manifest } = fixture();
    const base = join(root, "bots", "assistant");
    mkdirSync(base, { recursive: true });
    writeFileSync(join(base, "PROFILE.md"), "# Assistant\n");
    const bot = {
      ...manifest,
      id: "assistant",
      plugins: [{ id: "sample", optional: false }],
      entrypoints: { profile: { path: "PROFILE.md" }, skills: [], memory: [], routines: [] },
    };
    writeFileSync(join(base, "extension.json"), JSON.stringify(bot));
    expect(readContributions(root)).toHaveLength(2);
    bot.plugins[0].id = "unknown";
    writeFileSync(join(base, "extension.json"), JSON.stringify(bot));
    expect(() => readContributions(root)).toThrow(/Unknown plugin/);
  });
});
