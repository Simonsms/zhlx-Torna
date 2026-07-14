import { shallowMount } from '@vue/test-utils'
import DocView from '@/components/DocView/index.vue'
import DocViewCustom from '@/components/DocViewCustom/index.vue'

jest.mock('@/components/DocDiff', () => ({
  name: 'DocDiff',
  render: h => h('div')
}))

jest.mock('@/components/CodeGenDrawer', () => ({
  name: 'CodeGenDrawer',
  render: h => h('div')
}))

jest.mock('@/components/ParameterTable', () => ({
  name: 'ParameterTable',
  render: h => h('div')
}))

jest.mock('@/components/DocChangelogDrawer', () => ({
  name: 'DocChangelogDrawer',
  render: h => h('div')
}))

jest.mock('@/components/ConstView', () => ({
  name: 'ConstView',
  render: h => h('div')
}))

jest.mock('@/components/DocStatusTag', () => ({
  name: 'DocStatusTag',
  render: h => h('div')
}))

jest.mock('@/components/HttpMethod', () => ({
  name: 'HttpMethod',
  render: h => h('span')
}))

jest.mock('@/components/CopyText', () => ({
  name: 'CopyText',
  render: h => h('span')
}))

const isHidden = wrapper => (wrapper.attributes('style') || '').includes('display: none')

const elementStubs = {
  ElAlert: true,
  ElButton: true,
  ElDialog: true,
  ElDivider: true,
  ElDropdown: true,
  ElDropdownItem: true,
  ElDropdownMenu: true,
  ElInput: true,
  ElLink: true,
  ElPopover: true,
  ElTag: true,
  ElTooltip: true
}

const createStandardWrapper = ({ isSuperAdmin, showOptBar }) => shallowMount(DocView, {
  propsData: {
    showOptBar,
    initSubscribe: false
  },
  mocks: {
    $t: key => key,
    $store: {
      state: {
        settings: {}
      }
    },
    isSuperAdmin: () => isSuperAdmin,
    pmsConfig: () => Promise.resolve({}),
    formatJson: value => value,
    handleCommand: () => {}
  },
  stubs: elementStubs
})

const createCustomWrapper = ({ isSuperAdmin, showOptBar }) => shallowMount(DocViewCustom, {
  propsData: {
    docInfo: {
      id: 'doc-1',
      type: 2,
      description: ''
    },
    showOptBar,
    initSubscribe: false
  },
  mocks: {
    $t: key => key,
    isSuperAdmin: () => isSuperAdmin,
    handleCommand: () => {},
    getEnums: () => ({
      DOC_TYPE: {
        CUSTOM: 1,
        MARKDOWN: 2
      }
    })
  },
  stubs: elementStubs
})

const componentFactories = [
  ['standard document', createStandardWrapper],
  ['custom document', createCustomWrapper]
]

describe.each(componentFactories)('%s administrator actions', (name, createWrapper) => {
  it('shows history and export to a super administrator in browse mode', () => {
    const wrapper = createWrapper({ isSuperAdmin: 1, showOptBar: false })

    expect(isHidden(wrapper.find('.show-opt-bar'))).toBe(false)
    expect(isHidden(wrapper.find('[data-testid="document-history-action"]'))).toBe(false)
    expect(isHidden(wrapper.find('[data-testid="document-export-action"]'))).toBe(false)
    expect(isHidden(wrapper.find('[data-testid="document-const-action"]'))).toBe(true)
  })

  it('hides administrator actions from other users in browse mode', () => {
    const wrapper = createWrapper({ isSuperAdmin: 0, showOptBar: false })

    expect(isHidden(wrapper.find('.show-opt-bar'))).toBe(true)
  })

  it('preserves all existing actions in management mode', () => {
    const wrapper = createWrapper({ isSuperAdmin: 0, showOptBar: true })

    expect(isHidden(wrapper.find('.show-opt-bar'))).toBe(false)
    expect(isHidden(wrapper.find('[data-testid="document-history-action"]'))).toBe(false)
    expect(isHidden(wrapper.find('[data-testid="document-export-action"]'))).toBe(false)
    expect(isHidden(wrapper.find('[data-testid="document-const-action"]'))).toBe(false)
  })
})

describe('standard document administrator-only actions', () => {
  it('keeps code generation hidden from a super administrator in browse mode', () => {
    const wrapper = createStandardWrapper({ isSuperAdmin: 1, showOptBar: false })

    expect(isHidden(wrapper.find('[data-testid="document-codegen-action"]'))).toBe(true)
  })
})
