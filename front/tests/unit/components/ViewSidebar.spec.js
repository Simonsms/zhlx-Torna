import { shallowMount } from '@vue/test-utils'
import Sidebar from '@/layout_view/components/Sidebar/index.vue'

describe('view Sidebar.vue', () => {
  const setAttr = jest.fn()
  const DocSelectStub = {
    name: 'DocSelectStub',
    methods: {
      onTriggerStatus: jest.fn()
    },
    template: '<div class="doc-select-stub" />'
  }

  const createWrapper = () => shallowMount(Sidebar, {
    mocks: {
      $t: key => key,
      $store: {
        getters: {
          sidebarView: { opened: true }
        },
        state: {
          settings: {
            sidebarLogo: true,
            docViewTabSwitch: true
          }
        }
      },
      getEnums: () => ({
        FOLDER_TYPE: {
          TYPE_DOC: 3
        }
      }),
      getAttr: key => key.indexOf('dimension') > -1 ? '2' : 'false',
      setAttr
    },
    stubs: {
      DocSelect: DocSelectStub,
      DocSelectV2: DocSelectStub,
      ElRadioButton: { template: '<button><slot /></button>' },
      ElRadioGroup: { template: '<div><slot /></div>' },
      ElScrollbar: { template: '<div><slot /></div>' },
      Logo: true
    }
  })

  beforeEach(() => {
    setAttr.mockClear()
  })

  it('renders the modern directory controls without changing the default scope', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.side-opt-bar__heading').text()).toContain('viewDocumentDirectory')
    expect(wrapper.find('.side-opt-bar__dimension').exists()).toBe(true)
    expect(wrapper.find('.side-opt-bar__tree-actions').exists()).toBe(true)
    expect(wrapper.vm.dimension).toBe(2)
  })

  it('persists dimension changes using the existing storage key', () => {
    const wrapper = createWrapper()

    wrapper.vm.onDimensionChange(1)

    expect(setAttr).toHaveBeenCalledWith('torna.doc.view.dimension', 1)
  })
})
