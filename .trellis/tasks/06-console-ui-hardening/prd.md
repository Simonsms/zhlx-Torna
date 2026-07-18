# 完成控制台 UI 兼容性与回归收口

## 目标

对第一阶段控制台外壳进行一致性、响应式、可访问性和回归收口，并通过人工视觉验收决定是否合并。

## 范围

- 统一顶部栏、侧栏、Tab、面包屑和内容区的交互状态。
- 检查常规桌面、笔记本和窄屏状态。
- 检查键盘焦点、搜索快捷键、菜单收敛和 Tab 操作。
- 回归首页、空间、项目、用户中心、管理员及公开文档端。
- 在 Node 12 下执行完整前端质量门禁。

## 验收标准

- [ ] 视觉变量应用一致，无新增散落魔法数字和大面积覆盖规则。
- [ ] 悬停、焦点、选中、禁用和加载状态清晰可辨。
- [ ] 1440px、1280px、1024px 宽度下无关键功能遮挡。
- [ ] 普通成员和管理员主要导航路径回归通过。
- [ ] `/view`、`/share`、`/show` 页面没有第一阶段引入的回归。
- [ ] Node 12 下 `npm run lint`、相关 Jest 测试和 `npm run build:prod` 通过。
- [ ] 人工视觉验收通过后才允许合并。

## 依赖

- `03-auth-route-tabs`
- `04-command-navigation-search`
- `05-context-breadcrumb-quick-nav`

## 相关模块线索

- `front/src/styles`
- `front/src/layout`
- `front/src/layout_admin`
- `front/src/components`
- `front/tests/unit`
- `front/package.json`
- `front/.nvmrc`

## 验证重点

该任务为 HITL：自动检查全部通过后，仍需产品或项目负责人对真实页面截图和交互路径进行人工视觉验收。
