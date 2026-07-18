# 统一门户访问校验与异常状态

## 目标

让密码访问、禁用、无数据和异常反馈符合公开门户视觉，同时保持全部访问规则和接口行为不变。

## 范围

- 建立统一密码访问卡片和状态页。
- 保留分享名称、显示密码、提交和校验行为。
- 处理加载、空目录、禁用、不存在和请求失败。
- 确保窄屏和键盘访问可用。

## 验收标准

- [ ] 公开和加密访问判断与现状一致。
- [ ] 密码摘要、接口参数和本地授权键不变。
- [ ] 加载、空数据和失败状态可以明确区分。
- [ ] 禁用聚合项目具有完整状态页。
- [ ] 相关测试、ESLint 和生产构建通过。

## 依赖

- `07-public-portal-foundation`

## 相关模块线索

- `front/src/layout_public/components/PublicPortalAccess.vue`
- `front/src/layout_public/components/PublicPortalState.vue`
- `front/src/layout_share/index.vue`
- `front/src/layout_show/index.vue`
