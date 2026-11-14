# DSH Market 上架核查

- 仓库：https://github.com/TyrusLabs-IO/dsh-panel-theme
- 审计时间：2026-11-14
- 收录规则来源：`awesome-dsh-plugin/awesome-dsh-plugin` 的 `contributing.md`

## 结论

除“仓库创建满 1 天”外，真正会阻止收录的硬缺口只有两个：

1. GitHub 仓库还没有 `dsh-plugin` topic。
2. 还没有向 `awesome-dsh-plugin` 提交目录条目 PR。

另有一项发布同步工作：截图、`screenshots.json`、删除 `logo.psd` 等本地改动还没有推送到 `main`。截图本身是可选推荐项，不影响收录资格；但不推送就不会出现在仓库和市场详情页。

## 硬性条件

| 条件 | 状态 | 需要做什么 |
|---|---|---|
| `package.json` 声明 `dsh.bundle`，且有 `cordis.patch.yml` | 已满足 | 无 |
| 有真实可用的插件代码，不是占位仓库 | 已满足 | 无 |
| 仓库公开 | 已满足 | 无 |
| 仓库创建满 1 天 | **未满足，已知问题** | 最早 `2026-11-15 15:22`（Asia/Shanghai）提交 |
| 仓库添加 `dsh-plugin` topic | **缺失** | 仓库首页 → About 齿轮 → Topics，加入 `dsh-plugin` |
| 条目 `category: theme` | 已满足 | 无需改动 |
| `description.en` 准确描述功能 | 已满足 | 当前条目描述与实现一致 |
| 一个 PR 最多 3 个条目 | 已满足 | 本插件只提交 1 个条目 |
| 向 `awesome-dsh-plugin` 提交条目 PR | **未提交** | 见下方“提交目录 PR” |

## 当前远程仓库状态

截至审计时，`main` 分支的公开仓库：

- GitHub Description：空。
- GitHub Topics：空。
- 根目录仍有 `logo.psd`。
- 没有 `assets/screenshots/`，也没有 `screenshots.json`。
- `icon.png` 已在远程仓库中，条目中的 raw 图标地址有对应文件。

本地工作区已经准备好：

- `logo.psd` 已删除。
- 5 张截图已放入 `assets/screenshots/`。
- `screenshots.json` 已按 1–8 张的格式声明。
- `README.md` 和本文件已更新。

这些本地改动尚未提交、尚未推送；需要由你执行 git 操作。

## 推荐但不会拦收录

- **GitHub Description**：建议填写  
  `Configurable sidebar background theme for DeepSeek Harness: gradient, glow, opacity, presets and JSON backup.`
- **其他 Topics**：建议同时加  
  `deepseek-harness`、`theme`、`sidebar`
- **截图**：可选；本地已有 5 张，推送后市场详情页会展示。没有截图时，市场会尝试从 README 提取图片。
- **npm 包**：不要求。插件可直接从 GitHub 源码安装；`private:true` 只影响 `npm publish`。
- **GitHub Release tarball**：不要求，属于安装体验优化。

## 提交目录 PR

目标仓库：`https://github.com/awesome-dsh-plugin/awesome-dsh-plugin`

1. Fork 目录仓库。
2. 新增一个文件：

   ```text
   data/plugins/TyrusLabs-IO__dsh-panel-theme.yml
   ```

3. 内容复制本仓库的：

   ```text
   marketplace/TyrusLabs-IO__dsh-panel-theme.yml
   ```

4. 向 `main` 发起 PR。
5. 不要手工修改生成的两个 README；CI 会检查条目数量、`dsh.bundle`、仓库年龄和站点构建。
6. 首次提交如果因仓库未满 1 天被拦，等到 `2026-11-15 15:22` 后在同一 PR 或重新提交即可。

条目里的图标地址：

```text
https://raw.githubusercontent.com/TyrusLabs-IO/dsh-panel-theme/main/icon.png
```

## 建议执行顺序

1. 把本地截图、`screenshots.json`、`logo.psd` 删除等改动推送到 `main`（你手动执行 git）。
2. 在 GitHub 仓库设置 Description 和 `dsh-plugin` topic。
3. 等仓库满 1 天。
4. Fork 目录仓库，添加 YAML，发起 PR。
5. 按 CI / 维护者反馈修正条目。
