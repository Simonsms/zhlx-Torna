# 迁移全部登录态布局到统一外壳

## 目标

将空间、项目、用户中心和管理员页面迁移到统一控制台外壳，消除登录态布局的视觉割裂，同时保留现有数据初始化与权限逻辑。

## 范围

- 迁移空间、项目、用户中心和管理员布局。
- 将各自侧栏内容接入统一外壳插槽。
- 保留空间/项目信息加载、标题设置、权限判断和现有路由。
- 明确隔离公开浏览、分享、聚合页面。

## 验收标准

- [ ] 首页、空间、项目、用户中心和管理员页面共享一致的外壳层级。
- [ ] 空间与项目上下文初始化结果与改造前一致。
- [ ] 普通成员无法看到原本无权访问的管理员入口。
- [ ] `/view`、`/share`、`/show` 页面未被迁移或改动。
- [ ] 相关单元测试、`npm run lint` 和 `npm run build:prod` 通过。

## 依赖

- `01-console-shell-foundation`

## 相关模块线索

- `front/src/layout/index_space.vue`
- `front/src/layout/index_project.vue`
- `front/src/layout/index_user.vue`
- `front/src/layout_admin/index.vue`
- `front/src/components/SpaceMenu`
- `front/src/components/ProjectMenu`
- `front/src/components/AdminMenu`
- `front/src/layout/components/UserCenterMenu.vue`

## 验证重点

分别以普通成员和管理员身份检查空间、项目和后台入口。验证路由参数变化时，当前空间和项目仍能正确刷新。
