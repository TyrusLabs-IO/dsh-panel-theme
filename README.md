# 侧边栏主题 / Sidebar Theme

插件包名：`dsh-panel-theme`

> A configurable sidebar background theme for DeepSeek Harness: base color and opacity, gradient, glow, readability veil, quick presets, and JSON backup. Everything runs locally in the browser.

为 DeepSeek Harness 左侧边栏添加可调的背景样式：渐变、光晕与不透明度。

## 功能

- **底层**：基础颜色、整体不透明度、内容文字对比度（浅色 / 深色）。
- **渐变**：起止颜色、角度、强度，可单独开关。
- **光晕**：颜色、半径、水平/垂直位置、强度，可单独开关。
- **可读性遮罩**：把当前主题的底色叠在自定义图层上，保证文字可读。
- **快速预设**：内置暮光（深色/浅色两套），可保存霓虹等自定义预设；☀/☾ 标示浅色/深色模式。
- **自定义预设**：将当前外观保存为快速预设（可命名），最多保存 30 个；保存时会记录当前深色/浅色模式，预设旁会显示 ☀/☾ 标记；删除预设时会弹出二次确认。
- **配置备份**：将当前外观和预设导出为 JSON，或从 JSON 恢复；导入前会再次确认。
- 所有修改即时生效，并保存在**当前浏览器**的 `localStorage` 中，不会发送到任何服务器。

## 安装

### 通过 DSH Market 安装

收录后，在 **Plugins → Plugin Market → Themes** 中搜索 **Sidebar Theme**，点击安装并刷新 Web 页面。

### 手动安装

需要支持 Web UI 插件的 DeepSeek Harness。先克隆仓库：

```sh
git clone https://github.com/TyrusLabs-IO/dsh-panel-theme.git
cd dsh-panel-theme
```

然后安装当前目录（路径必须是绝对路径）：

```sh
dsh plugin add "$PWD"
```

也可以在 Harness 中让 agent 执行：

```text
plugin_manager action=install_bundle target=/absolute/path/to/dsh-panel-theme
```

安装后刷新 Web 页面，在 **设置 → 侧边栏外观** 中打开「自定义侧边栏背景」。

## 自定义预设

1. 调整好侧边栏样式后，点击快速预设行右侧的「保存当前」。
2. 输入名称并保存，当前颜色、不透明度、渐变、光晕、蒙层和文字对比度会一起保存；同时记录保存时的深色/浅色模式，预设名称旁会显示 ☀/☾ 标记。切换主题时，请选择与当前主题匹配的预设：☾ 适合深色，☀ 适合浅色。
3. 点击预设右侧的「×」删除；删除前会弹出确认框，确认后才会移除。

内置的两套暮光预设删除后，可通过「重置」恢复；自定义预设最多保存 30 个，重置外观不会删除它们。

> 从旧版本升级时，浏览器中重复的「暮光(浅)」自定义预设会被清理一次，「霓虹(浅)」会重命名为「霓虹」，其他自定义预设保留；之后仍可继续保存新的自定义预设。

## 备份与恢复

1. 在设置页底部的「备份」区域点击「导出 JSON」，浏览器会下载 `dsh-panel-theme-日期.json`。
2. 文件包含当前底层颜色/不透明度、文字对比度、渐变、光晕、蒙层、自定义预设，以及内置预设的隐藏状态。
3. 点击「导入 JSON」选择备份文件；确认后会覆盖当前外观和快速预设。
4. 文件必须由本插件导出，且 `version` 为 `1`；导入文件最大 2 MB。

导出/导入只读写本地文件，不经过网络，也不包含任何账号信息。

## 相关项目 / Related project

- [Tabbiy](https://tabbiy.top/) — Chrome 垂直标签页管理与自动分组扩展。

## 兼容性说明

- 插件只给侧边栏的布局列增加背景层，不替换原生侧边栏组件。
- 插件不加载图片；背景只由 CSS 渐变、光晕和底色组成。
- macOS 上侧边栏折叠后原生列会完全隐藏，自定义背景也会随之隐藏；这是 Harness 的原生行为。
- 插件使用 `:has()` 选择器定位侧边栏列，需要较新的 Chromium/Electron。

## 结构

```text
package.json        # DSH bundle 与 client 入口声明
cordis.patch.yml    # 插件安装行
index.js            # Host 侧占位
client.js           # 设置页面、样式注入与浏览器存储
locale/             # 插件目录与设置页文案（en / zh）
icon.png            # 插件与市场卡片图标（512×512）
logo.psd             # 图标源文件
marketplace/        # DSH Market 条目草稿
MARKETPLACE.md      # 上架检查清单
LICENSE             # MIT
README.md
```

## License

MIT。第三方项目 Tabbiy 的名称与链接仅用于相关项目说明。
