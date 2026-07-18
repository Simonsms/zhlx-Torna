# 建立统一控制台外壳样板

## 目标

在不改变首页业务逻辑的前提下，建立可复用的登录后控制台外壳，并用首页完成第一条可演示链路。

## 范围

- 集中定义第一阶段所需的颜色、字号、间距、边框、阴影和布局尺寸。
- 建立顶部导航、左侧导航、工作区头部和正文插槽组成的控制台外壳。
- 只迁移登录后首页，保留现有 HomeMenu、Navbar 和 AppMain 的业务行为。
- 提供桌面和窄屏两种可访问状态。

## 验收标准

- [ ] 首页显示统一顶部栏、左侧导航和右侧内容层级。
- [ ] 首页原有接口、权限、链接和用户菜单行为不变。
- [ ] 新增布局常量来自集中视觉变量。
- [ ] 1024px 宽度下核心导航和内容仍可访问。
- [ ] 相关单元测试、`npm run lint` 和 `npm run build:prod` 通过。

## 依赖

无，可立即开始。

## 相关模块线索

- `front/src/layout/index.vue`
- `front/src/layout/components`
- `front/src/components/HomeMenu`
- `front/src/styles/index.scss`
- `front/src/styles/variables.scss`
- `front/src/store/modules/app.js`

## 验证重点

使用 Node 12 安装和构建。手工对比改造前后的首页路由、用户菜单、帮助入口和权限入口，确认仅外壳与视觉发生变化。
