# 提供公开门户首页与当前集合搜索

## 目标

让分享和聚合根地址成为可独立展示的文档门户首页，并通过现有目录数据完成分类浏览和搜索。

## 范围

- 根路由展示品牌、集合名称、说明、统计和快速开始。
- 将分享目录和聚合目录转换为统一门户导航节点。
- 基于统一节点生成分类卡片和搜索结果。
- 点击文档后使用现有详情路由。
- 提供空目录和无说明时的稳定展示。

## 验收标准

- [ ] `/share/:id` 不再自动跳转首篇文档。
- [ ] `/show/:id` 不再显示空白内容区。
- [ ] 首页可以按名称、URL 和请求方法搜索当前集合。
- [ ] 分类卡片和搜索结果可以打开正确文档。
- [ ] 不新增后端接口或门户配置数据。

## 依赖

- `07-public-portal-foundation`

## 相关模块线索

- `front/src/layout_public/components/PublicPortalHome.vue`
- `front/src/utils/publicPortal.js`
- `front/src/layout_share/components/Sidebar/index.vue`
- `front/src/layout_show/components/Sidebar/index.vue`
