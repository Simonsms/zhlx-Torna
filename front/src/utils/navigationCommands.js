const PROJECT_MANAGEMENT_ROLES = ['admin', 'dev']

const COMMAND_DEFINITIONS = [
  {
    id: 'dashboard',
    titleKey: 'home',
    keywords: ['首页', '空间', 'home', 'dashboard'],
    icon: 'el-icon-house',
    resolvePath: () => '/dashboard'
  },
  {
    id: 'space-projects',
    titleKey: 'projectList',
    keywords: ['空间', '项目列表', 'space', 'project'],
    icon: 'el-icon-s-grid',
    requires: 'space',
    resolvePath: context => `/space/project/${context.spaceId}`
  },
  {
    id: 'space-info',
    titleKey: 'spaceInfo',
    keywords: ['空间信息', 'space info'],
    icon: 'el-icon-info',
    requires: 'space',
    resolvePath: context => `/space/info/${context.spaceId}`
  },
  {
    id: 'space-members',
    titleKey: 'spaceMember',
    keywords: ['空间成员', 'space member'],
    icon: 'el-icon-user',
    requires: 'space',
    resolvePath: context => `/space/member/${context.spaceId}`
  },
  {
    id: 'project-docs',
    titleKey: 'applicationManagement',
    keywords: ['项目文档', '应用管理', 'api', 'document'],
    icon: 'el-icon-box',
    requires: 'project',
    resolvePath: context => `/project/doc/${context.projectId}`
  },
  {
    id: 'project-info',
    titleKey: 'projectInfo',
    keywords: ['项目信息', 'project info'],
    icon: 'el-icon-info',
    requires: 'project',
    resolvePath: context => `/project/info/${context.projectId}`
  },
  {
    id: 'project-members',
    titleKey: 'projectMember',
    keywords: ['项目成员', 'project member'],
    icon: 'el-icon-user',
    requires: 'project',
    resolvePath: context => `/project/member/${context.projectId}`
  },
  {
    id: 'project-constants',
    titleKey: 'constManager',
    keywords: ['常量管理', '错误码', '字典', 'constant'],
    icon: 'el-icon-collection',
    requires: 'projectManagement',
    resolvePath: context => `/project/code/${context.projectId}`
  },
  {
    id: 'project-releases',
    titleKey: 'releaseManager',
    keywords: ['发布管理', '版本', 'release'],
    icon: 'el-icon-s-release',
    requires: 'project',
    resolvePath: context => `/project/release/${context.projectId}`
  },
  {
    id: 'user-center',
    titleKey: 'userCenter',
    keywords: ['用户中心', '账号', 'profile'],
    icon: 'el-icon-user',
    resolvePath: () => '/user'
  },
  {
    id: 'messages',
    titleKey: 'myMessage',
    keywords: ['消息', '通知', 'message'],
    icon: 'el-icon-bell',
    resolvePath: () => '/user/message'
  },
  {
    id: 'system-preferences',
    titleKey: 'systemSetting',
    keywords: ['系统设置', '偏好', 'language', 'setting'],
    icon: 'el-icon-setting',
    resolvePath: () => '/user/systemSetting'
  },
  {
    id: 'admin-users',
    titleKey: 'userManagement',
    keywords: ['后台', '用户管理', 'admin user'],
    icon: 'el-icon-user',
    requires: 'superAdmin',
    resolvePath: () => '/admin/users'
  },
  {
    id: 'admin-templates',
    titleKey: 'templateSetting',
    keywords: ['后台', '模板设置', 'template'],
    icon: 'el-icon-tickets',
    requires: 'superAdmin',
    resolvePath: () => '/admin/template'
  },
  {
    id: 'admin-settings',
    titleKey: 'systemSetting',
    keywords: ['后台', '系统设置', 'admin setting'],
    icon: 'el-icon-setting',
    requires: 'superAdmin',
    resolvePath: () => '/admin/setting'
  }
]

function hasProjectManagementRole(context) {
  if (context.isSuperAdmin || !context.projectId) {
    return context.isSuperAdmin
  }
  const roleData = context.roleData || {}
  const projectRole = roleData[`project:${context.projectId}`]
  return PROJECT_MANAGEMENT_ROLES.indexOf(projectRole) !== -1
}

function isCommandVisible(command, context) {
  const visibilityRules = {
    space: () => Boolean(context.spaceId),
    project: () => Boolean(context.projectId),
    projectManagement: () => Boolean(context.projectId) && hasProjectManagementRole(context),
    superAdmin: () => Boolean(context.isSuperAdmin)
  }
  const visibilityRule = visibilityRules[command.requires]
  return visibilityRule ? visibilityRule() : true
}

export function createNavigationCommands(context = {}) {
  return COMMAND_DEFINITIONS
    .filter(command => isCommandVisible(command, context))
    .map(command => ({
      id: command.id,
      titleKey: command.titleKey,
      keywords: command.keywords,
      icon: command.icon,
      path: command.resolvePath(context)
    }))
}

export function filterNavigationCommands(commands, query) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) {
    return commands
  }

  return commands.filter(command => {
    const searchableText = [command.title, ...(command.keywords || [])]
      .join(' ')
      .toLowerCase()
    return searchableText.indexOf(normalizedQuery) !== -1
  })
}
