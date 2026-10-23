import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("deployment workflow", () => {
  it("invokes the package script instead of pnpm's built-in deploy command", () => {
    const workflow = readFileSync(new URL("../.github/workflows/ci.yml", import.meta.url), "utf8");
    expect(workflow).toMatch(/run: pnpm run deploy\s/);
    expect(workflow).not.toMatch(/run: pnpm deploy\s/);
  });
});
