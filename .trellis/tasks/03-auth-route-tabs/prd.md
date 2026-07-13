# 实现登录态路由工作 Tab

## 目标

让登录后控制台具备清晰的路由访问记录和多任务切换入口，同时保持现有 Vue Router 页面生命周期。

## 范围

- 为登录态路由定义稳定的 Tab 身份和标题来源。
- 首页固定不可关闭，其他工作页面按访问新增或复用。
- 支持关闭当前、左侧、右侧、其他和全部可关闭 Tab。
- 隔离登录态 Tab 与公开文档端现有 Tab 状态。
- 不使用 `keep-alive`，不恢复刷新前状态。

## 验收标准

- [ ] 首页 Tab 始终存在且不可关闭。
- [ ] 同一路由资源不会重复创建多个 Tab。
- [ ] 不同项目或资源参数能够生成不同 Tab。
- [ ] 关闭当前 Tab 后进入左邻、右邻或首页，且不会进入无效路由。
- [ ] 所有切换仍通过 Vue Router，业务页面重新加载行为与当前一致。
- [ ] Tab 状态单元测试覆盖核心增删与回退规则。

## 依赖

- `02-auth-layout-migration`

## 相关模块线索

- `front/src/router/index.js`
- `front/src/store/modules/tabsRouter.js`
- `front/src/components/TabsRouter/index.vue`
- `front/src/layout/components/AppMain.vue`
- `front/src/store/index.js`

## 验证重点

重点覆盖路由参数、必要查询参数、重复访问、关闭活动项和权限变化场景。禁止直接修改 Vuex state，禁止把公开文档端允许路径硬编码扩展为登录态方案。
