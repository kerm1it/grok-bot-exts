export type Locale = "en" | "zh";
export type Platform = "grok-bot" | "openmausbot";
export type ExtensionKind = "bot" | "plugin";

export interface LocalizedText {
  en: string;
  zh?: string;
}

export interface Publisher {
  name: string;
  url?: string;
  logoUrl?: string;
}

export interface Capability {
  type:
    | "skill"
    | "memory"
    | "routine"
    | "plugin"
    | "command"
    | "hook"
    | "rule"
    | "subagent"
    | "mcp-server"
    | "attachment";
  name: string;
  description?: string;
  count?: number;
}

export interface Dependency {
  id: string;
  name: string;
  kind: "plugin";
  optional: boolean;
}

export interface Attachment {
  path: string;
  mediaType?: string;
  sha256?: string;
  size?: number;
}

export interface CatalogEntry {
  id: string;
  slug: string;
  platform: Platform;
  kind: ExtensionKind;
  name: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  publisher: Publisher;
  official: boolean;
  verified: boolean;
  category: string;
  tags: string[];
  updatedAt: string;
  sourceUrl: string;
  repositoryUrl?: string;
  sourceLabel: string;
  capabilities: Capability[];
  dependencies: Dependency[];
  attachments: Attachment[];
  accent: string;
}

export interface Catalog {
  schemaVersion: 1;
  generatedAt: string;
  entries: CatalogEntry[];
}
