import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://bot-extensions.kermitlx.workers.dev",
  output: "static",
  integrations: [sitemap()],
  build: {
    format: "directory",
  },
});
