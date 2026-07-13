export const WORKSPACE_HOME_PATH = '/dashboard'
export const WORKSPACE_HOME_KEY = 'Dashboard'

export const WORKSPACE_HOME_TAB = {
  key: WORKSPACE_HOME_KEY,
  title: '首页',
  fullPath: WORKSPACE_HOME_PATH,
  closable: false
}

export function createWorkspaceTabsState() {
  return {
    tabs: [{ ...WORKSPACE_HOME_TAB }],
    activeKey: WORKSPACE_HOME_KEY
  }
}

export function createWorkspaceTabKey(route) {
  const identity = route.name || route.path
  const params = route.params || {}
  const paramIdentity = Object.keys(params)
    .sort()
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')

  return paramIdentity ? `${identity}?${paramIdentity}` : identity
}

export function createWorkspaceTab(route) {
  const key = createWorkspaceTabKey(route)
  const meta = route.meta || {}

  return {
    key,
    title: meta.title || route.name || route.path,
    fullPath: route.fullPath || route.path,
    closable: route.path !== WORKSPACE_HOME_PATH
  }
}

function getActiveTab(state) {
  return state.tabs.find(tab => tab.key === state.activeKey) || state.tabs[0]
}

const mutations = {
  OPEN_ROUTE(state, route) {
    const nextTab = createWorkspaceTab(route)
    const existingIndex = state.tabs.findIndex(tab => tab.key === nextTab.key)

    if (existingIndex === -1) {
      state.tabs.push(nextTab)
    } else {
      state.tabs.splice(existingIndex, 1, {
        ...state.tabs[existingIndex],
        ...nextTab
      })
    }
    state.activeKey = nextTab.key
  },
  CLOSE_TAB(state, key) {
    const index = state.tabs.findIndex(tab => tab.key === key)
    if (index === -1 || !state.tabs[index].closable) {
      return
    }

    const closingActiveTab = state.activeKey === key
    state.tabs.splice(index, 1)
    if (closingActiveTab) {
      const nextIndex = Math.min(index, state.tabs.length - 1)
      state.activeKey = state.tabs[nextIndex].key
    }
  },
  CLOSE_OTHERS(state, key) {
    const target = state.tabs.find(tab => tab.key === key)
    if (!target) {
      return
    }

    state.tabs = state.tabs.filter(tab => !tab.closable || tab.key === key)
    state.activeKey = target.key
  },
  CLOSE_LEFT(state, key) {
    const targetIndex = state.tabs.findIndex(tab => tab.key === key)
    if (targetIndex === -1) {
      return
    }

    state.tabs = state.tabs.filter((tab, index) => !tab.closable || index >= targetIndex)
  },
  CLOSE_RIGHT(state, key) {
    const targetIndex = state.tabs.findIndex(tab => tab.key === key)
    if (targetIndex === -1) {
      return
    }

    state.tabs = state.tabs.filter((tab, index) => !tab.closable || index <= targetIndex)
  },
  CLOSE_ALL(state) {
    state.tabs = [{ ...WORKSPACE_HOME_TAB }]
    state.activeKey = WORKSPACE_HOME_KEY
  }
}

const actions = {
  openRoute({ commit }, route) {
    commit('OPEN_ROUTE', route)
  },
  closeTab({ commit, state }, key) {
    commit('CLOSE_TAB', key)
    return getActiveTab(state)
  },
  closeOthers({ commit, state }, key) {
    commit('CLOSE_OTHERS', key)
    return getActiveTab(state)
  },
  closeLeft({ commit, state }, key) {
    commit('CLOSE_LEFT', key)
    return getActiveTab(state)
  },
  closeRight({ commit, state }, key) {
    commit('CLOSE_RIGHT', key)
    return getActiveTab(state)
  },
  closeAll({ commit, state }) {
    commit('CLOSE_ALL')
    return getActiveTab(state)
  }
}

export default {
  namespaced: true,
  state: createWorkspaceTabsState(),
  mutations,
  actions
}
