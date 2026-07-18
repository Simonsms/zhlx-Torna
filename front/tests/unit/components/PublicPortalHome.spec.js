import { shallowMount } from '@vue/test-utils'
import PublicPortalHome from '@/layout_public/components/PublicPortalHome.vue'

describe('PublicPortalHome.vue', () => {
  const nodes = [{
    key: 'folder-1',
    name: '用户中心',
    isFolder: true,
    children: [{
      key: 'doc-1',
      docId: 'doc-1',
      name: '查询用户',
      url: '/users/{id}',
      httpMethod: 'GET',
      path: '/share/share-id/doc-1',
      isFolder: false,
      children: []
    }]
  }]

  const createWrapper = portalNodes => shallowMount(PublicPortalHome, {
    propsData: {
      title: '开放平台文档',
      description: '对外接口说明',
      nodes: portalNodes
    },
    mocks: {
      $t: key => key
    },
    stubs: {
      ElButton: {
        template: '<button @click="$emit(\'click\')"><slot /></button>'
      }
    }
  })

  it('renders portal metadata and navigates to the first document', () => {
    const wrapper = createWrapper(nodes)

    expect(wrapper.find('h1').text()).toBe('开放平台文档')
    expect(wrapper.text()).toContain('对外接口说明')
    expect(wrapper.findAll('.public-portal-home__category')).toHaveLength(1)

    wrapper.find('.public-portal-home__category').trigger('click')

    expect(wrapper.emitted('navigate')[0]).toEqual(['/share/share-id/doc-1'])
  })

  it('filters current documents from the search input', async() => {
    const wrapper = createWrapper(nodes)

    await wrapper.find('input').setValue('users')

    expect(wrapper.findAll('.public-portal-home__search-result')).toHaveLength(1)
  })

  it('shows an empty state when no documents are available', () => {
    const wrapper = createWrapper([])

    expect(wrapper.find('.public-portal-home__empty').exists()).toBe(true)
    expect(wrapper.find('.public-portal-home__category-grid').exists()).toBe(false)
  })
})
