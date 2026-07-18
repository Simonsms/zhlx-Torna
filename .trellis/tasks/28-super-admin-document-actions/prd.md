# 超级管理员浏览文档操作入口

## Parent

`docs/prd/super-admin-document-actions.md`

## 目标

让超级管理员在浏览模式下能够查看文档变更历史并下载文档，同时保持普通用户与其他操作入口的现有行为。

## 范围

- 标准接口文档显示权限控制。
- 自定义与 Markdown 文档显示权限控制。
- 超级管理员、普通用户和管理模式组件测试。

## 验收标准

- [ ] `isSuperAdmin === 1` 且 `showOptBar === false` 时显示变更历史和下载入口。
- [ ] 非超级管理员且 `showOptBar === false` 时不显示这两个入口。
- [ ] `showOptBar === true` 时保持原有显示行为。
- [ ] 代码生成、常量查看等其他入口不因超级管理员身份额外显示。
- [ ] 标准接口文档和自定义/Markdown 文档行为一致。
- [ ] 定向单元测试和 ESLint 通过。

## 依赖

无，可立即执行。

## 相关模块线索

- `front/src/components/DocView/index.vue`
- `front/src/components/DocViewCustom/index.vue`
- `front/tests/unit/components`
