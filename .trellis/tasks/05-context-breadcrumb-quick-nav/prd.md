# 统一上下文面包屑与快捷导航

## 目标

让用户能够稳定理解当前空间、项目和功能层级，并从顶部快速进入现有高频页面。

## 范围

- 统一登录态面包屑的层级、标题和跳转规则。
- 复用当前空间、当前项目、路由元数据和已有资源标题。
- 提供首页、当前空间项目列表、当前项目文档、成员、常量、发布和管理员等导航型快捷入口。
- 所有入口遵循现有上下文与权限。

## 验收标准

- [ ] 首页、空间、项目和管理员页面显示正确面包屑。
- [ ] 当前空间和项目名称来自已有状态，不产生额外后端请求。
- [ ] 无权限入口不显示，缺少上下文的入口不可用或不显示。
- [ ] 快捷入口只导航到现有路由，不直接触发业务操作。
- [ ] 导航结果进入正确工作 Tab。
- [ ] Breadcrumb 相关单元测试覆盖主要场景。

## 依赖

- `02-auth-layout-migration`
- `03-auth-route-tabs`

## 相关模块线索

- `front/src/components/Breadcrumb/index.vue`
- `front/src/layout/components/Navbar.vue`
- `front/src/store/modules/settings.js`
- `front/src/router/index.js`
- `front/tests/unit/components/Breadcrumb.spec.js`

## 验证重点

监控网络请求，确认面包屑和快捷入口没有新增上下文查询。分别验证普通成员和管理员的入口差异。
