import { shallowMount } from '@vue/test-utils'
import PublicPortalShell from '@/layout_public/components/PublicPortalShell.vue'

describe('PublicPortalShell.vue', () => {
  const createWrapper = propsData => shallowMount(PublicPortalShell, {
    propsData: Object.assign({
      homePath: '/share/share-id',
      portalTitle: '开放平台文档'
    }, propsData),
    stubs: {
      RouterLink: {
        props: ['to'],
        template: '<a><slot /></a>'
      }
    },
    slots: {
      topbar: '<div class="topbar-slot">topbar</div>',
      sidebar: '<div class="sidebar-slot">sidebar</div>',
      default: '<div class="content-slot">content</div>'
    }
  })

  it('renders the public portal regions', () => {
    const wrapper = createWrapper({ sidebarOpen: true })

    expect(wrapper.find('.public-portal-shell__brand-name').text()).toBe('文档协作站')
    expect(wrapper.find('.public-portal-shell__portal-title').text()).toBe('开放平台文档')
    expect(wrapper.find('.topbar-slot').exists()).toBe(true)
    expect(wrapper.find('.sidebar-slot').exists()).toBe(true)
    expect(wrapper.find('.content-slot').exists()).toBe(true)
    expect(wrapper.classes()).not.toContain('public-portal-shell--collapsed')
  })

  it('reflects collapsed and mobile states', () => {
    const wrapper = createWrapper({
      sidebarOpen: false,
      mobile: true,
      withoutAnimation: true
    })

    expect(wrapper.classes()).toContain('public-portal-shell--collapsed')
    expect(wrapper.classes()).toContain('public-portal-shell--mobile')
    expect(wrapper.classes()).toContain('public-portal-shell--without-animation')
    expect(wrapper.find('.public-portal-shell__mask').exists()).toBe(false)
  })

  it('emits close when the mobile mask is clicked', () => {
    const wrapper = createWrapper({ sidebarOpen: true, mobile: true })

    wrapper.find('.public-portal-shell__mask').trigger('click')

    expect(wrapper.emitted('close-sidebar')).toHaveLength(1)
  })
})
