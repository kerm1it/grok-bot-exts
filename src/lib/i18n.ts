import type { ExtensionKind, Locale, Platform } from "./types";

const messages = {
  en: {
    siteName: "Bot Extensions",
    navigation: "Primary navigation",
    browse: "Browse",
    contribute: "Contribute",
    about: "About",
    language: "中文",
    languageLabel: "Switch to Chinese",
    openSource: "Open source on GitHub",
    official: "Official",
    verified: "Catalog verified",
    community: "Community",
    bot: "Bot",
    plugin: "Plugin",
    grokBot: "Grok Bot",
    openMausBot: "OpenMausBot",
    viewRecord: "View record",
    source: "Open source",
    repository: "Repository",
    capabilities: "Contents",
    dependencies: "Dependencies",
    attachments: "Attachments",
    provenance: "Provenance",
    publisher: "Publisher",
    platform: "Platform",
    type: "Type",
    updated: "Updated",
    category: "Category",
    catalogSource: "Catalog source",
    noDependencies: "No plugin dependencies are declared.",
    noAttachments: "No separate attachments are published for this record.",
    backToCatalog: "Back to catalog",
    skipToContent: "Skip to content",
  },
  zh: {
    siteName: "Bot 扩展市场",
    navigation: "主导航",
    browse: "浏览",
    contribute: "提交扩展",
    about: "关于",
    language: "English",
    languageLabel: "切换到英文",
    openSource: "在 GitHub 上查看",
    official: "官方",
    verified: "已验证目录",
    community: "社区",
    bot: "Bot",
    plugin: "插件",
    grokBot: "Grok Bot",
    openMausBot: "OpenMausBot",
    viewRecord: "查看详情",
    source: "打开来源",
    repository: "代码仓库",
    capabilities: "包含内容",
    dependencies: "依赖",
    attachments: "附件",
    provenance: "来源信息",
    publisher: "发布者",
    platform: "平台",
    type: "类型",
    updated: "更新时间",
    category: "分类",
    catalogSource: "目录来源",
    noDependencies: "未声明插件依赖。",
    noAttachments: "此记录没有单独发布的附件。",
    backToCatalog: "返回目录",
    skipToContent: "跳到主要内容",
  },
} as const;

export type MessageKey = keyof (typeof messages)["en"];

export function t(locale: Locale, key: MessageKey): string {
  return messages[locale][key];
}

export function platformLabel(locale: Locale, platform: Platform): string {
  return platform === "grok-bot" ? t(locale, "grokBot") : t(locale, "openMausBot");
}

export function kindLabel(locale: Locale, kind: ExtensionKind): string {
  return kind === "bot" ? t(locale, "bot") : t(locale, "plugin");
}

const categoryNames: Record<string, { en: string; zh: string }> = {
  "personal-admin": { en: "Personal admin", zh: "个人事务" },
  "coding-shipping": { en: "Coding & shipping", zh: "开发与交付" },
  "research-briefings": { en: "Research & briefings", zh: "研究与简报" },
  "content-publishing": { en: "Content & publishing", zh: "内容与发布" },
  "finance-ops": { en: "Finance & operations", zh: "财务与运营" },
  "teams-handoffs": { en: "Teams & handoffs", zh: "团队与协作" },
  "customer-sales": { en: "Customer & sales", zh: "客户与销售" },
  "inbox-calendar": { en: "Inbox & calendar", zh: "收件箱与日历" },
  "from-grok-bot-team": { en: "From Grok Bot Team", zh: "Grok Bot 团队" },
  marketing: { en: "Marketing", zh: "市场营销" },
  personal: { en: "Personal", zh: "个人" },
  product: { en: "Product", zh: "产品" },
  engineering: { en: "Engineering", zh: "工程" },
  sales: { en: "Sales", zh: "销售" },
  design: { en: "Design", zh: "设计" },
  operations: { en: "Operations", zh: "运营" },
  "developer-tools": { en: "Developer tools", zh: "开发者工具" },
  other: { en: "Other", zh: "其他" },
};

export function categoryLabel(locale: Locale, category: string): string {
  return (
    categoryNames[category]?.[locale] ||
    category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}
