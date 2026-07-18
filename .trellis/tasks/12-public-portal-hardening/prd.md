# 完成公开门户回归与视觉验收

## 目标

以自动测试、生产构建和真实浏览器验证收口公开门户第二阶段，并确认未影响登录态预览入口。

## 范围

- 回归公开分享、加密分享、聚合项目、禁用项目和空目录。
- 验证 HTTP、Dubbo、Markdown 和自定义文档。
- 检查 1440px、1024px 和窄屏布局。
- 验证搜索、目录、大纲、浏览器历史和键盘焦点。
- 回归 `/view` 原布局与 Tab。
- 记录验证命令、结果、警告和未验证项。

## 验收标准

- [ ] 所有依赖切片验收标准均满足。
- [ ] 定向 ESLint、完整 Jest 和生产构建通过。
- [ ] 真实后端主要路径人工验证通过。
- [ ] `/view` 无回归。
- [ ] 项目负责人人工视觉验收通过。

## 依赖

- `08-public-portal-home`
- `09-public-doc-navigation`
- `10-public-doc-reader`
- `11-public-portal-access-states`

## 相关模块线索

- `front/src/layout_public`
- `front/src/layout_share`
- `front/src/layout_show`
- `front/src/views/share`
- `front/src/views/show`
- `front/tests/unit`
