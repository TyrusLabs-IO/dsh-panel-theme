window.__ModuleLoader__.load({
  id: 'dsh-panel-theme',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'dsh-panel-theme';
    const SECTION_ID = 'dsh-panel-theme';
    const STORAGE_KEY = 'dsh-panel-theme.prefs.v1';
    const LEGACY_STORAGE_KEY = 'dsh-sidebar-theme.prefs.v1';
    const BACKGROUND_STYLE_ATTR = 'background';
    const UI_STYLE_ATTR = 'ui';

    const DEFAULTS = {
      enabled: false,
      opacity: 1,
      baseColor: '#0f172a',
      content: 'light',
      gradient: {
        enabled: true,
        from: '#2563eb',
        to: '#9333ea',
        angle: 135,
        opacity: 0.5,
      },
      glow: {
        enabled: true,
        color: '#38bdf8',
        opacity: 0.34,
        size: 62,
        x: 24,
        y: 16,
      },
      veil: {
        enabled: true,
        opacity: 0.32,
      },
      customPresets: [],
      hiddenPresets: [],
    };

    const MAX_CUSTOM_PRESETS = 30;
    const BACKUP_FORMAT = 'dsh-panel-theme';
    const BACKUP_VERSION = 1;
    const MAX_BACKUP_BYTES = 2 * 1024 * 1024;

    const PRESETS = [
      {
        id: 'aurora',
        labelKey: 'preset.aurora',
        baseColor: '#07111f',
        gradient: { from: '#2563eb', to: '#7c3aed', angle: 135, opacity: 0.52 },
        glow: { color: '#38bdf8', opacity: 0.38, size: 68, x: 22, y: 16 },
        veil: { opacity: 0.32 },
      },
      {
        id: 'dusk',
        labelKey: 'preset.dusk',
        baseColor: '#190f20',
        gradient: { from: '#db2777', to: '#7c3aed', angle: 115, opacity: 0.46 },
        glow: { color: '#f472b6', opacity: 0.32, size: 58, x: 82, y: 18 },
        veil: { opacity: 0.34 },
      },
      {
        id: 'forest',
        labelKey: 'preset.forest',
        baseColor: '#071a14',
        gradient: { from: '#059669', to: '#0e7490', angle: 150, opacity: 0.46 },
        glow: { color: '#34d399', opacity: 0.3, size: 62, x: 20, y: 82 },
        veil: { opacity: 0.34 },
      },
    ];

    const EN = {
      nav: 'Sidebar style',
      eyebrow: 'Appearance',
      title: 'Sidebar appearance',
      description:
        'Paint the left sidebar with a gradient or glow. Changes apply immediately and stay in this browser.',
      'enable.label': 'Custom sidebar background',
      'enable.on': 'On',
      'enable.off': 'Off',
      'enable.hint': 'When off, the native sidebar background is used.',
      'presets.label': 'Quick presets',
      'preset.aurora': 'Aurora',
      'preset.dusk': 'Dusk',
      'preset.forest': 'Forest',
      'presets.save': 'Save current',
      'presets.saveTitle': 'Save current style as preset',
      'presets.name': 'Preset name',
      'presets.namePlaceholder': 'e.g. Midnight blue',
      'presets.confirmSave': 'Save preset',
      'presets.delete': 'Delete preset',
      'presets.deleteTitle': 'Delete preset?',
      'presets.deleteBody': 'This preset will be permanently removed. This cannot be undone.',
      'presets.deleteBuiltInBody': 'This built-in preset will be removed from quick presets. Reset restores it.',
      'presets.deleteConfirm': 'Delete',
      'presets.cancel': 'Cancel',
      'presets.defaultName': 'My preset',
      'presets.limit': 'You can save up to 30 presets.',
      'io.title': 'Backup',
      'io.hint': 'Export the current appearance and presets as JSON, or restore a saved backup.',
      'io.export': 'Export JSON',
      'io.import': 'Import JSON',
      'io.importTitle': 'Import settings?',
      'io.importBody': 'This replaces the current appearance and quick presets with the settings in the file.',
      'io.importConfirm': 'Import',
      'io.exported': 'Backup file exported.',
      'io.imported': 'Settings imported.',
      'io.exportFailed': 'Could not create the backup file.',
      'io.invalid': 'Could not read this file. The format or version is not supported.',
      'io.version': 'This backup was created by a newer version and cannot be imported.',
      'io.tooLarge': 'The file is too large. The maximum size is 2 MB.',
      'related.title': 'Related project',
      'related.hint':
        'Tabbiy is a separate Chrome extension for vertical tabs and auto-grouping. It is not part of this plugin.',
      'related.link': 'Visit Tabbiy',
      reset: 'Reset',
      'surface.title': 'Surface',
      'surface.hint': 'The base color, transparency, and text contrast of the sidebar.',
      'surface.baseColor': 'Base color',
      'surface.opacity': 'Opacity',
      'surface.content': 'Content color',
      'surface.contentAuto': 'Follow theme',
      'surface.contentLight': 'Light text',
      'surface.contentDark': 'Dark text',
      'gradient.title': 'Gradient',
      'gradient.hint': 'A directional colour wash over the surface.',
      'gradient.enable': 'Enable gradient',
      'gradient.from': 'From',
      'gradient.to': 'To',
      'gradient.angle': 'Angle',
      'gradient.opacity': 'Strength',
      'glow.title': 'Glow',
      'glow.hint': 'A soft radial light behind the content.',
      'glow.enable': 'Enable glow',
      'glow.color': 'Glow color',
      'glow.size': 'Radius',
      'glow.x': 'Horizontal position',
      'glow.y': 'Vertical position',
      'glow.opacity': 'Intensity',
      'veil.title': 'Readability veil',
      'veil.hint': 'Blends the current theme background over the custom layers so labels stay legible.',
      'veil.enable': 'Enable readability veil',
      'veil.opacity': 'Veil strength',
      'notice.quota': 'The browser storage is full. The change is visible now but may not survive a reload.',
      'notice.reset': 'Appearance reset.',
      'notice.presetSaved': 'Preset saved.',
      'notice.presetDeleted': 'Preset deleted.',
      footnote: 'Preferences are stored in this browser only.',
    };

    const ZH = {
      nav: '侧边栏样式',
      eyebrow: '外观',
      title: '侧边栏外观',
      description: '用渐变或光晕装饰左侧边栏。修改会立即生效，并保存在当前浏览器中。',
      'enable.label': '自定义侧边栏背景',
      'enable.on': '已开启',
      'enable.off': '已关闭',
      'enable.hint': '关闭时使用 Harness 原生的侧边栏背景。',
      'presets.label': '快速预设',
      'preset.aurora': '极光',
      'preset.dusk': '暮色',
      'preset.forest': '森林',
      'presets.save': '保存当前',
      'presets.saveTitle': '保存当前样式为预设',
      'presets.name': '预设名称',
      'presets.namePlaceholder': '例如：午夜蓝',
      'presets.confirmSave': '保存预设',
      'presets.delete': '删除预设',
      'presets.deleteTitle': '删除预设？',
      'presets.deleteBody': '该预设将被永久删除，此操作无法撤销。',
      'presets.deleteBuiltInBody': '该内置预设将从快速预设中移除，之后可通过「重置」恢复。',
      'presets.deleteConfirm': '删除',
      'presets.cancel': '取消',
      'presets.defaultName': '我的预设',
      'presets.limit': '最多保存 30 个预设。',
      'io.title': '备份',
      'io.hint': '将当前外观和预设导出为 JSON，或从备份文件恢复。',
      'io.export': '导出 JSON',
      'io.import': '导入 JSON',
      'io.importTitle': '导入配置？',
      'io.importBody': '这会用文件中的外观和快速预设替换当前设置。',
      'io.importConfirm': '导入',
      'io.exported': '配置文件已导出。',
      'io.imported': '配置已导入。',
      'io.exportFailed': '无法创建备份文件。',
      'io.invalid': '无法读取该文件：格式或版本不受支持。',
      'io.version': '该备份由更新版本创建，当前版本无法导入。',
      'io.tooLarge': '文件过大，最大支持 2 MB。',
      'related.title': '相关项目',
      'related.hint': 'Tabbiy 是一个独立的 Chrome 垂直标签页管理与自动分组扩展，不是本插件的功能。',
      'related.link': '访问 Tabbiy',
      reset: '重置',
      'surface.title': '底层',
      'surface.hint': '设置基础颜色、透明度，以及侧边栏文字对比度。',
      'surface.baseColor': '基础颜色',
      'surface.opacity': '透明度',
      'surface.content': '内容文字',
      'surface.contentAuto': '跟随主题',
      'surface.contentLight': '浅色文字',
      'surface.contentDark': '深色文字',
      'gradient.title': '渐变',
      'gradient.hint': '在底层之上叠加一层有方向性的色彩。',
      'gradient.enable': '启用渐变',
      'gradient.from': '起始色',
      'gradient.to': '结束色',
      'gradient.angle': '角度',
      'gradient.opacity': '强度',
      'glow.title': '光晕',
      'glow.hint': '内容背后的一团柔和径向光。',
      'glow.enable': '启用光晕',
      'glow.color': '光晕颜色',
      'glow.size': '半径',
      'glow.x': '水平位置',
      'glow.y': '垂直位置',
      'glow.opacity': '强度',
      'veil.title': '可读性蒙层',
      'veil.hint': '把当前主题的背景色轻轻叠在自定义图层上，保证文字清楚可读。',
      'veil.enable': '启用可读性蒙层',
      'veil.opacity': '蒙层强度',
      'notice.quota': '浏览器存储已满：当前修改已生效，但刷新后可能无法保留。',
      'notice.reset': '外观已重置。',
      'notice.presetSaved': '预设已保存。',
      'notice.presetDeleted': '预设已删除。',
      footnote: '偏好仅保存在当前浏览器中。',
    };

    const UI_CSS = `
      .dst-page {
        width: 100%;
        max-width: 760px;
        padding: 8px 0 56px;
        color: var(--dsw-alias-label-primary);
        font-size: 14px;
        line-height: 1.55;
      }
      .dst-hero {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        padding: 4px 0 20px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .dst-hero-copy { min-width: 0; }
      .dst-eyebrow {
        color: var(--dsw-alias-label-secondary);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: .09em;
        line-height: 1.4;
        text-transform: uppercase;
      }
      .dst-title {
        margin: 6px 0 8px;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -.02em;
        line-height: 1.25;
      }
      .dst-desc {
        max-width: 56ch;
        margin: 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 13px;
      }
      .dst-master {
        display: flex;
        flex: none;
        align-items: center;
        gap: 10px;
        padding-top: 2px;
      }
      .dst-master-label {
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        white-space: nowrap;
      }
      .dst-switch {
        position: relative;
        flex: none;
        width: 42px;
        height: 24px;
        padding: 0;
        border: 1px solid var(--dsw-alias-border-l2);
        border-radius: 999px;
        background: var(--dsw-alias-bg-layer-2);
        cursor: pointer;
        transition: background .16s ease, border-color .16s ease;
      }
      .dst-switch::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--dsw-alias-label-secondary);
        transition: transform .16s ease, background .16s ease;
      }
      .dst-switch[aria-checked="true"] {
        border-color: transparent;
        background: var(--dsw-alias-brand-primary);
      }
      .dst-switch[aria-checked="true"]::after {
        background: #fff;
        transform: translateX(18px);
      }
      .dst-switch:focus-visible,
      .dst-preset:focus-visible,
      .dst-preset-delete:focus-visible,
      .dst-modal-btn:focus-visible {
        outline: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent);
        outline-offset: 2px;
      }
      .dst-notice {
        margin-top: 14px;
        padding: 9px 12px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        font-size: 12px;
      }
      .dst-presets {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        padding: 16px 0 4px;
      }
      .dst-presets-label {
        margin-right: 2px;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
      }
      .dst-preset {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        height: 30px;
        padding: 0 11px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
      }
      .dst-preset:hover {
        border-color: var(--dsw-alias-border-l2);
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
      }
      .dst-preset-dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        box-shadow: inset 0 0 0 1px rgba(127, 127, 127, .22);
        flex: 0 0 auto;
      }
      .dst-preset-name {
        min-width: 0;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dst-preset-wrap {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        max-width: 100%;
      }
      .dst-preset-delete {
        width: 22px;
        height: 22px;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 15px;
        line-height: 1;
        cursor: pointer;
      }
      .dst-preset-delete:hover {
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 14%, transparent);
        color: var(--dsw-alias-state-error-primary);
      }
      .dst-preset-actions {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: auto;
      }
      .dst-reset {
        margin-left: auto;
        height: 30px;
        padding: 0 11px;
        border: 1px solid transparent;
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
      }
      .dst-reset:hover {
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
      }
      .dst-preset-actions .dst-reset { margin-left: 0; }
      .dst-io-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .dst-io-actions .dst-reset {
        margin-left: 0;
        border-color: var(--dsw-alias-border-l1);
      }
      .dst-related-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 12px;
        padding: 7px 11px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        color: var(--dsw-alias-brand-primary);
        font-size: 12px;
        font-weight: 500;
        text-decoration: none;
      }
      .dst-related-link:hover {
        background: var(--dsw-alias-bg-layer-1);
      }
      .dst-related-link::after {
        content: '↗';
        font-size: 11px;
        opacity: .75;
      }
      .dst-file-input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
      }
      .dst-reset:disabled {
        opacity: .45;
        cursor: not-allowed;
      }
      .dst-modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: rgba(0, 0, 0, .42);
        backdrop-filter: blur(2px);
      }
      .dst-modal {
        width: min(420px, 100%);
        padding: 20px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 14px;
        background: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-layer-1));
        color: var(--dsw-alias-label-primary);
        box-shadow: 0 24px 60px rgba(0, 0, 0, .28);
      }
      .dst-modal-title {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.4;
      }
      .dst-modal-body {
        margin: 9px 0 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 1.6;
      }
      .dst-modal-name {
        margin-top: 8px;
        font-size: 13px;
        font-weight: 600;
        word-break: break-word;
      }
      .dst-modal-input {
        width: 100%;
        height: 34px;
        box-sizing: border-box;
        margin-top: 12px;
        padding: 0 10px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        outline: none;
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 13px;
      }
      .dst-modal-input:focus {
        border-color: var(--dsw-alias-brand-primary);
      }
      .dst-modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 18px;
      }
      .dst-modal-btn {
        height: 32px;
        padding: 0 13px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
      }
      .dst-modal-btn:hover {
        background: var(--dsw-alias-bg-layer-1);
      }
      .dst-modal-btn:disabled {
        opacity: .45;
        cursor: not-allowed;
      }
      .dst-modal-btn-primary {
        border-color: transparent;
        background: var(--dsw-alias-brand-primary);
        color: #fff;
      }
      .dst-modal-btn-primary:hover { background: var(--dsw-alias-brand-primary); }
      .dst-modal-btn-danger {
        border-color: transparent;
        background: var(--dsw-alias-state-error-primary);
        color: #fff;
      }
      .dst-modal-btn-danger:hover { background: var(--dsw-alias-state-error-primary); }
      .dst-card {
        padding: 20px 0;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .dst-card:last-of-type { border-bottom: 0; }
      .dst-card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 14px;
      }
      .dst-card-title {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
      }
      .dst-card-hint {
        max-width: 58ch;
        margin: 3px 0 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
      }
      .dst-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px 20px;
      }
      .dst-field {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: 6px;
      }
      .dst-field-label {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 10px;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
      }
      .dst-field-value {
        color: var(--dsw-alias-label-primary);
        font-variant-numeric: tabular-nums;
      }
      .dst-select {
        width: 100%;
        height: 34px;
        box-sizing: border-box;
        padding: 0 10px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 13px;
        outline: none;
      }
      .dst-select:focus {
        border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, var(--dsw-alias-border-l1));
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, transparent);
      }
      .dst-range {
        width: 100%;
        height: 24px;
        margin: 0;
        accent-color: var(--dsw-alias-brand-primary);
        cursor: pointer;
      }
      .dst-color-row {
        display: flex;
        align-items: center;
        gap: 9px;
      }
      .dst-color {
        width: 38px;
        height: 34px;
        flex: none;
        box-sizing: border-box;
        padding: 3px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: var(--dsw-alias-bg-layer-1);
        cursor: pointer;
      }
      .dst-hex {
        color: var(--dsw-alias-label-secondary);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 11px;
      }
      .dst-footnote {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding-top: 18px;
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
        line-height: 1.5;
      }
      .dst-footnote::before {
        content: '';
        width: 6px;
        height: 6px;
        flex: none;
        margin-top: 5px;
        border-radius: 50%;
        background: var(--dsw-alias-state-success-primary);
      }
      @media (max-width: 640px) {
        .dst-hero { flex-direction: column; gap: 14px; }
        .dst-grid { grid-template-columns: 1fr; }
        .dst-reset { margin-left: 0; }
      }
    `;

    const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function numberOr(value, fallback, min, max) {
      const number = typeof value === 'number' ? value : Number(value);
      return Number.isFinite(number) ? clamp(number, min, max) : fallback;
    }

    function booleanOr(value, fallback) {
      return typeof value === 'boolean' ? value : fallback;
    }

    function hexColor(value, fallback) {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed.toLowerCase();
        if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
          return ('#' + trimmed.slice(1).split('').map((part) => part + part).join('')).toLowerCase();
        }
      }
      return fallback;
    }

    function enumOr(value, options, fallback) {
      return options.includes(value) ? value : fallback;
    }

    function sanitizeGradient(value) {
      const gradient = isObject(value) ? value : {};
      return {
        enabled: booleanOr(gradient.enabled, DEFAULTS.gradient.enabled),
        from: hexColor(gradient.from, DEFAULTS.gradient.from),
        to: hexColor(gradient.to, DEFAULTS.gradient.to),
        angle: numberOr(gradient.angle, DEFAULTS.gradient.angle, 0, 360),
        opacity: numberOr(gradient.opacity, DEFAULTS.gradient.opacity, 0, 1),
      };
    }

    function sanitizeGlow(value) {
      const glow = isObject(value) ? value : {};
      return {
        enabled: booleanOr(glow.enabled, DEFAULTS.glow.enabled),
        color: hexColor(glow.color, DEFAULTS.glow.color),
        opacity: numberOr(glow.opacity, DEFAULTS.glow.opacity, 0, 1),
        size: numberOr(glow.size, DEFAULTS.glow.size, 10, 100),
        x: numberOr(glow.x, DEFAULTS.glow.x, 0, 100),
        y: numberOr(glow.y, DEFAULTS.glow.y, 0, 100),
      };
    }

    function sanitizeVeil(value) {
      const veil = isObject(value) ? value : {};
      return {
        enabled: booleanOr(veil.enabled, DEFAULTS.veil.enabled),
        opacity: numberOr(veil.opacity, DEFAULTS.veil.opacity, 0, 1),
      };
    }

    function sanitizeCustomPreset(input, index, usedIds) {
      const preset = isObject(input) ? input : {};
      const name =
        typeof preset.name === 'string'
          ? preset.name.trim().replace(/\s+/g, ' ').slice(0, 40)
          : '';
      if (!name) return null;
      let id =
        typeof preset.id === 'string' && preset.id.trim()
          ? preset.id.trim().slice(0, 80)
          : `custom-${index}`;
      while (usedIds.has(id)) id = `${id}-${usedIds.size}`;
      usedIds.add(id);
      return {
        id,
        name,
        opacity: numberOr(preset.opacity, DEFAULTS.opacity, 0, 1),
        baseColor: hexColor(preset.baseColor, DEFAULTS.baseColor),
        content: enumOr(preset.content, ['auto', 'light', 'dark'], DEFAULTS.content),
        gradient: sanitizeGradient(preset.gradient),
        glow: sanitizeGlow(preset.glow),
        veil: sanitizeVeil(preset.veil),
      };
    }

    function sanitizeCustomPresets(value) {
      if (!Array.isArray(value)) return [];
      const usedIds = new Set();
      const presets = [];
      for (let index = 0; index < value.length && presets.length < MAX_CUSTOM_PRESETS; index += 1) {
        const preset = sanitizeCustomPreset(value[index], index, usedIds);
        if (preset) presets.push(preset);
      }
      return presets;
    }

    function sanitizeHiddenPresets(value) {
      if (!Array.isArray(value)) return [];
      const valid = new Set(PRESETS.map((preset) => preset.id));
      return Array.from(new Set(value.filter((id) => typeof id === 'string' && valid.has(id))));
    }

    function sanitize(input) {
      const root = isObject(input) ? input : {};
      return {
        enabled: booleanOr(root.enabled, DEFAULTS.enabled),
        opacity: numberOr(root.opacity, DEFAULTS.opacity, 0, 1),
        baseColor: hexColor(root.baseColor, DEFAULTS.baseColor),
        content: enumOr(root.content, ['auto', 'light', 'dark'], DEFAULTS.content),
        gradient: sanitizeGradient(root.gradient),
        glow: sanitizeGlow(root.glow),
        veil: sanitizeVeil(root.veil),
        customPresets: sanitizeCustomPresets(root.customPresets),
        hiddenPresets: sanitizeHiddenPresets(root.hiddenPresets),
      };
    }

    function serializeBackup(preferences) {
      return JSON.stringify(
        {
          format: BACKUP_FORMAT,
          version: BACKUP_VERSION,
          exportedAt: new Date().toISOString(),
          preferences,
        },
        null,
        2,
      );
    }

    function parseBackup(text) {
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        return { error: 'invalid' };
      }
      if (!isObject(data) || data.format !== BACKUP_FORMAT) return { error: 'invalid' };
      if (data.version !== BACKUP_VERSION) {
        return { error: data.version === undefined ? 'invalid' : 'version' };
      }
      if (!isObject(data.preferences)) return { error: 'invalid' };
      const source = data.preferences;
      const hasAppearance = ['enabled', 'opacity', 'baseColor', 'content', 'gradient', 'glow', 'veil'].some(
        (key) => Object.prototype.hasOwnProperty.call(source, key),
      );
      if (!hasAppearance) return { error: 'invalid' };
      return { preferences: sanitize(source) };
    }

    function merge(base, patch) {
      if (!isObject(patch)) return patch;
      const result = isObject(base) ? { ...base } : {};
      for (const key of Object.keys(patch)) {
        const value = patch[key];
        result[key] = isObject(value) && isObject(result[key]) ? merge(result[key], value) : value;
      }
      return result;
    }

    function loadPrefs() {
      try {
        let raw = window.localStorage.getItem(STORAGE_KEY);
        let legacy = false;
        if (!raw) {
          raw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
          legacy = Boolean(raw);
        }
        if (raw) {
          const stored = JSON.parse(raw);
          const parsed = sanitize(stored);
          const hadImage = isObject(stored) && Object.prototype.hasOwnProperty.call(stored, 'image');
          if (legacy || hadImage) {
            try {
              window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
              if (legacy) window.localStorage.removeItem(LEGACY_STORAGE_KEY);
            } catch (error) {
              console.warn('[dsh-panel-theme] could not migrate preferences', error);
            }
          }
          return parsed;
        }
      } catch (error) {
        console.warn('[dsh-panel-theme] could not read preferences', error);
      }
      return sanitize(DEFAULTS);
    }

    let prefs = loadPrefs();
    const listeners = new Set();

    function getPrefs() {
      return prefs;
    }

    function notifyPrefs() {
      for (const listener of Array.from(listeners)) {
        try {
          listener();
        } catch (error) {
          console.error('[dsh-panel-theme] preference listener failed', error);
        }
      }
    }

    function subscribePrefs(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }

    function persistPrefs(next) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return true;
      } catch (error) {
        console.warn('[dsh-panel-theme] could not save preferences', error);
        return false;
      }
    }

    function replacePrefs(next) {
      prefs = sanitize(next);
      notifyPrefs();
      return persistPrefs(prefs);
    }

    function setPrefs(patch) {
      return replacePrefs(merge(prefs, patch));
    }

    function rgb(hex) {
      const value = hexColor(hex, '#000000').slice(1);
      return {
        r: parseInt(value.slice(0, 2), 16),
        g: parseInt(value.slice(2, 4), 16),
        b: parseInt(value.slice(4, 6), 16),
      };
    }

    function rgba(hex, alpha) {
      const color = rgb(hex);
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${clamp(alpha, 0, 1).toFixed(3)})`;
    }

    function contentTokens(theme) {
      if (theme === 'light') {
        return `  --dsw-alias-label-primary: #f8fafc;
  --dsw-alias-label-secondary: rgba(248, 250, 252, 0.66);
  --dsw-alias-label-primary-inverted: #0f172a;
  --dsw-alias-state-idle-primary: rgba(248, 250, 252, 0.55);
  --dsw-alias-border-l1: rgba(255, 255, 255, 0.14);
  --dsw-alias-border-l2: rgba(255, 255, 255, 0.24);
  --dsw-alias-border-l3: rgba(255, 255, 255, 0.16);
  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.10);
  --dsw-alias-button-elevated-fill: rgba(255, 255, 255, 0.10);
  --dsw-alias-button-floating-hover: rgba(255, 255, 255, 0.16);
  --dsw-alias-scrollbar-bg-l2: rgba(255, 255, 255, 0.10);
  --dsw-alias-scrollbar-hover-l2: rgba(255, 255, 255, 0.24);
  --dsw-alias-state-business-primary: #93c5fd;
  --dsw-alias-state-error-primary: #fca5a5;
  --dsw-alias-state-success-primary: #86efac;
  --dsw-alias-state-warn-primary: #fcd34d;`;
      }
      return `  --dsw-alias-label-primary: #0f172a;
  --dsw-alias-label-secondary: rgba(15, 23, 42, 0.62);
  --dsw-alias-label-primary-inverted: #f8fafc;
  --dsw-alias-state-idle-primary: rgba(15, 23, 42, 0.55);
  --dsw-alias-border-l1: rgba(0, 0, 0, 0.12);
  --dsw-alias-border-l2: rgba(0, 0, 0, 0.20);
  --dsw-alias-border-l3: rgba(0, 0, 0, 0.14);
  --dsw-alias-interactive-bg-hover: rgba(0, 0, 0, 0.07);
  --dsw-alias-button-elevated-fill: rgba(255, 255, 255, 0.55);
  --dsw-alias-button-floating-hover: rgba(255, 255, 255, 0.70);
  --dsw-alias-scrollbar-bg-l2: rgba(0, 0, 0, 0.12);
  --dsw-alias-scrollbar-hover-l2: rgba(0, 0, 0, 0.24);
  --dsw-alias-state-business-primary: #1d4ed8;
  --dsw-alias-state-error-primary: #b91c1c;
  --dsw-alias-state-success-primary: #15803d;
  --dsw-alias-state-warn-primary: #b45309;`;
    }

    function buildCss(input) {
      const p = sanitize(input);
      if (!p.enabled) return '';

      const surface = 'div:has(> [data-slot="sidebar"])';
      const opacity = p.opacity;
      const rules = [];

      rules.push(`${surface} {
  background-color: ${rgba(p.baseColor, opacity)} !important;
  background-image: none !important;
  position: relative;
  isolation: isolate;
}`);
      rules.push(`${surface} > [data-slot="sidebar"] > * {
  background-color: transparent !important;
  background-image: none !important;
}`);
      if (p.content !== 'auto') {
        rules.push(`${surface} {
${contentTokens(p.content)}
}`);
        if (p.content === 'light') {
          rules.push(`${surface} button[class*="newSession"] {
  background-color: rgba(255, 255, 255, 0.10) !important;
  color: #f8fafc !important;
}`);
          rules.push(`${surface} button[class*="newSession"]:hover {
  background-color: rgba(255, 255, 255, 0.16) !important;
}`);
        } else {
          rules.push(`${surface} button[class*="newSession"] {
  background-color: rgba(255, 255, 255, 0.55) !important;
  color: #0f172a !important;
}`);
          rules.push(`${surface} button[class*="newSession"]:hover {
  background-color: rgba(255, 255, 255, 0.72) !important;
}`);
        }
      }

      const layers = [];
      const veilAlpha = p.veil.opacity * opacity;
      if (p.veil.enabled && veilAlpha > 0) {
        const veil = `color-mix(in srgb, var(--dsw-alias-bg-base) ${(veilAlpha * 100).toFixed(1)}%, transparent)`;
        layers.push(`linear-gradient(${veil}, ${veil})`);
      }
      if (p.glow.enabled && p.glow.opacity * opacity > 0) {
        layers.push(
          `radial-gradient(circle at ${p.glow.x.toFixed(1)}% ${p.glow.y.toFixed(1)}%, ` +
            `${rgba(p.glow.color, p.glow.opacity * opacity)} 0%, ` +
            `${rgba(p.glow.color, 0)} ${p.glow.size.toFixed(1)}%)`,
        );
      }
      if (p.gradient.enabled && p.gradient.opacity * opacity > 0) {
        layers.push(
          `linear-gradient(${p.gradient.angle.toFixed(1)}deg, ` +
            `${rgba(p.gradient.from, p.gradient.opacity * opacity)}, ` +
            `${rgba(p.gradient.to, p.gradient.opacity * opacity)})`,
        );
      }
      if (layers.length > 0) {
        rules.push(`${surface}::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-image:
    ${layers.join(',\n    ')};
}`);
      }

      return rules.join('\n\n');
    }

    function styleTag(kind) {
      let tag = document.querySelector(`style[data-dsh-panel-theme="${kind}"]`);
      if (!(tag instanceof HTMLStyleElement)) {
        tag = document.createElement('style');
        tag.setAttribute('data-dsh-panel-theme', kind);
        document.head.appendChild(tag);
      }
      return tag;
    }

    function Toggle({ checked, onChange, label }) {
      return h('button', {
        type: 'button',
        role: 'switch',
        'aria-checked': checked ? 'true' : 'false',
        'aria-label': label,
        className: 'dst-switch',
        onClick: () => onChange(!checked),
      });
    }

    function Field({ label, value, children }) {
      return h(
        'label',
        { className: 'dst-field' },
        h(
          'span',
          { className: 'dst-field-label' },
          h('span', null, label),
          value === undefined ? null : h('span', { className: 'dst-field-value' }, value),
        ),
        children,
      );
    }

    function Slider({ label, value, min, max, step = 1, display, onChange }) {
      return h(
        Field,
        { label, value: display },
        h('input', {
          type: 'range',
          className: 'dst-range',
          min,
          max,
          step,
          value,
          onChange: (event) => onChange(Number(event.target.value)),
        }),
      );
    }

    function ColorField({ label, value, onChange }) {
      return h(
        Field,
        { label },
        h(
          'span',
          { className: 'dst-color-row' },
          h('input', {
            type: 'color',
            className: 'dst-color',
            value,
            onChange: (event) => onChange(event.target.value),
          }),
          h('span', { className: 'dst-hex' }, value.toUpperCase()),
        ),
      );
    }

    function Select({ label, value, options, onChange }) {
      return h(
        Field,
        { label },
        h(
          'select',
          {
            className: 'dst-select',
            value,
            onChange: (event) => onChange(event.target.value),
          },
          options.map(([optionValue, optionLabel]) =>
            h('option', { key: optionValue, value: optionValue }, optionLabel),
          ),
        ),
      );
    }

    function Card({ title, hint, toggle, children }) {
      return h(
        'section',
        { className: 'dst-card' },
        h(
          'div',
          { className: 'dst-card-head' },
          h(
            'div',
            null,
            h('h3', { className: 'dst-card-title' }, title),
            hint ? h('p', { className: 'dst-card-hint' }, hint) : null,
          ),
          toggle ? h(Toggle, toggle) : null,
        ),
        children,
      );
    }

    function usePrefs() {
      const [value, setValue] = React.useState(getPrefs);
      React.useEffect(() => {
        let alive = true;
        const sync = () => {
          if (alive) setValue(getPrefs());
        };
        sync();
        const unsubscribe = subscribePrefs(sync);
        return () => {
          alive = false;
          unsubscribe();
        };
      }, []);
      return value;
    }

    function SidebarThemeSection({ t }) {
      const tr = typeof t === 'function' ? t : (key) => key;
      const p = usePrefs();
      const [notice, setNotice] = React.useState('');
      const [saveOpen, setSaveOpen] = React.useState(false);
      const [saveName, setSaveName] = React.useState('');
      const [deleteTarget, setDeleteTarget] = React.useState(null);
      const [importTarget, setImportTarget] = React.useState(null);
      const timer = React.useRef(0);
      const importInput = React.useRef(null);

      React.useEffect(
        () => () => {
          if (timer.current) window.clearTimeout(timer.current);
        },
        [],
      );

      React.useEffect(() => {
        if (!saveOpen && !deleteTarget && !importTarget) return undefined;
        const onKeyDown = (event) => {
          if (event.key === 'Escape') {
            setSaveOpen(false);
            setDeleteTarget(null);
            setImportTarget(null);
          }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
      }, [saveOpen, deleteTarget, importTarget]);

      const flash = (message) => {
        setNotice(message);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setNotice(''), 4500);
      };

      const edit = (patch) => {
        const saved = setPrefs(patch);
        if (!saved) flash(tr('notice.quota'));
      };

      const applyPreset = (preset, builtIn = false) => {
        const patch = builtIn
          ? {
              enabled: true,
              opacity: 1,
              baseColor: preset.baseColor,
              content: 'light',
              gradient: { ...p.gradient, ...preset.gradient, enabled: true },
              glow: { ...p.glow, ...preset.glow, enabled: true },
              veil: { ...p.veil, ...preset.veil, enabled: true },
            }
          : {
              enabled: true,
              opacity: preset.opacity,
              baseColor: preset.baseColor,
              content: preset.content,
              gradient: { ...preset.gradient },
              glow: { ...preset.glow },
              veil: { ...preset.veil },
            };
        const saved = replacePrefs(merge(p, patch));
        if (!saved) flash(tr('notice.quota'));
      };

      const nextPresetName = () => {
        const base = tr('presets.defaultName');
        const names = new Set(p.customPresets.map((preset) => preset.name));
        if (!names.has(base)) return base;
        let index = 2;
        while (names.has(`${base} ${index}`)) index += 1;
        return `${base} ${index}`;
      };

      const openSave = () => {
        setSaveName(nextPresetName());
        setSaveOpen(true);
      };

      const savePreset = () => {
        const name = saveName.trim().replace(/\s+/g, ' ').slice(0, 40);
        if (!name) return;
        if (p.customPresets.length >= MAX_CUSTOM_PRESETS) {
          flash(tr('presets.limit'));
          return;
        }
        const saved = setPrefs({
          customPresets: [
            ...p.customPresets,
            {
              id: `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
              name,
              opacity: p.opacity,
              baseColor: p.baseColor,
              content: p.content,
              gradient: { ...p.gradient },
              glow: { ...p.glow },
              veil: { ...p.veil },
            },
          ],
        });
        if (!saved) {
          flash(tr('notice.quota'));
          return;
        }
        setSaveOpen(false);
        setSaveName('');
        flash(tr('notice.presetSaved'));
      };

      const confirmDelete = () => {
        if (!deleteTarget) return;
        const { preset, builtIn } = deleteTarget;
        const saved = setPrefs(
          builtIn
            ? { hiddenPresets: Array.from(new Set([...p.hiddenPresets, preset.id])) }
            : { customPresets: p.customPresets.filter((item) => item.id !== preset.id) },
        );
        setDeleteTarget(null);
        flash(saved ? tr('notice.presetDeleted') : tr('notice.quota'));
      };

      const reset = () => {
        const saved = replacePrefs({
          ...DEFAULTS,
          customPresets: p.customPresets,
          hiddenPresets: [],
        });
        flash(saved ? tr('notice.reset') : tr('notice.quota'));
      };

      const exportPrefs = () => {
        try {
          const blob = new Blob([serializeBackup(p)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = `dsh-panel-theme-${new Date().toISOString().slice(0, 10)}.json`;
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          window.setTimeout(() => URL.revokeObjectURL(url), 1000);
          flash(tr('io.exported'));
        } catch (error) {
          console.error('[dsh-panel-theme] could not export preferences', error);
          flash(tr('io.exportFailed'));
        }
      };

      const openImport = () => {
        if (!importInput.current) return;
        importInput.current.value = '';
        importInput.current.click();
      };

      const importFile = async (event) => {
        const input = event.target;
        const file = input.files && input.files[0];
        if (!file) return;
        const clearInput = () => {
          input.value = '';
        };
        if (file.size > MAX_BACKUP_BYTES) {
          clearInput();
          flash(tr('io.tooLarge'));
          return;
        }
        let text;
        try {
          text = await file.text();
        } catch (error) {
          clearInput();
          flash(tr('io.invalid'));
          return;
        }
        clearInput();
        const parsed = parseBackup(text);
        if (parsed.error) {
          flash(tr(parsed.error === 'version' ? 'io.version' : 'io.invalid'));
          return;
        }
        setImportTarget({ preferences: parsed.preferences, name: file.name || 'backup.json' });
      };

      const confirmImport = () => {
        if (!importTarget) return;
        const saved = replacePrefs(importTarget.preferences);
        setImportTarget(null);
        flash(saved ? tr('io.imported') : tr('notice.quota'));
      };

      const presetItems = [
        ...PRESETS.filter((preset) => !p.hiddenPresets.includes(preset.id)).map((preset) => ({
          preset,
          builtIn: true,
        })),
        ...p.customPresets.map((preset) => ({ preset, builtIn: false })),
      ];
      const presetName = (preset, builtIn) => (builtIn ? tr(preset.labelKey) : preset.name);
      const deletingName = deleteTarget
        ? presetName(deleteTarget.preset, deleteTarget.builtIn)
        : '';

      return h(
        'div',
        { className: 'dst-page' },
        h(
          'header',
          { className: 'dst-hero' },
          h(
            'div',
            { className: 'dst-hero-copy' },
            h('div', { className: 'dst-eyebrow' }, tr('eyebrow')),
            h('h2', { className: 'dst-title' }, tr('title')),
            h('p', { className: 'dst-desc' }, tr('description')),
          ),
          h(
            'div',
            { className: 'dst-master' },
            h('span', { className: 'dst-master-label' }, p.enabled ? tr('enable.on') : tr('enable.off')),
            h(Toggle, {
              checked: p.enabled,
              onChange: (enabled) => edit({ enabled }),
              label: tr('enable.label'),
            }),
          ),
        ),
        notice ? h('div', { className: 'dst-notice', role: 'status' }, notice) : null,
        h(
          'div',
          { className: 'dst-presets' },
          h('span', { className: 'dst-presets-label' }, tr('presets.label')),
          presetItems.map(({ preset, builtIn }) =>
            h(
              'span',
              {
                key: `${builtIn ? 'builtin' : 'custom'}-${preset.id}`,
                className: 'dst-preset-wrap',
              },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dst-preset',
                  title: presetName(preset, builtIn),
                  onClick: () => applyPreset(preset, builtIn),
                },
                h('span', {
                  className: 'dst-preset-dot',
                  style: {
                    background: `linear-gradient(135deg, ${preset.gradient.from}, ${preset.gradient.to})`,
                  },
                }),
                h('span', { className: 'dst-preset-name' }, presetName(preset, builtIn)),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dst-preset-delete',
                  title: tr('presets.delete'),
                  'aria-label': `${tr('presets.delete')}: ${presetName(preset, builtIn)}`,
                  onClick: () => setDeleteTarget({ preset, builtIn }),
                },
                '×',
              ),
            ),
          ),
          h(
            'div',
            { className: 'dst-preset-actions' },
            h(
              'button',
              {
                type: 'button',
                className: 'dst-reset',
                title: p.customPresets.length >= MAX_CUSTOM_PRESETS ? tr('presets.limit') : tr('presets.save'),
                onClick: openSave,
                disabled: p.customPresets.length >= MAX_CUSTOM_PRESETS,
              },
              tr('presets.save'),
            ),
            h('button', { type: 'button', className: 'dst-reset', onClick: reset }, tr('reset')),
          ),
        ),
        h(
          Card,
          { title: tr('surface.title'), hint: tr('surface.hint') },
          h(
            'div',
            { className: 'dst-grid' },
            h(ColorField, {
              label: tr('surface.baseColor'),
              value: p.baseColor,
              onChange: (baseColor) => edit({ baseColor }),
            }),
            h(Slider, {
              label: tr('surface.opacity'),
              value: p.opacity,
              min: 0,
              max: 1,
              step: 0.01,
              display: `${Math.round(p.opacity * 100)}%`,
              onChange: (opacity) => edit({ opacity }),
            }),
            h(Select, {
              label: tr('surface.content'),
              value: p.content,
              options: [
                ['auto', tr('surface.contentAuto')],
                ['light', tr('surface.contentLight')],
                ['dark', tr('surface.contentDark')],
              ],
              onChange: (content) => edit({ content }),
            }),
          ),
        ),
        h(
          Card,
          {
            title: tr('gradient.title'),
            hint: tr('gradient.hint'),
            toggle: {
              checked: p.gradient.enabled,
              onChange: (enabled) => edit({ gradient: { enabled } }),
              label: tr('gradient.enable'),
            },
          },
          h(
            'div',
            { className: 'dst-grid' },
            h(ColorField, {
              label: tr('gradient.from'),
              value: p.gradient.from,
              onChange: (from) => edit({ gradient: { from } }),
            }),
            h(ColorField, {
              label: tr('gradient.to'),
              value: p.gradient.to,
              onChange: (to) => edit({ gradient: { to } }),
            }),
            h(Slider, {
              label: tr('gradient.angle'),
              value: p.gradient.angle,
              min: 0,
              max: 360,
              display: `${Math.round(p.gradient.angle)}°`,
              onChange: (angle) => edit({ gradient: { angle } }),
            }),
            h(Slider, {
              label: tr('gradient.opacity'),
              value: p.gradient.opacity,
              min: 0,
              max: 1,
              step: 0.01,
              display: `${Math.round(p.gradient.opacity * 100)}%`,
              onChange: (opacity) => edit({ gradient: { opacity } }),
            }),
          ),
        ),
        h(
          Card,
          {
            title: tr('glow.title'),
            hint: tr('glow.hint'),
            toggle: {
              checked: p.glow.enabled,
              onChange: (enabled) => edit({ glow: { enabled } }),
              label: tr('glow.enable'),
            },
          },
          h(
            'div',
            { className: 'dst-grid' },
            h(ColorField, {
              label: tr('glow.color'),
              value: p.glow.color,
              onChange: (color) => edit({ glow: { color } }),
            }),
            h(Slider, {
              label: tr('glow.opacity'),
              value: p.glow.opacity,
              min: 0,
              max: 1,
              step: 0.01,
              display: `${Math.round(p.glow.opacity * 100)}%`,
              onChange: (opacity) => edit({ glow: { opacity } }),
            }),
            h(Slider, {
              label: tr('glow.size'),
              value: p.glow.size,
              min: 10,
              max: 100,
              display: `${Math.round(p.glow.size)}%`,
              onChange: (size) => edit({ glow: { size } }),
            }),
            h(Slider, {
              label: tr('glow.x'),
              value: p.glow.x,
              min: 0,
              max: 100,
              display: `${Math.round(p.glow.x)}%`,
              onChange: (x) => edit({ glow: { x } }),
            }),
            h(Slider, {
              label: tr('glow.y'),
              value: p.glow.y,
              min: 0,
              max: 100,
              display: `${Math.round(p.glow.y)}%`,
              onChange: (y) => edit({ glow: { y } }),
            }),
          ),
        ),
        h(
          Card,
          {
            title: tr('veil.title'),
            hint: tr('veil.hint'),
            toggle: {
              checked: p.veil.enabled,
              onChange: (enabled) => edit({ veil: { enabled } }),
              label: tr('veil.enable'),
            },
          },
          h(
            'div',
            { className: 'dst-grid' },
            h(Slider, {
              label: tr('veil.opacity'),
              value: p.veil.opacity,
              min: 0,
              max: 1,
              step: 0.01,
              display: `${Math.round(p.veil.opacity * 100)}%`,
              onChange: (opacity) => edit({ veil: { opacity } }),
            }),
          ),
        ),
        h(
          Card,
          { title: tr('io.title'), hint: tr('io.hint') },
          h(
            'div',
            { className: 'dst-io-actions' },
            h(
              'button',
              { type: 'button', className: 'dst-reset', onClick: exportPrefs },
              tr('io.export'),
            ),
            h(
              'button',
              { type: 'button', className: 'dst-reset', onClick: openImport },
              tr('io.import'),
            ),
            h('input', {
              ref: importInput,
              type: 'file',
              accept: 'application/json,.json',
              className: 'dst-file-input',
              tabIndex: -1,
              'aria-hidden': 'true',
              onChange: importFile,
            }),
          ),
        ),
        h(
          Card,
          { title: tr('related.title'), hint: tr('related.hint') },
          h(
            'a',
            {
              className: 'dst-related-link',
              href: 'https://tabbiy.top/',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            tr('related.link'),
          ),
        ),
        h('div', { className: 'dst-footnote' }, tr('footnote')),
        saveOpen
          ? h(
              'div',
              {
                className: 'dst-modal-backdrop',
                onClick: (event) => {
                  if (event.target === event.currentTarget) setSaveOpen(false);
                },
              },
              h(
                'div',
                {
                  className: 'dst-modal',
                  role: 'dialog',
                  'aria-modal': 'true',
                  'aria-labelledby': 'dsh-panel-save-title',
                },
                h(
                  'h3',
                  { className: 'dst-modal-title', id: 'dsh-panel-save-title' },
                  tr('presets.saveTitle'),
                ),
                h(
                  'label',
                  { className: 'dst-modal-body', htmlFor: 'dsh-panel-save-name' },
                  tr('presets.name'),
                ),
                h('input', {
                  id: 'dsh-panel-save-name',
                  className: 'dst-modal-input',
                  value: saveName,
                  maxLength: 40,
                  autoFocus: true,
                  placeholder: tr('presets.namePlaceholder'),
                  onChange: (event) => setSaveName(event.target.value),
                  onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      savePreset();
                    }
                  },
                }),
                h(
                  'div',
                  { className: 'dst-modal-actions' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dst-modal-btn',
                      onClick: () => setSaveOpen(false),
                    },
                    tr('presets.cancel'),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dst-modal-btn dst-modal-btn-primary',
                      disabled: !saveName.trim(),
                      onClick: savePreset,
                    },
                    tr('presets.confirmSave'),
                  ),
                ),
              ),
            )
          : null,
        deleteTarget
          ? h(
              'div',
              {
                className: 'dst-modal-backdrop',
                onClick: (event) => {
                  if (event.target === event.currentTarget) setDeleteTarget(null);
                },
              },
              h(
                'div',
                {
                  className: 'dst-modal',
                  role: 'dialog',
                  'aria-modal': 'true',
                  'aria-labelledby': 'dsh-panel-delete-title',
                },
                h(
                  'h3',
                  { className: 'dst-modal-title', id: 'dsh-panel-delete-title' },
                  tr('presets.deleteTitle'),
                ),
                h(
                  'p',
                  { className: 'dst-modal-body' },
                  tr(deleteTarget.builtIn ? 'presets.deleteBuiltInBody' : 'presets.deleteBody'),
                ),
                h('div', { className: 'dst-modal-name' }, deletingName),
                h(
                  'div',
                  { className: 'dst-modal-actions' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dst-modal-btn',
                      autoFocus: true,
                      onClick: () => setDeleteTarget(null),
                    },
                    tr('presets.cancel'),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dst-modal-btn dst-modal-btn-danger',
                      onClick: confirmDelete,
                    },
                    tr('presets.deleteConfirm'),
                  ),
                ),
              ),
            )
          : null,
        importTarget
          ? h(
              'div',
              {
                className: 'dst-modal-backdrop',
                onClick: (event) => {
                  if (event.target === event.currentTarget) setImportTarget(null);
                },
              },
              h(
                'div',
                {
                  className: 'dst-modal',
                  role: 'dialog',
                  'aria-modal': 'true',
                  'aria-labelledby': 'dsh-panel-import-title',
                },
                h(
                  'h3',
                  { className: 'dst-modal-title', id: 'dsh-panel-import-title' },
                  tr('io.importTitle'),
                ),
                h('p', { className: 'dst-modal-body' }, tr('io.importBody')),
                h('div', { className: 'dst-modal-name' }, importTarget.name),
                h(
                  'div',
                  { className: 'dst-modal-actions' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dst-modal-btn',
                      autoFocus: true,
                      onClick: () => setImportTarget(null),
                    },
                    tr('presets.cancel'),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dst-modal-btn dst-modal-btn-primary',
                      onClick: confirmImport,
                    },
                    tr('io.importConfirm'),
                  ),
                ),
              ),
            )
          : null,
      );
    }

    function SectionIcon({ size = 16 }) {
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          'aria-hidden': 'true',
        },
        h('rect', {
          x: 3.25,
          y: 3.25,
          width: 17.5,
          height: 17.5,
          rx: 4,
          stroke: 'currentColor',
          strokeWidth: 1.5,
        }),
        h('rect', {
          x: 6.5,
          y: 6.5,
          width: 4.75,
          height: 11,
          rx: 1.5,
          fill: 'currentColor',
          fillOpacity: 0.16,
          stroke: 'currentColor',
          strokeWidth: 1.2,
        }),
        h('path', {
          d: 'M14.5 7.5h3M14.5 11h3M14.5 14.5h2',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        }),
      );
    }

    function apply(ctx) {
      const t = ctx.locale.bind(NS);
      ctx.effect(() => ctx.locale.register(NS, { en: EN, zh: ZH }), 'dsh-panel-theme: dictionaries');

      ctx.effect(() => {
        for (const legacy of document.querySelectorAll('style[data-dsh-sidebar-theme]')) legacy.remove();
        const backgroundTag = styleTag(BACKGROUND_STYLE_ATTR);
        const uiTag = styleTag(UI_STYLE_ATTR);
        uiTag.textContent = UI_CSS;
        const paint = () => {
          backgroundTag.textContent = buildCss(getPrefs());
        };
        paint();
        const unsubscribe = subscribePrefs(paint);
        const onStorage = (event) => {
          if (event.key !== STORAGE_KEY) return;
          prefs = loadPrefs();
          notifyPrefs();
        };
        window.addEventListener('storage', onStorage);
        return () => {
          unsubscribe();
          window.removeEventListener('storage', onStorage);
          backgroundTag.remove();
          uiTag.remove();
        };
      }, 'dsh-panel-theme: scoped background and page styles');

      ctx.slots.inject('settings.section', () =>
        ctx.slots.register(
          {
            name: 'settings.section',
            id: SECTION_ID,
            order: 60,
            label: () => t('nav'),
            locale: NS,
          },
          SidebarThemeSection,
        ),
      );

      ctx.slots.inject('settings.section.icon', () =>
        ctx.slots.register(
          {
            name: 'settings.section.icon',
            id: SECTION_ID,
          },
          SectionIcon,
        ),
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply,
    };
  },
});
