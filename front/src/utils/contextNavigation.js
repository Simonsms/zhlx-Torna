function appendUnique(items, item) {
  if (!item.label || items.some(existing => existing.label === item.label)) {
    return
  }
  items.push(item)
}

function getRouteTitle(route) {
  return route && route.meta ? route.meta.title : ''
}

export function createContextBreadcrumb({
  route = {},
  currentSpace = {},
  currentProject = {},
  translate = key => key
} = {}) {
  const items = []
  const routePath = route.path || ''
  const isDashboard = routePath === '/' || routePath === '/dashboard'

  appendUnique(items, {
    id: 'home',
    label: translate('home'),
    path: isDashboard ? '' : '/dashboard'
  })

  if (routePath.indexOf('/admin') === 0) {
    appendUnique(items, {
      id: 'admin',
      label: translate('adminManage'),
      path: routePath === '/admin/users' ? '' : '/admin/users'
    })
  } else if (routePath.indexOf('/user') === 0) {
    appendUnique(items, {
      id: 'user',
      label: translate('userCenter'),
      path: routePath === '/user' ? '' : '/user'
    })
  } else {
    const hasSpaceContext = routePath.indexOf('/space') === 0 ||
      routePath.indexOf('/project') === 0 ||
      routePath.indexOf('/doc') === 0
    const hasProjectContext = routePath.indexOf('/project') === 0 ||
      routePath.indexOf('/doc') === 0

    if (hasSpaceContext && currentSpace.id && currentSpace.name) {
      const spacePath = routePath.indexOf('/space/compose') === 0
        ? `/space/compose/${currentSpace.id}`
        : `/space/project/${currentSpace.id}`
      appendUnique(items, {
        id: 'space',
        label: currentSpace.name,
        path: routePath === spacePath ? '' : spacePath
      })
    }

    if (hasProjectContext && currentProject.id && currentProject.name) {
      const projectPath = `/project/doc/${currentProject.id}`
      appendUnique(items, {
        id: 'project',
        label: currentProject.name,
        path: routePath === projectPath ? '' : projectPath
      })
    }
  }

  if (!isDashboard) {
    appendUnique(items, {
      id: 'route',
      label: getRouteTitle(route),
      path: ''
    })
  }

  if (items.length) {
    items[items.length - 1].path = ''
  }
  return items
}
