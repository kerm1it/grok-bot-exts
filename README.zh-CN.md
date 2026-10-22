# Bot 扩展市场

一个面向 **Grok Bot** 与 **OpenMausBot** 的可验证、双语扩展目录。

它把 Bot 和插件放进同一个可搜索目录，同时保留两个生态各自的文件结构和能力差异。每条记录都会先展示平台、发布者、来源、包含内容和依赖，再引导用户前往原始来源。

[浏览扩展市场](https://bot-extensions.kermitlx.workers.dev/zh/) · [English](README.md) · [架构说明（英文）](docs/marketplace-architecture.md) · [贡献指南（英文）](CONTRIBUTING.md)

## 首版能力

- 收录 5,000+ 个 Grok Bot 与当前插件目录
- 支持英文和简体中文路由
- 官方内容优先，并使用可复现的可信排序
- 可按平台、类型、分类、发布者和来源搜索筛选
- 为 OpenMausBot 提供 Bot、插件、Skill 与附件的文件原生 Schema
- 使用 Astro 静态生成，可部署到 Cloudflare
- CI 包含 Schema 校验、类型检查、单元测试和浏览器测试

首版只做静态浏览，不包含账号、评分、在线安装、制品分发、网页上传、Preset 或公开的多版本管理。

## 本地运行

```bash
corepack enable
pnpm install
pnpm validate
pnpm dev
```

使用 `pnpm build` 生成生产文件。单元测试运行 `pnpm test`；安装 Playwright Chromium 后可运行 `pnpm test:e2e`。

## 提交扩展

OpenMausBot 扩展放在 `contributions/openmausbot/`。Skill 的引用、脚本、资源和其他附件都以真实文件提交，并在 `extension.json` 中声明相对路径。每个扩展只保留一个当前状态，更新时直接修改原目录，历史由 Git 保留。

详细要求见 [CONTRIBUTING.md](CONTRIBUTING.md)。请勿提交抓取日志、临时快照、凭据或无关的原始导出文件。

