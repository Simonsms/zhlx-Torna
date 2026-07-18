# 统一公开文档目录导航体验

## 目标

以统一导航组件承载分享和聚合目录，使外部访问者在两种入口获得一致的搜索、层级、选中和窄屏体验。

## 范围

- 使用统一门户节点渲染文档树。
- 展示文件夹、文档、HTTP 方法和当前选中状态。
- 支持名称、URL、方法搜索和展开折叠。
- 增加明确的门户首页入口。
- 窄屏下使用抽屉导航并在选择后收起。

## 验收标准

- [ ] 分享与聚合目录视觉和交互一致。
- [ ] 两种原始数据结构都能正确适配且不被原地修改。
- [ ] 当前路由对应文档具有明确选中态。
- [ ] 搜索、展开折叠和窄屏导航可用。
- [ ] 原路由与接口契约保持不变。

## 依赖

- `07-public-portal-foundation`
- `08-public-portal-home`

## 相关模块线索

- `front/src/layout_public/components/PublicPortalNavigation.vue`
- `front/src/utils/publicPortal.js`
- `front/src/layout_share/components/Sidebar`
- `front/src/layout_show/components/Sidebar`
