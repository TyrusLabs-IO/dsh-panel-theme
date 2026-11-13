# DSH Market 上架清单

目标条目：`TyrusLockwood/dsh-panel-theme`，分类 `theme`（DSH Market 的 **Themes** 标签）。

## 仓库内已补齐

- [x] `package.json` 声明 `dsh.bundle` 与 `cordis.patch.yml`
- [x] 可运行的真实插件代码与 EN/ZH 文案
- [x] `icon.png`：512×512、GitHub 托管、市场卡片可用的位图
- [x] `LICENSE`（MIT）与 `package.json` 的 `license`
- [x] `repository` / `homepage` / `bugs` / `keywords` 元数据
- [x] README 改为公开 GitHub 安装方式，不再使用本机绝对路径
- [x] 市场条目草稿：`marketplace/TyrusLockwood__dsh-panel-theme.yml`
- [x] 相关项目链接只放在 README 和设置页，未写入市场描述

## 需要你处理

### 1. GitHub 仓库信息

请在 GitHub 仓库页面设置：

- Description：
  `Configurable sidebar background theme for DeepSeek Harness: gradient, glow, opacity, presets and JSON backup.`
- Topics：
  `dsh-plugin`、`deepseek-harness`、`theme`、`sidebar`
- Website：留空或填仓库 README 地址即可。

`dsh-plugin` 是市场 CI 的硬性要求。

### 2. 截图（1–8 张）

市场详情页优先读取仓库根目录的 `screenshots.json`。当前没有真实截图，不能放占位图。建议截 2–3 张：

1. 侧边栏应用渐变/光晕后的主界面；
2. 设置 → 侧边栏外观，展示控件与快速预设；
3. 保存预设或备份区域（可选）。

建议路径：

```text
assets/screenshots/sidebar-theme-1.png
assets/screenshots/sidebar-theme-2.png
```

截图完成后，在 `package.json` 同级新建 `screenshots.json`：

```json
[
  "assets/screenshots/sidebar-theme-1.png",
  "assets/screenshots/sidebar-theme-2.png"
]
```

要求：PNG/JPG/WebP，路径相对该文件，不能以 `/` 开头或包含 `..`；提交并推送到 `main`。

### 3. 等待仓库满 1 天

仓库创建于 `2026-11-12T05:00:09Z`，市场 CI 要求满 1 天，最早可在 **2026-11-13 13:00（Asia/Shanghai）** 提交。提前提交会被 CI 拦下，之后可重新提交。

### 4. 提交目录 PR

1. Fork `awesome-dsh-plugin/awesome-dsh-plugin`；
2. 新增 **一个文件**：`data/plugins/TyrusLockwood__dsh-panel-theme.yml`；
3. 内容复制本仓库的 `marketplace/TyrusLockwood__dsh-panel-theme.yml`；
4. 发起 PR。不要手动修改生成的 `README.md` / `README.zh.md`；
5. 等 CI：`dsh.bundle`、仓库年龄、awesome-lint、站点构建。

条目里的图标是：

```text
https://raw.githubusercontent.com/TyrusLockwood/dsh-panel-theme/main/icon.png
```

推送 `icon.png` 后该 URL 才有效。

## 可选，不做也能上架

- npm 发布：需要把包的 `repository` 指回本仓库；当前已填好。
- GitHub Release tarball：可加快安装，但不是必需。
- 多语言 README：市场只强制英文 `description.en`，当前条目已提供中英双语。

## 广告/关联项目说明

设置页和 README 中的 Tabbiy 链接已明确标注为独立相关项目，没有写进市场描述，也没有远程脚本或追踪代码。如果之后改为付费推广，建议先在 awesome-dsh-plugin 仓库确认披露要求；当前公开规则没有明确允许或禁止插件内付费广告。
