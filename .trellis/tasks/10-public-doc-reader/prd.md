# 建立现代文档阅读与页内目录

## 目标

在保留现有文档业务组件的前提下，建立内容优先的阅读布局，并为主要文档类型提供前端页内目录。

## 范围

- 建立正文最大宽度、章节间距、代码块和参数表视觉。
- HTTP、Dubbo 文档使用稳定章节标识。
- Markdown 和富文本从渲染结果提取标题。
- 提供右侧粘性大纲、活动章节和点击滚动。
- 窄屏自动收敛为正文单栏。

## 验收标准

- [ ] HTTP、Dubbo、自定义和 Markdown 文档正文可正常展示。
- [ ] 桌面端右侧大纲与当前正文同步。
- [ ] 点击大纲能平滑滚动到稳定章节。
- [ ] 参数表、代码示例、复制和调试行为无回归。
- [ ] 窄屏下正文无关键内容遮挡。

## 依赖

- `07-public-portal-foundation`
- `09-public-doc-navigation`

## 相关模块线索

- `front/src/layout_public/components/PublicDocumentReader.vue`
- `front/src/layout_public/components/PublicDocumentOutline.vue`
- `front/src/utils/documentOutline.js`
- `front/src/components/DocView/index.vue`
- `front/src/components/DubboView/index.vue`
- `front/src/components/DocViewCustom/index.vue`
