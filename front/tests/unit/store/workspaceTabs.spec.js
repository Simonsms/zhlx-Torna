import workspaceTabs, {
  WORKSPACE_HOME_KEY,
  createWorkspaceTabKey,
  createWorkspaceTabsState
} from '@/store/modules/workspaceTabs'

const createRoute = ({
  name,
  path,
  fullPath = path,
  params = {},
  query = {},
  title = name
}) => ({
  name,
  path,
  fullPath,
  params,
  query,
  meta: { title }
})

describe('workspaceTabs store', () => {
  it('creates a stable key from route name and sorted params', () => {
    const route = createRoute({
      name: 'ProjectInfo',
      path: '/project/info/p1',
      params: { projectId: 'p1', spaceId: 's1' }
    })

    expect(createWorkspaceTabKey(route)).toBe('ProjectInfo?projectId=p1&spaceId=s1')
  })

  it('reuses the same route tab and keeps the latest full path', () => {
    const state = createWorkspaceTabsState()
    const route = createRoute({
      name: 'SpaceProject',
      path: '/space/project/s1',
      fullPath: '/space/project/s1?page=1',
      params: { spaceId: 's1' }
    })

    workspaceTabs.mutations.OPEN_ROUTE(state, route)
    workspaceTabs.mutations.OPEN_ROUTE(state, {
      ...route,
      fullPath: '/space/project/s1?page=2'
    })

    expect(state.tabs).toHaveLength(2)
    expect(state.tabs[1].fullPath).toBe('/space/project/s1?page=2')
  })

  it('moves to an adjacent tab when the active tab closes', () => {
    const state = createWorkspaceTabsState()
    const firstRoute = createRoute({ name: 'UserInfo', path: '/user' })
    const secondRoute = createRoute({ name: 'Message', path: '/user/message' })

    workspaceTabs.mutations.OPEN_ROUTE(state, firstRoute)
    workspaceTabs.mutations.OPEN_ROUTE(state, secondRoute)
    workspaceTabs.mutations.CLOSE_TAB(state, createWorkspaceTabKey(secondRoute))

    expect(state.activeKey).toBe(createWorkspaceTabKey(firstRoute))
  })

  it('keeps the pinned home tab when closing tabs on either side', () => {
    const state = createWorkspaceTabsState()
    const firstRoute = createRoute({ name: 'UserInfo', path: '/user' })
    const secondRoute = createRoute({ name: 'Message', path: '/user/message' })

    workspaceTabs.mutations.OPEN_ROUTE(state, firstRoute)
    workspaceTabs.mutations.OPEN_ROUTE(state, secondRoute)
    workspaceTabs.mutations.CLOSE_LEFT(state, createWorkspaceTabKey(secondRoute))

    expect(state.tabs.map(tab => tab.key)).toEqual([
      WORKSPACE_HOME_KEY,
      createWorkspaceTabKey(secondRoute)
    ])
  })

  it('closes every closable tab and activates home', () => {
    const state = createWorkspaceTabsState()
    workspaceTabs.mutations.OPEN_ROUTE(state, createRoute({ name: 'UserInfo', path: '/user' }))

    workspaceTabs.mutations.CLOSE_ALL(state)

    expect(state.tabs).toHaveLength(1)
    expect(state.tabs[0].closable).toBe(false)
    expect(state.activeKey).toBe(WORKSPACE_HOME_KEY)
  })
})
