# 建立统一公开文档门户外壳

## 目标

在不改变分享与聚合业务接口的前提下，建立可复用的匿名公开门户外壳，并让两种模式完成第一条可运行链路。

## 范围

- 定义门户展示模型和集中视觉变量。
- 建立品牌顶部栏、可收敛侧栏、正文区和移动端遮罩。
- 将分享与聚合布局接入统一门户外壳。
- 从 `/share`、`/show` 移除 `TabsRouter`，不修改 `/view`。
- 保留现有密码校验、启停判断和详情路由。

## 验收标准

- [ ] `/share/:id/:docId` 和 `/show/:id/:docId` 均能通过新外壳展示原文档内容。
- [ ] `/share`、`/show` 不再显示多文档 Tab。
- [ ] `/view` 的布局与 Tab 行为无变化。
- [ ] 顶部品牌、语言入口、侧栏折叠和窄屏遮罩可用。
- [ ] 相关测试、ESLint 和生产构建通过。

## 依赖

无，可立即开始。

## 相关模块线索

- `front/src/layout_public`
- `front/src/layout_share/index.vue`
- `front/src/layout_show/index.vue`
- `front/src/styles/variables.scss`
- `front/tests/unit/components`
