import { shallowMount } from '@vue/test-utils'
import PublicPortalNavigation from '@/layout_public/components/PublicPortalNavigation.vue'

describe('PublicPortalNavigation.vue', () => {
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

  const createWrapper = () => shallowMount(PublicPortalNavigation, {
    propsData: {
      nodes,
      homePath: '/share/share-id',
      activeDocId: 'doc-1'
    },
    mocks: {
      $t: key => key
    },
    stubs: {
      ElInput: {
        props: ['value'],
        template: '<input :value="value" @input="$emit(\'input\', $event.target.value)">'
      },
      ElTree: {
        props: ['data'],
        template: '<button class="tree-stub" :data-count="data.length" @click="data.length && $emit(\'node-click\', data[0].children[0])">tree</button>'
      }
    }
  })

  it('navigates to the portal home and selected document', async() => {
    const wrapper = createWrapper()

    await wrapper.find('.public-portal-navigation__home').trigger('click')
    await wrapper.find('.tree-stub').trigger('click')

    expect(wrapper.emitted('navigate')[0]).toEqual(['/share/share-id'])
    expect(wrapper.emitted('navigate')[1]).toEqual(['/share/share-id/doc-1'])
  })

  it('filters the visible tree without mutating source nodes', async() => {
    const wrapper = createWrapper()

    await wrapper.find('input').setValue('missing')

    expect(wrapper.find('.tree-stub').attributes('data-count')).toBe('0')
    expect(nodes[0].children).toHaveLength(1)
  })
})
