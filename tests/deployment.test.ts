import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("deployment workflow", () => {
  it("invokes the package script instead of pnpm's built-in deploy command", () => {
    const workflow = readFileSync(new URL("../.github/workflows/ci.yml", import.meta.url), "utf8");
    expect(workflow).toMatch(/run: pnpm run deploy\s/);
    expect(workflow).not.toMatch(/run: pnpm deploy\s/);
  });

  it("keeps the environment example aligned with the configured production origin", () => {
    const config = readFileSync(new URL("../astro.config.mjs", import.meta.url), "utf8");
    const example = readFileSync(new URL("../.env.example", import.meta.url), "utf8");
    const origin = config.match(/process\.env\.PUBLIC_SITE_URL \|\| "([^"]+)"/)?.[1];
    expect(origin).toBeDefined();
    expect(example.trim()).toBe(`PUBLIC_SITE_URL=${origin}`);
  });
});
