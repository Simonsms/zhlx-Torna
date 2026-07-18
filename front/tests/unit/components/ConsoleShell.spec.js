import { shallowMount } from '@vue/test-utils'
import ConsoleShell from '@/layout/components/ConsoleShell.vue'

describe('ConsoleShell.vue', () => {
  const createWrapper = propsData => shallowMount(ConsoleShell, {
    propsData,
    slots: {
      brand: '<div class="brand-slot">brand</div>',
      topbar: '<div class="topbar-slot">topbar</div>',
      sidebar: '<div class="sidebar-slot">sidebar</div>',
      default: '<div class="content-slot">content</div>'
    }
  })

  it('renders the console regions', () => {
    const wrapper = createWrapper({ sidebarOpen: true })

    expect(wrapper.find('.brand-slot').exists()).toBe(true)
    expect(wrapper.find('.topbar-slot').exists()).toBe(true)
    expect(wrapper.find('.sidebar-slot').exists()).toBe(true)
    expect(wrapper.find('.content-slot').exists()).toBe(true)
    expect(wrapper.classes()).not.toContain('console-shell--collapsed')
  })

  it('emits sidebar actions', () => {
    const wrapper = createWrapper({ sidebarOpen: true, mobile: true })

    wrapper.find('.console-shell__sidebar-toggle').trigger('click')
    wrapper.find('.console-shell__mask').trigger('click')

    expect(wrapper.emitted('toggle-sidebar')).toHaveLength(1)
    expect(wrapper.emitted('close-sidebar')).toHaveLength(1)
  })

  it('reflects collapsed and animation states', () => {
    const wrapper = createWrapper({
      sidebarOpen: false,
      withoutAnimation: true
    })

    expect(wrapper.classes()).toContain('console-shell--collapsed')
    expect(wrapper.classes()).toContain('console-shell--without-animation')
    expect(wrapper.find('.console-shell__mask').exists()).toBe(false)
  })
})
